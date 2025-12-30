


import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/layout/Navbar";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  // Standard UI Icons
  FileText, Folder, Monitor, X, Loader2, BookOpen, Plus, 
  // Subject Specific Icons
  Calculator, Atom, Bot, Zap, Terminal, FlaskConical, Palette, 
  Code2, Leaf, Cpu, Wifi, Activity, BrainCircuit, Briefcase 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// --- Configuration ---
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/pyqs` 
  : "http://localhost:5000/api/pyqs";

// --- Data Definitions ---
const years = [
  { id: "1", label: "1st Year", short: "FE" },
  { id: "2", label: "2nd Year", short: "SE" },
  { id: "3", label: "3rd Year", short: "TE" },
  { id: "4", label: "4th Year", short: "BE" },
];

const year1Subjects = [
  "Linear Algebra and Calculus (LAC)", "Quantum Physics (QP)", "Mechanics for Robotics (MFR)",
  "Integrated Electrical and Electronics Engineering (IEEE)", "C Programming for Problem Solving (CPPS)",
  "Statistics and Integral Calculus (SIC)", "Chemical Science and Technology (CST)",
  "Computer Graphics and Design (CGD)", "Object Oriented Programming Using C++ (OOPC)",
  "Environment and Sustainable Engineering (ESE)"
];

const branches = [
  "Computer Engineering", "Information Technology", "Electronics and Telecommunication Engineering",
  "Artificial Intelligence & Data Science", "Electronics & Computer Engineering"
];

const year2Subjects = {
  "Computer Engineering": ["Data Structures (DS)", "Computer Organisation and Architecture (COA)", "Discrete Mathematics (DM)"],
  "Information Technology": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Development and Management (ESDM)"],
  "Electronics and Telecommunication Engineering": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
  "Artificial Intelligence & Data Science": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
  "Electronics & Computer Engineering": ["Analog and Digital Electronics (ADE)", "Analog and Digital Electronics Lab (ADEL)", "Operating System (OS)", "Principles of Data Structure (PDS)"]
};

// --- Components ---
const SubjectIcon = ({ name }) => {
  const n = name.toLowerCase();
  // UPDATED: Balanced size (w-4 h-4) and margin (mr-2.5)
  const iconBase = "w-4 h-4 mr-2.5 shrink-0"; 

  // Math
  if (n.includes("calculus") || n.includes("algebra") || n.includes("statistics") || n.includes("math")) 
    return <Calculator className={`${iconBase} text-pink-500`} />;
  
  // Science
  if (n.includes("physics") || n.includes("quantum")) 
    return <Atom className={`${iconBase} text-cyan-500`} />;
  if (n.includes("chemical") || n.includes("chemistry")) 
    return <FlaskConical className={`${iconBase} text-teal-500`} />;

  // Coding & CS
  if (n.includes("data structure") || n.includes("dsa") || n.includes("algorithm")) 
    return <Code2 className={`${iconBase} text-indigo-500`} />;
  if (n.includes("programming") || n.includes("cpp") || n.includes("oop") || n.includes("java")) 
    return <Terminal className={`${iconBase} text-violet-600`} />;
  if (n.includes("operating system") || n.includes("os")) 
    return <Monitor className={`${iconBase} text-slate-600`} />;

  // AI
  if (n.includes("intelligence") || n.includes("ai") || n.includes("data science")) 
    return <BrainCircuit className={`${iconBase} text-purple-600`} />;

  // Electronics
  if (n.includes("circuit") || n.includes("analog") || n.includes("digital")) 
    return <Zap className={`${iconBase} text-yellow-600`} />;
  if (n.includes("processor") || n.includes("architecture") || n.includes("coa") || n.includes("hardware")) 
    return <Cpu className={`${iconBase} text-orange-500`} />;
  if (n.includes("signals") || n.includes("systems")) 
    return <Activity className={`${iconBase} text-amber-600`} />;

  // Networks
  if (n.includes("network") || n.includes("internet") || n.includes("iot")) 
    return <Wifi className={`${iconBase} text-blue-500`} />;

  // Mechanics
  if (n.includes("mechanics") || n.includes("robotics")) 
    return <Bot className={`${iconBase} text-slate-700`} />;

  // General
  if (n.includes("graphics") || n.includes("design")) 
    return <Palette className={`${iconBase} text-rose-400`} />;
  if (n.includes("environment") || n.includes("sustainable")) 
    return <Leaf className={`${iconBase} text-green-600`} />;
  if (n.includes("management") || n.includes("entrepreneurial")) 
    return <Briefcase className={`${iconBase} text-amber-800`} />;

  return <BookOpen className={`${iconBase} text-muted-foreground`} />;
};

const PYQs = () => {
  const [selectedYear, setSelectedYear] = useState("1");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- TAB STATE MANAGEMENT ---
  const [tabs, setTabs] = useState([{ id: Date.now(), file: null }]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  // --- API CALLS ---
  const fetchPapers = async () => {
    try {
      const res = await axios.get(API_URL);
      setPapers(res.data);
    } catch (err) {
      console.error("Failed to fetch papers", err);
      toast.error("Could not load papers. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // --- TAB ACTIONS ---
  const handleAddTab = () => {
    const newTab = { id: Date.now(), file: null };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (e, tabId) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      setTabs([{ id: Date.now(), file: null }]);
      return;
    }
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleFileSelect = (paper) => {
    const fileData = { title: paper.title, subject: paper.subject, url: paper.fileUrl };
    setTabs(tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, file: fileData } : tab
    ));
  };

  // --- RENDERING HELPERS ---
  const getPapersForSubject = (subjectName) => {
    return papers.filter(p => p.subject === subjectName && p.year === selectedYear);
  };

  const renderPapersList = (subjectName) => {
    const subjectPapers = getPapersForSubject(subjectName);
    const activeTab = tabs.find(t => t.id === activeTabId);

    if (subjectPapers.length === 0) {
      return <div className="pl-9 py-1 text-xs text-muted-foreground italic">No papers yet...</div>;
    }

    return (
      <div className="pl-4 flex flex-col gap-1 py-1">
        {subjectPapers.map((paper) => (
          <button
            key={paper._id}
            onClick={() => handleFileSelect(paper)}
            className={cn(
              // UPDATED: py-1.5 (Standard list item size)
              "flex items-center px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent group text-left",
              activeTab?.file?.url === paper.fileUrl ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <FileText className="w-4 h-4 mr-2.5 text-blue-400 shrink-0" />
            <span className="truncate">{paper.title}</span>
            <span className="ml-auto text-[10px] opacity-50 border px-1 rounded">{paper.paperType}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderExplorerContent = () => {
    if (selectedYear === "1") {
      return (
        <Accordion type="multiple" className="w-full">
          {year1Subjects.map((subject, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
              {/* UPDATED: text-sm (Standard readable) and py-2 (Clean spacing) */}
              <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-normal data-[state=open]:text-foreground text-muted-foreground hover:no-underline">
                <div className="flex items-center text-left">
                  <SubjectIcon name={subject} />
                  <span className="line-clamp-1">{subject}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {renderPapersList(subject)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }
    return (
      <Accordion type="multiple" className="w-full">
        {branches.map((branch, branchIndex) => (
          <AccordionItem key={branchIndex} value={`branch-${branchIndex}`} className="border-b-0">
            {/* UPDATED: text-sm, py-2 */}
            <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-medium hover:no-underline">
              <div className="flex items-center text-left">
                {/* UPDATED: Standard Icon Size */}
                <Folder className="w-4 h-4 mr-2.5 text-indigo-400 fill-indigo-400/20" />
                <span>{branch}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="pl-4 border-l ml-6 border-border/50">
                {selectedYear === "2" ? (
                  <Accordion type="multiple" className="w-full">
                    {year2Subjects[branch]?.map((subject, subIndex) => (
                      <AccordionItem key={subIndex} value={`sub-${branchIndex}-${subIndex}`} className="border-b-0">
                        {/* UPDATED: text-sm, py-2 */}
                        <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-normal text-muted-foreground hover:no-underline data-[state=open]:text-foreground">
                          <div className="flex items-center text-left">
                            <SubjectIcon name={subject} />
                            <span className="line-clamp-1">{subject}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {renderPapersList(subject)}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="px-4 py-3 text-xs text-muted-foreground italic">Coming soon...</div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) != null;
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex pt-16 h-screen overflow-hidden">
        
        {/* Mobile View Placeholder */}
        <div className="md:hidden flex flex-col w-full h-full items-center justify-center p-4 text-center">
            <h2 className="font-bold text-lg mb-2">Desktop View Recommended</h2>
            <p className="text-muted-foreground text-sm">Please view on a larger screen to use the split-screen PDF viewer effectively.</p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex w-full flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            
            {/* COLUMN 1: Year Selector */}
            <ResizablePanel defaultSize={5} minSize={4} maxSize={8} className="bg-muted/30 border-r border-border flex flex-col items-center py-4 h-full">
              {years.map((year) => (
                <button
                  key={year.id}
                  onClick={() => setSelectedYear(year.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group relative w-12 h-14 mb-2",
                    selectedYear === year.id
                      ? "bg-background shadow-sm border border-border/50 text-primary"
                      : "hover:bg-background/50 text-muted-foreground"
                  )}
                >
                  {selectedYear === year.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
                  )}
                  <Badge variant={selectedYear === year.id ? "default" : "secondary"} className="mb-0.5 w-6 h-6 flex items-center justify-center rounded-md p-0 text-[10px]">
                    {year.id}
                  </Badge>
                  <span className="text-[9px] font-bold">{year.short}</span>
                </button>
              ))}
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* COLUMN 2: Explorer */}
            <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="bg-background/50 flex flex-col h-full">
              <div className="h-10 border-b border-border flex items-center px-4 shrink-0 bg-background/80 backdrop-blur justify-between">
                <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                  EXPLORER: {years.find((y) => y.id === selectedYear)?.label}
                </span>
                {loading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
              </div>

              <ScrollArea className="flex-1">
                <div className="py-2">{renderExplorerContent()}</div>
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* COLUMN 3: Viewer (Tabs + Content) */}
            <ResizablePanel defaultSize={65} className="bg-muted/10 flex flex-col h-full relative">
              
              {/* --- TAB BAR --- */}
              <div className="h-10 bg-background border-b border-border flex items-end px-2 shrink-0 gap-1 overflow-x-auto no-scrollbar">
                
                {tabs.map((tab) => (
                  <div 
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={cn(
                      "group relative flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] h-8 text-xs rounded-t-md cursor-pointer border-t border-x border-transparent transition-all user-select-none",
                      activeTabId === tab.id 
                        ? "bg-background border-border/50 text-foreground shadow-sm mb-[-1px] pb-2 z-10" 
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <FileText className={cn("w-3 h-3 shrink-0", activeTabId === tab.id ? "text-blue-500" : "opacity-50")} />
                    
                    <span className="truncate flex-1">
                      {tab.file ? tab.file.title : "New Tab"}
                    </span>
                    
                    <button
                      onClick={(e) => handleCloseTab(e, tab.id)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-100 hover:text-red-600 rounded-sm transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleAddTab}
                  className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-1 mb-1"
                  title="New Tab"
                >
                  <Plus className="w-4 h-4" />
                </button>

              </div>

              {/* --- CONTENT AREA --- */}
              <div className="flex-1 relative w-full h-full bg-white dark:bg-zinc-900 overflow-hidden">
                {activeTab && activeTab.file ? (
                  isImage(activeTab.file.url) ? (
                    <img
                      src={activeTab.file.url}
                      alt="Question Paper"
                      className="max-w-full max-h-full object-contain p-4 mx-auto"
                    />
                  ) : (
                    <iframe
                      src={`${activeTab.file.url}#toolbar=0`}
                      className="w-full h-full border-0 block"
                      title="PDF Preview"
                    />
                  )
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6 h-full">
                    <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                      <BookOpen className="w-12 h-12 opacity-50" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      No Document Selected
                    </h3>
                    <p className="text-sm text-center max-w-md mb-6">
                      Select a paper from the explorer on the left to view it in this tab.
                    </p>
                    <button 
                      onClick={handleAddTab}
                      className="flex items-center gap-2 text-xs bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                    >
                      <Plus className="w-3 h-3" /> Open Another Tab
                    </button>
                  </div>
                )}
              </div>

            </ResizablePanel>

          </ResizablePanelGroup>
        </div>

      </div>
    </div>
  );
};

export default PYQs;