import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FileText, NotebookPen, Users, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState, PageHeader, formatDate } from "@/components/admin/shared";
import { adminApi } from "@/lib/adminApi";
import { getErrorMessage } from "@/lib/api";
import { years } from "@/data/academics";

const StatCard = ({ label, value, hint, icon: Icon, to }: { label: string; value: number; hint?: string; icon: LucideIcon; to: string }) => (
  <Link to={to} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
    <Card className="transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="rounded-lg bg-primary/15 p-2.5 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold tabular-nums">{value.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
          {hint && <div className="text-xs text-muted-foreground/80">{hint}</div>}
        </div>
      </CardContent>
    </Card>
  </Link>
);

const Bar = ({ label, count, max }: { label: string; count: number; max: number }) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="w-28 shrink-0 truncate text-muted-foreground">{label}</span>
    <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
      <div className="h-full rounded-full bg-primary" style={{ width: `${max ? (count / max) * 100 : 0}%` }} />
    </div>
    <span className="w-8 text-right tabular-nums">{count}</span>
  </div>
);

const Overview = () => {
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ["admin", "stats"], queryFn: adminApi.stats });

  if (error) return <ErrorState message={getErrorMessage(error, "Could not load statistics")} onRetry={() => refetch()} />;

  const byYear = years.map((y) => ({
    label: `${y.label} (${y.short})`,
    count: data?.papersByYear.find((r) => r.year === y.id)?.count ?? 0,
  }));
  const maxYear = Math.max(1, ...byYear.map((r) => r.count));
  const maxType = Math.max(1, ...(data?.papersByType.map((r) => r.count) ?? [1]));

  return (
    <div>
      <PageHeader title="Overview" description="What is on the platform right now." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading || !data ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[92px] rounded-xl" />)
        ) : (
          <>
            <StatCard label="Question papers" value={data.totals.papers} icon={FileText} to="/admin/papers" />
            <StatCard label="Notes" value={data.totals.notes} icon={NotebookPen} to="/admin/notes" />
            <StatCard label="Users" value={data.totals.users} hint={`${data.totals.newUsers} joined this week · ${data.totals.admins} admin${data.totals.admins === 1 ? "" : "s"}`} icon={Users} to="/admin/users" />
          </>
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Papers by year</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? <Skeleton className="h-28" /> : byYear.map((r) => <Bar key={r.label} {...r} max={maxYear} />)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Papers by type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <Skeleton className="h-28" />
            ) : data && data.papersByType.length > 0 ? (
              data.papersByType.map((r) => <Bar key={r.paperType} label={r.paperType} count={r.count} max={maxType} />)
            ) : (
              <EmptyState title="No papers yet" hint="Upload the first paper from Question Papers." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recently uploaded papers</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-32" />
            ) : data && data.recent.papers.length > 0 ? (
              <ul className="divide-y divide-border">
                {data.recent.papers.map((p) => (
                  <li key={p._id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <div className="min-w-0">
                      <a href={p.fileUrl} target="_blank" rel="noreferrer" className="block truncate font-medium hover:text-primary">
                        {p.title}
                      </a>
                      <span className="text-xs text-muted-foreground">
                        {p.subject} · Year {p.year} · {p.paperType}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{formatDate(p.uploadedAt)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="Nothing uploaded yet" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Most downloaded notes</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-32" />
            ) : data && data.topNotes.length > 0 ? (
              <ul className="divide-y divide-border">
                {data.topNotes.map((n) => (
                  <li key={n._id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{n.title}</div>
                      <span className="text-xs text-muted-foreground">{n.subject}</span>
                    </div>
                    <span className="shrink-0 tabular-nums text-xs text-muted-foreground">{n.downloads.toLocaleString()} downloads</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No notes yet" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
