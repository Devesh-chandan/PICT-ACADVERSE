import { useEffect, useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, ExternalLink, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ConfirmDialog, EmptyState, ErrorState, FileDropzone, PageHeader, Pager, TableSkeleton, formatDate, useDebounced,
} from "@/components/admin/shared";
import { adminApi, toFormData, type Note } from "@/lib/adminApi";
import { getErrorMessage } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface FormState {
  title: string;
  subject: string;
  author: string;
  description: string;
  pages: string;
}

const emptyForm = (author = ""): FormState => ({ title: "", subject: "", author, description: "", pages: "" });

const NoteDialog = ({ note, open, onOpenChange }: { note: Note | null; open: boolean; onOpenChange: (o: boolean) => void }) => {
  const editing = note !== null;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(emptyForm());
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!open) return;
    setFiles([]);
    setForm(
      note
        ? { title: note.title, subject: note.subject, author: note.author, description: note.description, pages: note.pages ? String(note.pages) : "" }
        : emptyForm(user?.name ?? "")
    );
  }, [open, note, user?.name]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const mutation = useMutation({
    mutationFn: () => {
      const body = toFormData({
        title: form.title.trim(),
        subject: form.subject.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        pages: form.pages.trim(),
        file: files[0],
      });
      return editing ? adminApi.notes.update(note._id, body) : adminApi.notes.create(body);
    },
    onSuccess: () => {
      toast.success(editing ? "Note updated" : "Note uploaded");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      onOpenChange(false);
    },
    onError: (e) => toast.error(getErrorMessage(e, "Could not save the note")),
  });

  const pagesInvalid = form.pages !== "" && !/^\d{1,4}$/.test(form.pages.trim());
  const valid =
    form.title.trim() !== "" && form.subject.trim() !== "" && form.author.trim() !== "" && !pagesInvalid && (editing || files.length === 1);

  return (
    <Dialog open={open} onOpenChange={(o) => !mutation.isPending && onOpenChange(o)}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit note" : "Upload notes"}</DialogTitle>
          <DialogDescription>Shown on the public Notes page.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) mutation.mutate();
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="note-title">Title</Label>
            <Input id="note-title" maxLength={150} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Complete DSA Notes - All Modules" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="note-subject">Subject</Label>
              <Input id="note-subject" maxLength={100} value={form.subject} onChange={(e) => set("subject", e.target.value)} placeholder="DSA" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="note-author">Author</Label>
              <Input id="note-author" maxLength={80} value={form.author} onChange={(e) => set("author", e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="note-desc">Description <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Textarea id="note-desc" maxLength={500} rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="One or two lines about what the notes cover" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="note-pages">Pages <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Input id="note-pages" inputMode="numeric" className="w-32" value={form.pages} onChange={(e) => set("pages", e.target.value)} aria-invalid={pagesInvalid} />
            {pagesInvalid && <p className="text-xs text-destructive">Enter a whole number.</p>}
          </div>
          <div className="space-y-1.5">
            <Label>{editing ? "Replace file (optional)" : "File"}</Label>
            <FileDropzone files={files} onChange={setFiles} onError={(m) => toast.error(m)} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={mutation.isPending} onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!valid || mutation.isPending}>
              {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? "Save changes" : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Notes = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<{ open: boolean; note: Note | null }>({ open: false, note: null });
  const [toDelete, setToDelete] = useState<Note | null>(null);

  const debouncedSearch = useDebounced(search);
  useEffect(() => setPage(1), [debouncedSearch]);

  const params = { page, limit: 15, search: debouncedSearch.trim() };
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "notes", params],
    queryFn: () => adminApi.notes.list(params),
    placeholderData: keepPreviousData,
  });

  const remove = useMutation({
    mutationFn: (n: Note) => adminApi.notes.remove(n._id),
    onSuccess: () => {
      toast.success("Note deleted");
      setToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e) => toast.error(getErrorMessage(e, "Could not delete")),
  });

  const items = data?.items ?? [];

  return (
    <div>
      <PageHeader
        title="Notes"
        description="Study notes shown on the Notes page."
        actions={
          <Button onClick={() => setDialog({ open: true, note: null })}>
            <Plus className="w-4 h-4" /> Upload notes
          </Button>
        }
      />
      <Card>
        <div className="border-b border-border p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="Search notes" className="pl-9" placeholder="Search by title, subject or author" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {error ? (
          <ErrorState message={getErrorMessage(error, "Could not load notes")} onRetry={() => refetch()} />
        ) : isLoading ? (
          <TableSkeleton />
        ) : items.length === 0 ? (
          <EmptyState title={debouncedSearch ? "No notes match your search" : "No notes uploaded yet"} hint={debouncedSearch ? undefined : "Use “Upload notes” to add the first one."} />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((n) => (
                  <TableRow key={n._id}>
                    <TableCell className="max-w-[260px] truncate font-medium">{n.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{n.subject}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{n.author}</TableCell>
                    <TableCell className="tabular-nums text-muted-foreground">{n.pages || "—"}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 tabular-nums text-muted-foreground">
                        <Download className="w-3.5 h-3.5" />
                        {n.downloads.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(n.uploadedAt)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" aria-label={`Open ${n.title}`}>
                          <a href={n.fileUrl} target="_blank" rel="noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Edit ${n.title}`} onClick={() => setDialog({ open: true, note: n })}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Delete ${n.title}`} className="text-destructive hover:text-destructive" onClick={() => setToDelete(n)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {data && data.total > 0 && <Pager page={data.page} pages={data.pages} total={data.total} onChange={setPage} />}
      </Card>

      <NoteDialog open={dialog.open} note={dialog.note} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))} />
      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && !remove.isPending && setToDelete(null)}
        title="Delete this note?"
        description={toDelete && <>“{toDelete.title}” will disappear from the Notes page and its file will be deleted. This cannot be undone.</>}
        busy={remove.isPending}
        onConfirm={() => toDelete && remove.mutate(toDelete)}
      />
    </div>
  );
};

export default Notes;
