import { useEffect, useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubjectField from "@/components/admin/SubjectField";
import {
  ConfirmDialog, EmptyState, ErrorState, FileDropzone, PageHeader, Pager, TableSkeleton, formatDate, useDebounced,
} from "@/components/admin/shared";
import { adminApi, toFormData, type Paper } from "@/lib/adminApi";
import { getErrorMessage } from "@/lib/api";
import { paperTypes, years } from "@/data/academics";

// ---------- upload / edit dialog ----------
interface FormState {
  year: string;
  subject: string;
  paperType: string;
  title: string;
}

const emptyForm: FormState = { year: "1", subject: "", paperType: "End-Sem", title: "" };

const PaperDialog = ({ paper, open, onOpenChange }: { paper: Paper | null; open: boolean; onOpenChange: (o: boolean) => void }) => {
  const editing = paper !== null;
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [files, setFiles] = useState<File[]>([]);

  // Reset whenever the dialog opens for a (different) paper
  useEffect(() => {
    if (!open) return;
    setFiles([]);
    setForm(paper ? { year: paper.year, subject: paper.subject, paperType: paper.paperType, title: paper.title } : emptyForm);
  }, [open, paper]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const mutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        return adminApi.papers.update(
          paper._id,
          toFormData({ ...form, subject: form.subject.trim(), title: form.title.trim(), file: files[0] })
        );
      }
      return adminApi.papers.create(
        toFormData({ year: form.year, subject: form.subject.trim(), paperType: form.paperType, title: form.title.trim(), files })
      );
    },
    onSuccess: (result) => {
      if (editing) {
        toast.success("Paper updated");
      } else {
        const { created, failed } = result as Awaited<ReturnType<typeof adminApi.papers.create>>;
        toast.success(`${created.length} paper${created.length === 1 ? "" : "s"} uploaded`);
        failed.forEach((f) => toast.error(`${f.file}: ${f.error}`));
      }
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(getErrorMessage(error, editing ? "Could not update the paper" : "Upload failed")),
  });

  const valid = form.subject.trim() !== "" && (editing ? form.title.trim() !== "" : files.length > 0);

  return (
    <Dialog open={open} onOpenChange={(o) => !mutation.isPending && onOpenChange(o)}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit paper" : "Upload question papers"}</DialogTitle>
          <DialogDescription>
            {editing ? "Change the details, or replace the file." : "Files uploaded together share the details below. Each paper is titled after its file name."}
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) mutation.mutate();
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="paper-year">Year</Label>
              <Select value={form.year} onValueChange={(v) => set("year", v)}>
                <SelectTrigger id="paper-year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y.id} value={y.id}>
                      {y.label} ({y.short})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="paper-type">Exam type</Label>
              <Select value={form.paperType} onValueChange={(v) => set("paperType", v)}>
                <SelectTrigger id="paper-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[...new Set<string>([...paperTypes, form.paperType])].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="paper-subject">Subject</Label>
            {/* key resets the picker's internal mode when the year changes */}
            <SubjectField key={form.year} id="paper-subject" year={form.year} value={form.subject} onChange={(v) => set("subject", v)} />
          </div>

          {(editing || files.length <= 1) && (
            <div className="space-y-1.5">
              <Label htmlFor="paper-title">Title {!editing && <span className="text-muted-foreground font-normal">(optional)</span>}</Label>
              <Input
                id="paper-title"
                maxLength={150}
                value={form.title}
                placeholder={editing ? undefined : "Defaults to the file name, e.g. In Sem 2024 - Feb"}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label>{editing ? "Replace file (optional)" : "Files"}</Label>
            <FileDropzone files={files} onChange={setFiles} multiple={!editing} onError={(m) => toast.error(m)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" disabled={mutation.isPending} onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!valid || mutation.isPending}>
              {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? "Save changes" : `Upload${files.length > 1 ? ` ${files.length} files` : ""}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ---------- page ----------
const Papers = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [paperType, setPaperType] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dialog, setDialog] = useState<{ open: boolean; paper: Paper | null }>({ open: false, paper: null });
  const [toDelete, setToDelete] = useState<Paper[] | null>(null);

  const debouncedSearch = useDebounced(search);
  useEffect(() => setPage(1), [debouncedSearch, year, paperType]);

  const params = { page, limit: 15, search: debouncedSearch.trim(), year, paperType };
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["admin", "papers", params],
    queryFn: () => adminApi.papers.list(params),
    placeholderData: keepPreviousData,
  });

  const remove = useMutation({
    mutationFn: (papers: Paper[]) =>
      papers.length === 1 ? adminApi.papers.remove(papers[0]._id) : adminApi.papers.bulkRemove(papers.map((p) => p._id)),
    onSuccess: (_, papers) => {
      toast.success(papers.length === 1 ? "Paper deleted" : `${papers.length} papers deleted`);
      setSelected(new Set());
      setToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e) => toast.error(getErrorMessage(e, "Could not delete")),
  });

  const items = data?.items ?? [];
  const allOnPage = items.length > 0 && items.every((p) => selected.has(p._id));
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <PageHeader
        title="Question papers"
        description="Upload, edit and remove the papers students see on the PYQs page."
        actions={
          <Button onClick={() => setDialog({ open: true, paper: null })}>
            <Plus className="w-4 h-4" /> Upload papers
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="Search papers" className="pl-9" placeholder="Search by title or subject" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger aria-label="Filter by year" className="md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All years</SelectItem>
              {years.map((y) => (
                <SelectItem key={y.id} value={y.id}>
                  {y.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={paperType} onValueChange={setPaperType}>
            <SelectTrigger aria-label="Filter by exam type" className="md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {paperTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isFetching && !isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-label="Refreshing" />}
        </div>

        {selected.size > 0 && (
          <div className="flex items-center justify-between gap-3 bg-primary/10 px-4 py-2 text-sm">
            <span>{selected.size} selected</span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
                Clear
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setToDelete(items.filter((p) => selected.has(p._id)))}>
                <Trash2 className="w-4 h-4" /> Delete selected
              </Button>
            </div>
          </div>
        )}

        {error ? (
          <ErrorState message={getErrorMessage(error, "Could not load papers")} onRetry={() => refetch()} />
        ) : isLoading ? (
          <TableSkeleton />
        ) : items.length === 0 ? (
          <EmptyState
            title={debouncedSearch || year !== "all" || paperType !== "all" ? "No papers match these filters" : "No papers uploaded yet"}
            hint={debouncedSearch || year !== "all" || paperType !== "all" ? "Try clearing the search or filters." : "Use “Upload papers” to add the first one."}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      aria-label="Select all on this page"
                      checked={allOnPage}
                      onCheckedChange={(c) =>
                        setSelected((prev) => {
                          const next = new Set(prev);
                          items.forEach((p) => {
                            if (c) next.add(p._id);
                            else next.delete(p._id);
                          });
                          return next;
                        })
                      }
                    />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((p) => (
                  <TableRow key={p._id} data-state={selected.has(p._id) ? "selected" : undefined}>
                    <TableCell>
                      <Checkbox aria-label={`Select ${p.title}`} checked={selected.has(p._id)} onCheckedChange={() => toggle(p._id)} />
                    </TableCell>
                    <TableCell className="max-w-[260px] truncate font-medium">{p.title}</TableCell>
                    <TableCell className="max-w-[260px] truncate text-muted-foreground">{p.subject}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Year {p.year}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{p.paperType}</Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(p.uploadedAt)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" aria-label={`Open ${p.title}`}>
                          <a href={p.fileUrl} target="_blank" rel="noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Edit ${p.title}`} onClick={() => setDialog({ open: true, paper: p })}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Delete ${p.title}`} className="text-destructive hover:text-destructive" onClick={() => setToDelete([p])}>
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

      <PaperDialog open={dialog.open} paper={dialog.paper} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))} />

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && !remove.isPending && setToDelete(null)}
        title={toDelete && toDelete.length > 1 ? `Delete ${toDelete.length} papers?` : "Delete this paper?"}
        description={
          toDelete && toDelete.length === 1
            ? <>“{toDelete[0].title}” will be removed from the PYQs page and its file deleted. This cannot be undone.</>
            : "These papers will be removed from the PYQs page and their files deleted. This cannot be undone."
        }
        busy={remove.isPending}
        onConfirm={() => toDelete && remove.mutate(toDelete)}
      />
    </div>
  );
};

export default Papers;
