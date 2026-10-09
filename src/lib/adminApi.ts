import api from "@/lib/api";

// ---------- Types ----------
export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface Paper {
  _id: string;
  subject: string;
  year: string;
  paperType: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface Note {
  _id: string;
  title: string;
  subject: string;
  author: string;
  description: string;
  pages: number;
  fileUrl: string;
  downloads: number;
  uploadedAt: string;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  role: "student" | "admin";
  createdAt: string;
}

export interface Stats {
  totals: { papers: number; notes: number; users: number; admins: number; newUsers: number };
  papersByYear: { year: string; count: number }[];
  papersByType: { paperType: string; count: number }[];
  topNotes: Pick<Note, "_id" | "title" | "subject" | "downloads">[];
  recent: { papers: Paper[]; notes: Note[] };
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: string | number | undefined;
}

// Drop empty filters so they don't end up in the query string
const clean = (params: ListParams) =>
  Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== "" && v !== "all"));

// Build multipart bodies; arrays become repeated fields, `undefined`/null are skipped
export const toFormData = (fields: Record<string, string | number | boolean | string[] | File | File[] | null | undefined>) => {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;
    for (const item of Array.isArray(value) ? value : [value]) {
      form.append(key, item instanceof File ? item : String(item));
    }
  }
  return form;
};

// ---------- Endpoints ----------
export const adminApi = {
  stats: async () => (await api.get<Stats>("/admin/stats")).data,

  papers: {
    list: async (params: ListParams) => (await api.get<Paged<Paper>>("/admin/papers", { params: clean(params) })).data,
    create: async (form: FormData) =>
      (await api.post<{ created: Paper[]; failed: { file: string; error: string }[] }>("/admin/papers", form)).data,
    update: async (id: string, form: FormData) => (await api.patch<Paper>(`/admin/papers/${id}`, form)).data,
    remove: async (id: string) => (await api.delete(`/admin/papers/${id}`)).data,
    bulkRemove: async (ids: string[]) => (await api.post<{ deleted: number }>("/admin/papers/bulk-delete", { ids })).data,
  },

  notes: {
    list: async (params: ListParams) => (await api.get<Paged<Note>>("/admin/notes", { params: clean(params) })).data,
    create: async (form: FormData) => (await api.post<Note>("/admin/notes", form)).data,
    update: async (id: string, form: FormData) => (await api.patch<Note>(`/admin/notes/${id}`, form)).data,
    remove: async (id: string) => (await api.delete(`/admin/notes/${id}`)).data,
  },

  users: {
    list: async (params: ListParams) => (await api.get<Paged<AdminUser>>("/admin/users", { params: clean(params) })).data,
    setRole: async (id: string, role: AdminUser["role"]) => (await api.patch<AdminUser>(`/admin/users/${id}`, { role })).data,
    remove: async (id: string) => (await api.delete(`/admin/users/${id}`)).data,
  },
};
