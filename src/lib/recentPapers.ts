// Papers a visitor opened on the PYQs page, newest first. Kept in this browser only
// (localStorage), so it works for guests too and needs no backend.
export interface RecentPaper {
  id: string;
  title: string;
  subject: string;
  year: string; // "1".."4"
  url: string;
  viewedAt: number; // epoch ms
}

const KEY = "recentPapers";
const MAX_ITEMS = 5;

export const getRecentPapers = (): RecentPaper[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
  } catch {
    return [];
  }
};

export const addRecentPaper = (paper: Omit<RecentPaper, "viewedAt">) => {
  try {
    const rest = getRecentPapers().filter((p) => p.id !== paper.id);
    localStorage.setItem(KEY, JSON.stringify([{ ...paper, viewedAt: Date.now() }, ...rest].slice(0, MAX_ITEMS)));
  } catch {
    // Storage unavailable (private mode, quota): history is a convenience, never an error
  }
};
