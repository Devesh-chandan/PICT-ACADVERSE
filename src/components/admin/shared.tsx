import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, FileUp, Inbox, X } from "lucide-react";
import {
  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ---------- helpers ----------
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export const MAX_UPLOAD_MB = 20;
export const ACCEPTED_TYPES = "application/pdf,image/jpeg,image/png,image/webp";
const ACCEPTED_LIST = ACCEPTED_TYPES.split(",");

/** Returns an error message if the file cannot be uploaded, otherwise null. */
export const validateFile = (file: File): string | null => {
  if (!ACCEPTED_LIST.includes(file.type)) return `${file.name}: only PDF, JPG, PNG or WEBP files are allowed`;
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) return `${file.name}: larger than ${MAX_UPLOAD_MB} MB`;
  return null;
};

export const formatBytes = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ---------- layout pieces ----------
export const PageHeader = ({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export const EmptyState = ({ title, hint }: { title: string; hint?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
    <Inbox className="w-8 h-8 text-muted-foreground/60" />
    <p className="font-medium">{title}</p>
    {hint && <p className="text-sm text-muted-foreground max-w-sm">{hint}</p>}
  </div>
);

export const TableSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="space-y-2 p-4" aria-busy="true" aria-label="Loading">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-10 w-full" />
    ))}
  </div>
);

export const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center gap-3 py-12 text-center">
    <p className="text-sm text-destructive">{message}</p>
    <Button variant="outline" size="sm" onClick={onRetry}>
      Try again
    </Button>
  </div>
);

export const Pager = ({ page, pages, total, onChange }: { page: number; pages: number; total: number; onChange: (p: number) => void }) => (
  <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground">
    <span>
      {total} {total === 1 ? "result" : "results"}
    </span>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="h-8 w-8" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="tabular-nums">
        Page {page} of {pages}
      </span>
      <Button variant="outline" size="icon" className="h-8 w-8" disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Next page">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  </div>
);

// ---------- confirm dialog ----------
export const ConfirmDialog = ({
  open, onOpenChange, title, description, confirmLabel = "Delete", busy, onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
}) => {
  // Callers clear their state the moment the dialog closes; keep showing the last
  // content while the close animation plays instead of flashing blank/generic text.
  const shown = useRef({ title, description, confirmLabel });
  if (open) shown.current = { title, description, confirmLabel };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{shown.current.title}</AlertDialogTitle>
          <AlertDialogDescription>{shown.current.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
          {/* Plain Button (not AlertDialogAction) so the dialog stays open while the request runs */}
          <Button variant="destructive" disabled={busy} onClick={onConfirm}>
            {busy ? "Working..." : shown.current.confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// ---------- file picker ----------
/**
 * Click-or-drop file picker with client-side type/size validation. The server
 * enforces the same rules; this just gives instant feedback.
 */
export const FileDropzone = ({
  files, onChange, multiple = false, onError, hint,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  multiple?: boolean;
  onError: (message: string) => void;
  hint?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const accept = (incoming: FileList | File[]) => {
    const list = Array.from(incoming);
    const valid: File[] = [];
    for (const file of list) {
      const problem = validateFile(file);
      if (problem) onError(problem);
      else valid.push(file);
    }
    if (valid.length === 0) return;
    if (!multiple) return onChange([valid[0]]);
    const merged = [...files, ...valid].slice(0, 10);
    if (files.length + valid.length > 10) onError("You can upload at most 10 files at a time");
    onChange(merged);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Choose files to upload"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          dragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/60 hover:bg-accent/5"
        )}
      >
        <FileUp className="w-6 h-6 text-muted-foreground" />
        <p className="text-sm font-medium">{multiple ? "Drop files here or click to browse" : "Drop a file here or click to browse"}</p>
        <p className="text-xs text-muted-foreground">{hint ?? `PDF, JPG, PNG or WEBP · up to ${MAX_UPLOAD_MB} MB each`}</p>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple={multiple}
          accept={ACCEPTED_TYPES}
          onChange={(e) => {
            if (e.target.files) accept(e.target.files);
            e.target.value = ""; // allow re-selecting the same file
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-sm">
              <span className="truncate">{file.name}</span>
              <span className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground">
                {formatBytes(file.size)}
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  className="rounded p-0.5 hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => onChange(files.filter((_, j) => j !== i))}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
