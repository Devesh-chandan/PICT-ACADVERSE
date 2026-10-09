import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- DATA ---

interface SubjectStat {
  name: string;
  total: number;
  present: number;
}

const firstYearSubjects: SubjectStat[] = [
  { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
  { name: "Quantum Physics (QP)", total: 40, present: 32 },
  { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
  { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
  { name: "C Programming (CPPS)", total: 60, present: 55 },
  { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
  { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
  { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
  { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
  { name: "Environment Engineering (ESE)", total: 20, present: 18 },
];

const YEARS = [
  { id: "FE", label: "First Year" },
  { id: "SE", label: "Second Year" },
  { id: "TE", label: "Third Year" },
  { id: "BE", label: "Final Year" },
] as const;
type YearId = (typeof YEARS)[number]["id"];

const branchSubjects: Record<string, Partial<Record<YearId, SubjectStat[]>>> = {
  CS: {
    SE: [
      { name: "Data Structures (DS)", total: 80, present: 75 },
      { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
      { name: "Discrete Mathematics (DM)", total: 50, present: 48 },
    ],
    TE: [
      { name: "Database Management (DBMS)", total: 70, present: 60 },
      { name: "Theory of Computation (TOC)", total: 65, present: 55 },
      { name: "Systems Programming (SPOS)", total: 60, present: 40 },
    ],
    BE: [
      { name: "Machine Learning (ML)", total: 55, present: 20 },
      { name: "Information Security (IS)", total: 50, present: 30 },
      { name: "Compilers (CD)", total: 45, present: 15 },
    ],
  },
  IT: {
    SE: [
      { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
      { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
      { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 },
    ],
    TE: [
      { name: "Web Technology (WT)", total: 60, present: 55 },
      { name: "Software Engineering (SE)", total: 55, present: 45 },
      { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 },
    ],
    BE: [
      { name: "Distributed Systems (DS)", total: 45, present: 10 },
      { name: "Mobile Computing (MC)", total: 40, present: 5 },
      { name: "Software Testing (STQA)", total: 35, present: 15 },
    ],
  },
  ENTC: {
    SE: [
      { name: "Signals and Systems (S&S)", total: 70, present: 70 },
      { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
      { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 },
    ],
    TE: [
      { name: "Digital Communication (DC)", total: 60, present: 40 },
      { name: "Microcontrollers (MC)", total: 55, present: 30 },
      { name: "Electromagnetics (EM)", total: 50, present: 20 },
    ],
    BE: [
      { name: "VLSI Design", total: 45, present: 15 },
      { name: "Mobile Communication", total: 40, present: 10 },
      { name: "Broadband Comm", total: 35, present: 5 },
    ],
  },
  AIDS: {
    SE: [
      { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
      { name: "Data Structures (DS)", total: 80, present: 65 },
      { name: "Artificial Intelligence (AI)", total: 90, present: 12 },
    ],
    TE: [
      { name: "Data Science (DS)", total: 60, present: 30 },
      { name: "Neural Networks (NN)", total: 55, present: 20 },
      { name: "Software Engg (SE)", total: 50, present: 25 },
    ],
    BE: [
      { name: "Deep Learning (DL)", total: 45, present: 5 },
      { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
      { name: "Big Data (BD)", total: 35, present: 12 },
    ],
  },
  ECE: {
    SE: [
      { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
      { name: "Operating System (OS)", total: 70, present: 68 },
      { name: "Principles of Data Structure (PDS)", total: 60, present: 55 },
    ],
    TE: [
      { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
      { name: "Microprocessors (MP)", total: 50, present: 35 },
      { name: "Data Comm (DC)", total: 45, present: 25 },
    ],
    BE: [
      { name: "Embedded Systems (ES)", total: 40, present: 15 },
      { name: "System on Chip (SoC)", total: 35, present: 10 },
      { name: "Cloud Computing (CC)", total: 30, present: 5 },
    ],
  },
};

const branchNames: Record<string, string> = {
  CS: "Computer Engineering",
  IT: "Information Technology",
  ENTC: "Electronics & Telecommunication",
  AIDS: "AI & Data Science",
  ECE: "Electronics & Computer",
};

// --- HELPERS ---

const coverage = (subjects: SubjectStat[]) => {
  const total = subjects.reduce((sum, s) => sum + s.total, 0);
  return total ? Math.round((subjects.reduce((sum, s) => sum + s.present, 0) / total) * 100) : 0;
};

// One place defines what a coverage level means, so colour and wording never disagree.
const LOW_COVERAGE = 40;
const level = (value: number) =>
  value > 80
    ? { label: "Well covered", bar: "bg-emerald-400", dot: "bg-emerald-400" }
    : value > LOW_COVERAGE
      ? { label: "Partial", bar: "bg-indigo-400", dot: "bg-indigo-400" }
      : { label: "Needs papers", bar: "bg-amber-400", dot: "bg-amber-400" };

const Bar = ({ value, className }: { value: number; className?: string }) => (
  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <div className={cn("h-full rounded-full transition-all duration-500", className ?? level(value).bar)} style={{ width: `${value}%` }} />
  </div>
);

const Segmented = <T extends string>({
  options, value, onChange, label,
}: { options: { id: T; label: string }[]; value: T; onChange: (id: T) => void; label: string }) => (
  <div role="tablist" aria-label={label} className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.03] p-1">
    {options.map((option) => (
      <button
        key={option.id}
        type="button"
        role="tab"
        aria-selected={value === option.id}
        onClick={() => onChange(option.id)}
        className={cn(
          "rounded-md px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400",
          value === option.id ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);

const Stat = ({ label, value, hint }: { label: string; value: string; hint: string }) => (
  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 sm:p-4">
    <div className="text-[11px] uppercase tracking-wider text-neutral-500 sm:text-xs">{label}</div>
    <div className="mt-1 text-xl font-semibold text-white sm:mt-1.5 sm:text-2xl">{value}</div>
    <div className="mt-0.5 hidden text-xs text-neutral-500 sm:block">{hint}</div>
  </div>
);

// --- COMPONENT ---

type SortMode = "default" | "lowest";

const RepositoryStats = () => {
  const [year, setYear] = useState<YearId>("SE");
  const [branch, setBranch] = useState("CS");
  const [sort, setSort] = useState<SortMode>("default");

  const isFirstYear = year === "FE";
  const branches = Object.keys(branchSubjects);
  const yearLabel = YEARS.find((y) => y.id === year)!.label;

  // Everything shown for the current year (all departments, or the common first-year list)
  const yearSubjects = isFirstYear ? firstYearSubjects : branches.flatMap((b) => branchSubjects[b][year] ?? []);
  const lowCount = yearSubjects.filter((s) => Math.round((s.present / s.total) * 100) <= LOW_COVERAGE).length;

  const visible = isFirstYear ? firstYearSubjects : branchSubjects[branch]?.[year] ?? [];
  const rows = [...visible].sort((a, b) => (sort === "lowest" ? a.present / a.total - b.present / b.total : 0));
  const heading = isFirstYear ? "First Year (Common)" : branchNames[branch];

  return (
    <section aria-labelledby="repo-stats-title">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 id="repo-stats-title" className="text-2xl font-semibold tracking-tight text-white">Repository Stats</h2>
          <p className="mt-1 text-sm text-neutral-500">See which subjects already have papers and where help is needed.</p>
        </div>
        <Segmented<YearId> options={YEARS.map((y) => ({ id: y.id, label: y.id }))} value={year} onChange={setYear} label="Academic year" />
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-3">
        <Stat label="Coverage" value={`${coverage(yearSubjects)}%`} hint={`${yearLabel}, all subjects`} />
        <Stat label="Subjects" value={String(yearSubjects.length)} hint={isFirstYear ? "Common to every branch" : `Across ${branches.length} departments`} />
        <Stat label="Need papers" value={String(lowCount)} hint={lowCount ? `${LOW_COVERAGE}% or less available` : "Everything is well covered"} />
      </div>

      <div className={cn("grid gap-4", !isFirstYear && "lg:grid-cols-[300px_1fr]")}>
        {/* Departments */}
        {!isFirstYear && (
          <nav aria-label="Departments" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
            {branches.map((code) => {
              const value = coverage(branchSubjects[code][year] ?? []);
              const active = code === branch;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setBranch(code)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "w-52 shrink-0 rounded-xl border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 lg:w-full",
                    active ? "border-white/25 bg-white/[0.07]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{code}</span>
                    <span className="text-sm font-semibold text-white">{value}%</span>
                  </div>
                  <div className="mb-2.5 mt-0.5 truncate text-xs text-neutral-500">{branchNames[code]}</div>
                  <Bar value={value} />
                </button>
              );
            })}
          </nav>
        )}

        {/* Subjects */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white">{heading}</h3>
              <p className="mt-0.5 text-sm text-neutral-500">
                {rows.length} subjects • {coverage(visible)}% of papers available
              </p>
            </div>
            <Segmented<SortMode>
              options={[{ id: "default", label: "Syllabus order" }, { id: "lowest", label: "Lowest first" }]}
              value={sort}
              onChange={setSort}
              label="Sort subjects"
            />
          </div>

          <ul className="grid gap-3 xl:grid-cols-2">
            {rows.map((subject) => {
              const value = Math.round((subject.present / subject.total) * 100);
              const status = level(value);
              return (
                <li key={subject.name}>
                  <Link
                    to="/pyqs"
                    className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <span className="text-sm font-medium text-neutral-100">{subject.name}</span>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-white" aria-hidden />
                    </div>
                    <Bar value={value} />
                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-neutral-400">
                        <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} aria-hidden />
                        {status.label}
                      </span>
                      <span className="font-mono text-neutral-500">{subject.present} of {subject.total} papers • {value}%</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RepositoryStats;
