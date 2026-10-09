// Academic structure shared by the student-facing PYQs page and the admin portal.
// Years are stored on papers as "1".."4" (FE/SE/TE/BE).

export const years = [
  { id: "1", label: "Year 1", short: "FE" },
  { id: "2", label: "Year 2", short: "SE" },
  { id: "3", label: "Year 3", short: "TE" },
  { id: "4", label: "Year 4", short: "BE" },
];

export const year1Subjects = [
  "Linear Algebra and Calculus (LAC)", "Quantum Physics (QP)", "Mechanics for Robotics (MFR)",
  "Integrated Electrical and Electronics Engineering (IEEE)", "C Programming for Problem Solving (CPPS)",
  "Statistics and Integral Calculus (SIC)", "Chemical Science and Technology (CST)",
  "Computer Graphics and Design (CGD)", "Object Oriented Programming Using C++ (OOPC)",
  "Environment and Sustainable Engineering (ESE)"
];

export const branches = [
  "Computer Engineering", "Information Technology", "Electronics and Telecommunication Engineering",
  "Artificial Intelligence & Data Science", "Electronics & Computer Engineering"
];

export const year2Subjects: Record<string, string[]> = {
  "Computer Engineering": ["Data Structures (DS)", "Computer Organisation and Architecture (COA)", "Discrete Mathematics (DM)"],
  "Information Technology": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Development and Management (ESDM)"],
  "Electronics and Telecommunication Engineering": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
  "Artificial Intelligence & Data Science": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
  "Electronics & Computer Engineering": ["Analog and Digital Electronics (ADE)", "Analog and Digital Electronics Lab (ADEL)", "Operating System (OS)", "Principles of Data Structure (PDS)"]
};

/** Short year names by id: "FE" | "SE" | "TE" | "BE". */
export const yearShortById: Record<string, string> = Object.fromEntries(years.map((y) => [y.id, y.short]));

export const paperTypes = ["In-Sem", "End-Sem"] as const;

/** Every known subject for a year (year 2 is the union across branches); other years are free-form. */
export const subjectsForYear = (year: string): string[] => {
  if (year === "1") return year1Subjects;
  if (year === "2") return [...new Set(Object.values(year2Subjects).flat())].sort();
  return [];
};
