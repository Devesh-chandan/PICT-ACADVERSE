import { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import RepositoryStats from "@/components/dashboard/RepositoryStats";
import {
  ArrowRight, BrainCircuit, Clock, FileText, Flame, HelpCircle, History, Lock, Mail, Phone,
} from "lucide-react";
import { yearShortById } from "@/data/academics";
import { getRecentPapers } from "@/lib/recentPapers";
import { cn } from "@/lib/utils";

// --- HELPERS ---

const timeAgo = (timestamp: number) => {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

// --- SHARED STYLES (same surface language as the PYQs page) ---

const card = "rounded-2xl border border-white/[0.08] bg-white/[0.02]";
const pill = "rounded-full border border-white/[0.1] px-2.5 py-0.5 text-[11px] font-medium text-neutral-400";

// --- COMPONENTS ---

const ComingSoonCard = ({ title, icon: Icon }: { title: string; icon: LucideIcon }) => (
  <div className={cn(card, "flex h-full flex-col items-center justify-center gap-3 p-4 text-center")}>
    <div className="rounded-full border border-white/[0.08] bg-white/[0.03] p-3 text-neutral-500">
      <Icon className="h-5 w-5" />
    </div>
    <div className="space-y-1.5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-300">{title}</h3>
      <span className={cn(pill, "inline-block")}>Coming Soon</span>
    </div>
  </div>
);

const RecentlyViewed = () => {
  const papers = useMemo(getRecentPapers, []);

  return (
    <section className={cn(card, "flex flex-col p-6 md:col-span-2")}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <History className="h-5 w-5 text-neutral-400" /> Recently Viewed Papers
        </h2>
        <Link to="/pyqs" className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:bg-white/[0.05] hover:text-white">
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {papers.length ? (
        <ul className="space-y-2">
          {papers.map((paper) => (
            <li key={paper.id}>
              <a
                href={paper.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5 text-indigo-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">{paper.title}</div>
                    <div className="truncate text-xs text-neutral-500">
                      {paper.subject} • {yearShortById[paper.year] ?? `Year ${paper.year}`}
                    </div>
                  </div>
                </div>
                <span className={cn(pill, "shrink-0")}>{timeAgo(paper.viewedAt)}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.1] px-6 py-10 text-center">
          <FileText className="mb-3 h-6 w-6 text-neutral-600" />
          <p className="text-sm text-neutral-400">You haven't opened any papers yet.</p>
          <Link to="/pyqs" className="mt-2 text-sm font-medium text-indigo-400 underline-offset-4 hover:underline">
            Browse PYQs
          </Link>
        </div>
      )}
    </section>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-950 font-sans text-neutral-200 selection:bg-white/20">
      <Navbar />

      <main className="pb-28 pt-28 md:pt-32 lg:pb-20">
        <div className="container mx-auto max-w-7xl space-y-10 px-4 md:px-6">

          {/* Overview */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <RecentlyViewed />

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <ComingSoonCard title="Countdown" icon={Clock} />
                <ComingSoonCard title="Streaks" icon={Flame} />
              </div>

              <section className={cn(card, "flex flex-1 flex-col gap-3 p-5")}>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <HelpCircle className="h-4 w-4 text-neutral-400" /> Help Center
                </h2>
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
                  <Mail className="h-3.5 w-3.5 text-neutral-500" />
                  <span className="font-mono text-xs tracking-tight text-neutral-300">support@pict.edu</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
                  <Phone className="h-3.5 w-3.5 text-neutral-500" />
                  <span className="font-mono text-xs tracking-tight text-neutral-300">+91 98765 43210</span>
                </div>
              </section>
            </div>

            <section className={cn(card, "flex items-center justify-between gap-4 p-6 md:col-span-3")}>
              <div className="flex items-center gap-4">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-indigo-400">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                    AI Question Predictor <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">Beta</span>
                  </h2>
                  <p className="text-sm text-neutral-500">Generate smart predictions based on 5 years of PYQ patterns.</p>
                </div>
              </div>
              <span className="hidden cursor-not-allowed items-center gap-2 text-sm font-medium text-neutral-500 sm:flex">
                <Lock className="h-3 w-3" /> Coming Soon
              </span>
            </section>
          </div>

          <RepositoryStats />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
