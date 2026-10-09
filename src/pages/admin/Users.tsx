import { useEffect, useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmDialog, EmptyState, ErrorState, PageHeader, Pager, TableSkeleton, formatDate, useDebounced } from "@/components/admin/shared";
import { useAuth } from "@/contexts/AuthContext";
import { adminApi, type AdminUser } from "@/lib/adminApi";
import { getErrorMessage } from "@/lib/api";

type Pending = { kind: "role"; user: AdminUser; role: AdminUser["role"] } | { kind: "delete"; user: AdminUser };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "U";

const Users = () => {
  const { user: me } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState<Pending | null>(null);

  const debouncedSearch = useDebounced(search);
  useEffect(() => setPage(1), [debouncedSearch, role]);

  const params = { page, limit: 20, search: debouncedSearch.trim(), role };
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => adminApi.users.list(params),
    placeholderData: keepPreviousData,
  });

  const action = useMutation({
    mutationFn: (p: Pending) => (p.kind === "role" ? adminApi.users.setRole(p.user._id, p.role) : adminApi.users.remove(p.user._id)),
    onSuccess: (_, p) => {
      toast.success(p.kind === "delete" ? "User deleted" : p.role === "admin" ? `${p.user.name} is now an admin` : `${p.user.name} is no longer an admin`);
      setPending(null);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e) => {
      toast.error(getErrorMessage(e, "Action failed"));
      setPending(null);
    },
  });

  const items = data?.items ?? [];

  const confirmCopy = !pending
    ? null
    : pending.kind === "delete"
      ? {
          title: "Delete this user?",
          description: <>{pending.user.name} ({pending.user.email}) will lose access and their account will be removed. This cannot be undone.</>,
          label: "Delete user",
        }
      : pending.role === "admin"
        ? {
            title: "Make this user an admin?",
            description: <>{pending.user.name} will be able to upload, edit and delete content and manage other users.</>,
            label: "Make admin",
          }
        : {
            title: "Remove admin access?",
            description: <>{pending.user.name} will become a regular student account.</>,
            label: "Remove admin",
          };

  return (
    <div>
      <PageHeader title="Users" description="Everyone who has signed up. Promote trusted people to admin." />
      <Card>
        <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="Search users" className="pl-9" placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger aria-label="Filter by role" className="md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="student">Students</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error ? (
          <ErrorState message={getErrorMessage(error, "Could not load users")} onRetry={() => refetch()} />
        ) : isLoading ? (
          <TableSkeleton />
        ) : items.length === 0 ? (
          <EmptyState title="No users found" />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((u) => {
                  const isSelf = u._id === me?._id;
                  return (
                    <TableRow key={u._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{initials(u.name)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="truncate font-medium">
                              {u.name} {isSelf && <span className="text-xs font-normal text-muted-foreground">(you)</span>}
                            </div>
                            <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.role === "admin" ? "default" : "secondary"}>{u.role}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(u.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          {u.role === "admin" ? (
                            <Button variant="ghost" size="sm" disabled={isSelf} title={isSelf ? "You cannot remove your own admin access" : undefined} onClick={() => setPending({ kind: "role", user: u, role: "student" })}>
                              <ShieldOff className="w-4 h-4" /> Remove admin
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" onClick={() => setPending({ kind: "role", user: u, role: "admin" })}>
                              <ShieldCheck className="w-4 h-4" /> Make admin
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" aria-label={`Delete ${u.name}`} disabled={isSelf} className="text-destructive hover:text-destructive" onClick={() => setPending({ kind: "delete", user: u })}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        {data && data.total > 0 && <Pager page={data.page} pages={data.pages} total={data.total} onChange={setPage} />}
      </Card>

      <ConfirmDialog
        open={pending !== null}
        onOpenChange={(open) => !open && !action.isPending && setPending(null)}
        title={confirmCopy?.title ?? ""}
        description={confirmCopy?.description}
        confirmLabel={confirmCopy?.label}
        busy={action.isPending}
        onConfirm={() => pending && action.mutate(pending)}
      />
    </div>
  );
};

export default Users;
