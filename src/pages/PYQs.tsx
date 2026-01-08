


// import { useState, useEffect } from "react";
// import styled, { keyframes, css } from 'styled-components'; 
// import axios from "axios";
// import Navbar from "@/components/layout/Navbar";
// import { 
//   ResizableHandle, 
//   ResizablePanel, 
//   ResizablePanelGroup 
// } from "@/components/ui/resizable";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { 
//   Accordion, 
//   AccordionContent, 
//   AccordionItem, 
//   AccordionTrigger 
// } from "@/components/ui/accordion";
// import { 
//   // Standard UI Icons
//   FileText, Folder, Monitor, X, Loader2, BookOpen, Plus, 
//   // Subject Specific Icons
//   Calculator, Atom, Bot, Zap, Terminal, FlaskConical, Palette, 
//   Code2, Leaf, Cpu, Wifi, Activity, BrainCircuit, Briefcase 
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// // --- Configuration ---
// const API_URL = import.meta.env.VITE_API_URL 
//   ? `${import.meta.env.VITE_API_URL}/api/pyqs` 
//   : "http://localhost:5000/api/pyqs";

// // --- Data Definitions ---
// const years = [
//   { id: "1", label: "FIRST", full: "First Year" },
//   { id: "2", label: "SECOND", full: "Second Year" },
//   { id: "3", label: "THIRD", full: "Third Year" },
//   { id: "4", label: "FOURTH", full: "Fourth Year" },
// ];

// const year1Subjects = [
//   "Linear Algebra and Calculus (LAC)", "Quantum Physics (QP)", "Mechanics for Robotics (MFR)",
//   "Integrated Electrical and Electronics Engineering (IEEE)", "C Programming for Problem Solving (CPPS)",
//   "Statistics and Integral Calculus (SIC)", "Chemical Science and Technology (CST)",
//   "Computer Graphics and Design (CGD)", "Object Oriented Programming Using C++ (OOPC)",
//   "Environment and Sustainable Engineering (ESE)"
// ];

// const branches = [
//   "Computer Engineering", "Information Technology", "Electronics and Telecommunication Engineering",
//   "Artificial Intelligence & Data Science", "Electronics & Computer Engineering"
// ];

// const year2Subjects: Record<string, string[]> = {
//   "Computer Engineering": ["Data Structures (DS)", "Computer Organisation and Architecture (COA)", "Discrete Mathematics (DM)"],
//   "Information Technology": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Development and Management (ESDM)"],
//   "Electronics and Telecommunication Engineering": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
//   "Artificial Intelligence & Data Science": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
//   "Electronics & Computer Engineering": ["Analog and Digital Electronics (ADE)", "Analog and Digital Electronics Lab (ADEL)", "Operating System (OS)", "Principles of Data Structure (PDS)"]
// };

// // --- STYLED COMPONENT ---
// const StyledBtnWrapper = styled.div<{ $isActive: boolean }>`
//   /* Ensure the wrapper itself doesn't block layout */
//   display: flex; 

//   button {
//    width: 100%; /* Force button to fill the flex container */
//    border: none;
//    color: #fff;
//    /* Dynamic Gradient: Active gets the colors, Inactive is Gray */
//    background-image: ${props => props.$isActive 
//      ? 'linear-gradient(30deg, #6366f1, #a855f7, #ec4899)' // Indigo -> Purple -> Pink
//      : 'linear-gradient(30deg, #52525b, #71717a)'};       // Zinc Gray
//    border-radius: 20px;
//    background-size: 100% auto;
//    font-family: inherit;
//    font-size: 11px; 
//    font-weight: 700;
//    padding: 0.6em 0; /* Vertical padding only, horizontal handled by width */
   
//    /* Center Content */
//    display: flex;
//    justify-content: center;
//    align-items: center;

//    cursor: pointer;
//    transition: all 0.3s ease;
//    white-space: nowrap;
//    opacity: ${props => props.$isActive ? '1' : '0.7'};
//   }

//   button:hover {
//    background-position: right center;
//    background-size: 200% auto;
//    opacity: 1;
//    -webkit-animation: pulse 2s infinite;
//    animation: pulse512 1.5s infinite;
//    /* Switch inactive to color on hover */
//    background-image: linear-gradient(30deg, #6366f1, #a855f7, #ec4899);
//   }

//   @keyframes pulse512 {
//    0% {
//     box-shadow: 0 0 0 0 #a855f766; /* Purple tint */
//    }

//    70% {
//     box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
//    }

//    100% {
//     box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
//    }
//   }
// `;

// // --- Components ---
// const SubjectIcon = ({ name }: { name: string }) => {
//   const n = name.toLowerCase();
//   const iconBase = "w-4 h-4 mr-2.5 shrink-0"; 
//   if (n.includes("calculus") || n.includes("algebra") || n.includes("statistics") || n.includes("math")) return <Calculator className={`${iconBase} text-pink-500`} />;
//   if (n.includes("physics") || n.includes("quantum")) return <Atom className={`${iconBase} text-cyan-500`} />;
//   if (n.includes("chemical") || n.includes("chemistry")) return <FlaskConical className={`${iconBase} text-teal-500`} />;
//   if (n.includes("data structure") || n.includes("dsa") || n.includes("algorithm")) return <Code2 className={`${iconBase} text-indigo-500`} />;
//   if (n.includes("programming") || n.includes("cpp") || n.includes("oop") || n.includes("java")) return <Terminal className={`${iconBase} text-violet-600`} />;
//   if (n.includes("operating system") || n.includes("os")) return <Monitor className={`${iconBase} text-slate-600`} />;
//   if (n.includes("intelligence") || n.includes("ai") || n.includes("data science")) return <BrainCircuit className={`${iconBase} text-purple-600`} />;
//   if (n.includes("circuit") || n.includes("analog") || n.includes("digital")) return <Zap className={`${iconBase} text-yellow-600`} />;
//   if (n.includes("processor") || n.includes("architecture") || n.includes("coa") || n.includes("hardware")) return <Cpu className={`${iconBase} text-orange-500`} />;
//   if (n.includes("signals") || n.includes("systems")) return <Activity className={`${iconBase} text-amber-600`} />;
//   if (n.includes("network") || n.includes("internet") || n.includes("iot")) return <Wifi className={`${iconBase} text-blue-500`} />;
//   if (n.includes("mechanics") || n.includes("robotics")) return <Bot className={`${iconBase} text-slate-700`} />;
//   if (n.includes("graphics") || n.includes("design")) return <Palette className={`${iconBase} text-rose-400`} />;
//   if (n.includes("environment") || n.includes("sustainable")) return <Leaf className={`${iconBase} text-green-600`} />;
//   if (n.includes("management") || n.includes("entrepreneurial")) return <Briefcase className={`${iconBase} text-amber-800`} />;
//   return <BookOpen className={`${iconBase} text-muted-foreground`} />;
// };

// const PYQs = () => {
//   const [selectedYear, setSelectedYear] = useState("1");
//   const [papers, setPapers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- TAB STATE MANAGEMENT ---
//   const [tabs, setTabs] = useState<{ id: number; file: any }[]>([{ id: Date.now(), file: null }]);
//   const [activeTabId, setActiveTabId] = useState(tabs[0].id);

//   // --- API CALLS ---
//   const fetchPapers = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setPapers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch papers", err);
//       toast.error("Could not load papers. Is the server running?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPapers();
//   }, []);

//   // --- TAB ACTIONS ---
//   const handleAddTab = () => {
//     const newTab = { id: Date.now(), file: null };
//     setTabs([...tabs, newTab]);
//     setActiveTabId(newTab.id);
//   };

//   const handleCloseTab = (e: React.MouseEvent, tabId: number) => {
//     e.stopPropagation();
//     if (tabs.length === 1) {
//       setTabs([{ id: Date.now(), file: null }]);
//       return;
//     }
//     const newTabs = tabs.filter(t => t.id !== tabId);
//     setTabs(newTabs);
//     if (activeTabId === tabId) {
//       setActiveTabId(newTabs[newTabs.length - 1].id);
//     }
//   };

//   const handleFileSelect = (paper: any) => {
//     const fileData = { title: paper.title, subject: paper.subject, url: paper.fileUrl };
//     setTabs(tabs.map(tab => 
//       tab.id === activeTabId ? { ...tab, file: fileData } : tab
//     ));
//   };

//   // --- RENDERING HELPERS ---
//   const getPapersForSubject = (subjectName: string) => {
//     return papers.filter(p => p.subject === subjectName && p.year === selectedYear);
//   };

//   const renderPapersList = (subjectName: string) => {
//     const subjectPapers = getPapersForSubject(subjectName);
//     const activeTab = tabs.find(t => t.id === activeTabId);

//     if (subjectPapers.length === 0) {
//       return <div className="pl-9 py-1 text-xs text-muted-foreground italic">No papers yet...</div>;
//     }

//     return (
//       <div className="pl-4 flex flex-col gap-1 py-1">
//         {subjectPapers.map((paper) => (
//           <button
//             key={paper._id}
//             onClick={() => handleFileSelect(paper)}
//             className={cn(
//               "flex items-center px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent group text-left",
//               activeTab?.file?.url === paper.fileUrl ? "bg-accent text-accent-foreground" : "text-muted-foreground"
//             )}
//           >
//             <FileText className="w-4 h-4 mr-2.5 text-blue-400 shrink-0" />
//             <span className="truncate">{paper.title}</span>
//             <span className="ml-auto text-[10px] opacity-50 border px-1 rounded">{paper.paperType}</span>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const renderExplorerContent = () => {
//     if (selectedYear === "1") {
//       return (
//         <Accordion type="multiple" className="w-full">
//           {year1Subjects.map((subject, index) => (
//             <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
//               <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-normal data-[state=open]:text-foreground text-muted-foreground hover:no-underline">
//                 <div className="flex items-center text-left">
//                   <SubjectIcon name={subject} />
//                   <span className="line-clamp-1">{subject}</span>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 {renderPapersList(subject)}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       );
//     }
//     return (
//       <Accordion type="multiple" className="w-full">
//         {branches.map((branch, branchIndex) => (
//           <AccordionItem key={branchIndex} value={`branch-${branchIndex}`} className="border-b-0">
//             <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-medium hover:no-underline">
//               <div className="flex items-center text-left">
//                 <Folder className="w-4 h-4 mr-2.5 text-indigo-400 fill-indigo-400/20" />
//                 <span>{branch}</span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent className="pb-0">
//               <div className="pl-4 border-l ml-6 border-border/50">
//                 {selectedYear === "2" ? (
//                   <Accordion type="multiple" className="w-full">
//                     {year2Subjects[branch]?.map((subject, subIndex) => (
//                       <AccordionItem key={subIndex} value={`sub-${branchIndex}-${subIndex}`} className="border-b-0">
//                         <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-normal text-muted-foreground hover:no-underline data-[state=open]:text-foreground">
//                           <div className="flex items-center text-left">
//                             <SubjectIcon name={subject} />
//                             <span className="line-clamp-1">{subject}</span>
//                           </div>
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           {renderPapersList(subject)}
//                         </AccordionContent>
//                       </AccordionItem>
//                     ))}
//                   </Accordion>
//                 ) : (
//                   <div className="px-4 py-3 text-xs text-muted-foreground italic">Coming soon...</div>
//                 )}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     );
//   };

//   const isImage = (url: string) => {
//     return url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) != null;
//   };

//   const activeTab = tabs.find(t => t.id === activeTabId);

//   return (
//     <div className="min-h-screen bg-background flex flex-col font-sans overflow-hidden">
//       <Navbar />
      
//       <div className="flex-1 flex pt-16 h-screen overflow-hidden">
        
//         {/* Mobile View Placeholder */}
//         <div className="md:hidden flex flex-col w-full h-full items-center justify-center p-4 text-center">
//             <h2 className="font-bold text-lg mb-2">Desktop View Recommended</h2>
//             <p className="text-muted-foreground text-sm">Please view on a larger screen to use the split-screen PDF viewer effectively.</p>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden md:flex w-full flex-1 overflow-hidden">
//           <ResizablePanelGroup direction="horizontal" className="h-full">
            
//             {/* COLUMN 1: Explorer & Year Selector (REDUCED SIZE to 25%) */}
//             <ResizablePanel defaultSize={25} minSize={15} maxSize={35} className="bg-background/50 flex flex-col h-full">
              
//               {/* --- HEADER WITH BUTTONS --- */}
//               <div className="h-14 border-b border-border flex w-full items-center px-2 shrink-0 bg-background/80 backdrop-blur gap-2">
                
//                 {years.map((year) => (
//                   <StyledBtnWrapper 
//                     key={year.id} 
//                     $isActive={selectedYear === year.id}
//                     onClick={() => setSelectedYear(year.id)}
//                     className="flex-1 min-w-0"
//                   >
//                     <button>
//                       {year.label}
//                     </button>
//                   </StyledBtnWrapper>
//                 ))}

//                 {loading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
//               </div>

//               <ScrollArea className="flex-1">
//                 <div className="py-2">{renderExplorerContent()}</div>
//               </ScrollArea>
//             </ResizablePanel>

//             <ResizableHandle withHandle />

//             {/* COLUMN 2: Viewer (Tabs + Content) (INCREASED SIZE to 75%) */}
//             <ResizablePanel defaultSize={75} className="bg-muted/10 flex flex-col h-full relative">
              
//               {/* --- TAB BAR --- */}
//               <div className="h-10 bg-background border-b border-border flex items-end px-2 shrink-0 gap-1 overflow-x-auto no-scrollbar">
                
//                 {tabs.map((tab) => (
//                   <div 
//                     key={tab.id}
//                     onClick={() => setActiveTabId(tab.id)}
//                     className={cn(
//                       "group relative flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] h-8 text-xs rounded-t-md cursor-pointer border-t border-x border-transparent transition-all user-select-none",
//                       activeTabId === tab.id 
//                         ? "bg-background border-border/50 text-foreground shadow-sm mb-[-1px] pb-2 z-10" 
//                         : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
//                     )}
//                   >
//                     <FileText className={cn("w-3 h-3 shrink-0", activeTabId === tab.id ? "text-blue-500" : "opacity-50")} />
                    
//                     <span className="truncate flex-1">
//                       {tab.file ? tab.file.title : "New Tab"}
//                     </span>
                    
//                     <button
//                       onClick={(e) => handleCloseTab(e, tab.id)}
//                       className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-100 hover:text-red-600 rounded-sm transition-all"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 ))}

//                 <button
//                   onClick={handleAddTab}
//                   className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-1 mb-1"
//                   title="New Tab"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>

//               </div>

//               {/* --- CONTENT AREA --- */}
//               <div className="flex-1 relative w-full h-full bg-white dark:bg-zinc-900 overflow-hidden">
//                 {activeTab && activeTab.file ? (
//                   isImage(activeTab.file.url) ? (
//                     <img
//                       src={activeTab.file.url}
//                       alt="Question Paper"
//                       className="max-w-full max-h-full object-contain p-4 mx-auto"
//                     />
//                   ) : (
//                     <iframe
//                       src={`${activeTab.file.url}#toolbar=0`}
//                       className="w-full h-full border-0 block"
//                       title="PDF Preview"
//                     />
//                   )
//                 ) : (
//                   <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6 h-full">
//                     <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
//                       <BookOpen className="w-12 h-12 opacity-50" />
//                     </div>
//                     <h3 className="text-xl font-bold mb-2 text-foreground">
//                       No Document Selected
//                     </h3>
//                     <p className="text-sm text-center max-w-md mb-6">
//                       Select a paper from the explorer on the left to view it in this tab.
//                     </p>
//                     <button 
//                       onClick={handleAddTab}
//                       className="flex items-center gap-2 text-xs bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
//                     >
//                       <Plus className="w-3 h-3" /> Open Another Tab
//                     </button>
//                   </div>
//                 )}
//               </div>

//             </ResizablePanel>

//           </ResizablePanelGroup>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PYQs;




// import { useState, useEffect } from "react";
// import styled from 'styled-components'; 
// import axios from "axios";
// // Removed Navbar import
// import { 
//   ResizableHandle, 
//   ResizablePanel, 
//   ResizablePanelGroup 
// } from "@/components/ui/resizable";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { 
//   Accordion, 
//   AccordionContent, 
//   AccordionItem, 
//   AccordionTrigger 
// } from "@/components/ui/accordion";
// import { 
//   // Standard UI Icons
//   FileText, Folder, Monitor, X, Loader2, BookOpen, Plus, 
//   // Subject Specific Icons
//   Calculator, Atom, Bot, Zap, Terminal, FlaskConical, Palette, 
//   Code2, Leaf, Cpu, Wifi, Activity, BrainCircuit, Briefcase 
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// // --- Configuration ---
// const API_URL = import.meta.env.VITE_API_URL 
//   ? `${import.meta.env.VITE_API_URL}/api/pyqs` 
//   : "http://localhost:5000/api/pyqs";

// // --- Data Definitions ---
// const years = [
//   { id: "1", label: "FIRST", full: "First Year" },
//   { id: "2", label: "SECOND", full: "Second Year" },
//   { id: "3", label: "THIRD", full: "Third Year" },
//   { id: "4", label: "FOURTH", full: "Fourth Year" },
// ];

// const year1Subjects = [
//   "Linear Algebra and Calculus (LAC)", "Quantum Physics (QP)", "Mechanics for Robotics (MFR)",
//   "Integrated Electrical and Electronics Engineering (IEEE)", "C Programming for Problem Solving (CPPS)",
//   "Statistics and Integral Calculus (SIC)", "Chemical Science and Technology (CST)",
//   "Computer Graphics and Design (CGD)", "Object Oriented Programming Using C++ (OOPC)",
//   "Environment and Sustainable Engineering (ESE)"
// ];

// const branches = [
//   "Computer Engineering", "Information Technology", "Electronics and Telecommunication Engineering",
//   "Artificial Intelligence & Data Science", "Electronics & Computer Engineering"
// ];

// const year2Subjects: Record<string, string[]> = {
//   "Computer Engineering": ["Data Structures (DS)", "Computer Organisation and Architecture (COA)", "Discrete Mathematics (DM)"],
//   "Information Technology": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Development and Management (ESDM)"],
//   "Electronics and Telecommunication Engineering": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
//   "Artificial Intelligence & Data Science": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
//   "Electronics & Computer Engineering": ["Analog and Digital Electronics (ADE)", "Analog and Digital Electronics Lab (ADEL)", "Operating System (OS)", "Principles of Data Structure (PDS)"]
// };

// // --- STYLED COMPONENT ---
// const StyledBtnWrapper = styled.div<{ $isActive: boolean }>`
//   /* Ensure the wrapper itself doesn't block layout */
//   display: flex; 

//   button {
//    width: 100%; /* Force button to fill the flex container */
//    border: none;
//    color: #fff;
//    /* Dynamic Gradient: Active gets the colors, Inactive is Gray */
//    background-image: ${props => props.$isActive 
//      ? 'linear-gradient(30deg, #6366f1, #a855f7, #ec4899)' // Indigo -> Purple -> Pink
//      : 'linear-gradient(30deg, #52525b, #71717a)'};       // Zinc Gray
//    border-radius: 12px; /* Slightly softer radius */
//    background-size: 100% auto;
//    font-family: inherit;
//    font-size: 11px; 
//    font-weight: 600;
//    padding: 0.6em 0; 
   
//    /* Center Content */
//    display: flex;
//    justify-content: center;
//    align-items: center;

//    cursor: pointer;
//    transition: all 0.3s ease;
//    white-space: nowrap;
//    opacity: ${props => props.$isActive ? '1' : '0.8'};
//    box-shadow: ${props => props.$isActive ? '0 4px 12px rgba(168, 85, 247, 0.25)' : 'none'};
//   }

//   button:hover {
//    background-position: right center;
//    background-size: 200% auto;
//    opacity: 1;
//    transform: translateY(-1px);
//    background-image: linear-gradient(30deg, #6366f1, #a855f7, #ec4899);
//   }
// `;

// // --- Components ---
// const SubjectIcon = ({ name }: { name: string }) => {
//   const n = name.toLowerCase();
//   const iconBase = "w-4 h-4 mr-2.5 shrink-0"; 
//   if (n.includes("calculus") || n.includes("algebra") || n.includes("statistics") || n.includes("math")) return <Calculator className={`${iconBase} text-pink-500`} />;
//   if (n.includes("physics") || n.includes("quantum")) return <Atom className={`${iconBase} text-cyan-500`} />;
//   if (n.includes("chemical") || n.includes("chemistry")) return <FlaskConical className={`${iconBase} text-teal-500`} />;
//   if (n.includes("data structure") || n.includes("dsa") || n.includes("algorithm")) return <Code2 className={`${iconBase} text-indigo-500`} />;
//   if (n.includes("programming") || n.includes("cpp") || n.includes("oop") || n.includes("java")) return <Terminal className={`${iconBase} text-violet-600`} />;
//   if (n.includes("operating system") || n.includes("os")) return <Monitor className={`${iconBase} text-slate-600`} />;
//   if (n.includes("intelligence") || n.includes("ai") || n.includes("data science")) return <BrainCircuit className={`${iconBase} text-purple-600`} />;
//   if (n.includes("circuit") || n.includes("analog") || n.includes("digital")) return <Zap className={`${iconBase} text-yellow-600`} />;
//   if (n.includes("processor") || n.includes("architecture") || n.includes("coa") || n.includes("hardware")) return <Cpu className={`${iconBase} text-orange-500`} />;
//   if (n.includes("signals") || n.includes("systems")) return <Activity className={`${iconBase} text-amber-600`} />;
//   if (n.includes("network") || n.includes("internet") || n.includes("iot")) return <Wifi className={`${iconBase} text-blue-500`} />;
//   if (n.includes("mechanics") || n.includes("robotics")) return <Bot className={`${iconBase} text-slate-700`} />;
//   if (n.includes("graphics") || n.includes("design")) return <Palette className={`${iconBase} text-rose-400`} />;
//   if (n.includes("environment") || n.includes("sustainable")) return <Leaf className={`${iconBase} text-green-600`} />;
//   if (n.includes("management") || n.includes("entrepreneurial")) return <Briefcase className={`${iconBase} text-amber-800`} />;
//   return <BookOpen className={`${iconBase} text-muted-foreground`} />;
// };

// const PYQs = () => {
//   const [selectedYear, setSelectedYear] = useState("1");
//   const [papers, setPapers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- TAB STATE MANAGEMENT ---
//   const [tabs, setTabs] = useState<{ id: number; file: any }[]>([{ id: Date.now(), file: null }]);
//   const [activeTabId, setActiveTabId] = useState(tabs[0].id);

//   // --- API CALLS ---
//   const fetchPapers = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setPapers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch papers", err);
//       toast.error("Could not load papers. Is the server running?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPapers();
//   }, []);

//   // --- TAB ACTIONS ---
//   const handleAddTab = () => {
//     const newTab = { id: Date.now(), file: null };
//     setTabs([...tabs, newTab]);
//     setActiveTabId(newTab.id);
//   };

//   const handleCloseTab = (e: React.MouseEvent, tabId: number) => {
//     e.stopPropagation();
//     if (tabs.length === 1) {
//       setTabs([{ id: Date.now(), file: null }]);
//       return;
//     }
//     const newTabs = tabs.filter(t => t.id !== tabId);
//     setTabs(newTabs);
//     if (activeTabId === tabId) {
//       setActiveTabId(newTabs[newTabs.length - 1].id);
//     }
//   };

//   const handleFileSelect = (paper: any) => {
//     const fileData = { title: paper.title, subject: paper.subject, url: paper.fileUrl };
//     setTabs(tabs.map(tab => 
//       tab.id === activeTabId ? { ...tab, file: fileData } : tab
//     ));
//   };

//   // --- RENDERING HELPERS ---
//   const getPapersForSubject = (subjectName: string) => {
//     return papers.filter(p => p.subject === subjectName && p.year === selectedYear);
//   };

//   const renderPapersList = (subjectName: string) => {
//     const subjectPapers = getPapersForSubject(subjectName);
//     const activeTab = tabs.find(t => t.id === activeTabId);

//     if (subjectPapers.length === 0) {
//       return <div className="pl-9 py-1 text-xs text-muted-foreground italic">No papers yet...</div>;
//     }

//     return (
//       <div className="pl-4 flex flex-col gap-1 py-1">
//         {subjectPapers.map((paper) => (
//           <button
//             key={paper._id}
//             onClick={() => handleFileSelect(paper)}
//             className={cn(
//               "flex items-center px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent group text-left",
//               activeTab?.file?.url === paper.fileUrl ? "bg-accent text-accent-foreground" : "text-muted-foreground"
//             )}
//           >
//             <FileText className="w-4 h-4 mr-2.5 text-blue-400 shrink-0" />
//             <span className="truncate">{paper.title}</span>
//             <span className="ml-auto text-[10px] opacity-50 border px-1 rounded">{paper.paperType}</span>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const renderExplorerContent = () => {
//     if (selectedYear === "1") {
//       return (
//         <Accordion type="multiple" className="w-full">
//           {year1Subjects.map((subject, index) => (
//             <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
//               <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-normal data-[state=open]:text-foreground text-muted-foreground hover:no-underline">
//                 <div className="flex items-center text-left">
//                   <SubjectIcon name={subject} />
//                   <span className="line-clamp-1">{subject}</span>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 {renderPapersList(subject)}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       );
//     }
//     return (
//       <Accordion type="multiple" className="w-full">
//         {branches.map((branch, branchIndex) => (
//           <AccordionItem key={branchIndex} value={`branch-${branchIndex}`} className="border-b-0">
//             <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-medium hover:no-underline">
//               <div className="flex items-center text-left">
//                 <Folder className="w-4 h-4 mr-2.5 text-indigo-400 fill-indigo-400/20" />
//                 <span>{branch}</span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent className="pb-0">
//               <div className="pl-4 border-l ml-6 border-border/50">
//                 {selectedYear === "2" ? (
//                   <Accordion type="multiple" className="w-full">
//                     {year2Subjects[branch]?.map((subject, subIndex) => (
//                       <AccordionItem key={subIndex} value={`sub-${branchIndex}-${subIndex}`} className="border-b-0">
//                         <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-normal text-muted-foreground hover:no-underline data-[state=open]:text-foreground">
//                           <div className="flex items-center text-left">
//                             <SubjectIcon name={subject} />
//                             <span className="line-clamp-1">{subject}</span>
//                           </div>
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           {renderPapersList(subject)}
//                         </AccordionContent>
//                       </AccordionItem>
//                     ))}
//                   </Accordion>
//                 ) : (
//                   <div className="px-4 py-3 text-xs text-muted-foreground italic">Coming soon...</div>
//                 )}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     );
//   };

//   const isImage = (url: string) => {
//     return url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) != null;
//   };

//   const activeTab = tabs.find(t => t.id === activeTabId);

//   return (
//     // 1. Full viewport height, no navbar margin
//     <div className="h-screen w-full bg-background flex flex-col font-sans overflow-hidden">
      
//       {/* 2. No Navbar Component here */}
      
//       {/* 3. Main Workspace Container 
//           - No top margin
//           - Height is full
//       */}
//       <div className="flex flex-col flex-1 h-full overflow-hidden relative">
        
//         {/* Mobile View Placeholder */}
//         <div className="md:hidden flex flex-col w-full h-full items-center justify-center p-4 text-center">
//             <h2 className="font-bold text-lg mb-2">Desktop View Recommended</h2>
//             <p className="text-muted-foreground text-sm">Please view on a larger screen to use the split-screen PDF viewer effectively.</p>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden md:flex w-full h-full">
//           <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            
//             {/* COLUMN 1: Explorer & Year Selector */}
//             <ResizablePanel defaultSize={25} minSize={20} maxSize={35} className="bg-background flex flex-col h-full border-r">
              
//               {/* --- HEADER WITH BUTTONS --- */}
//               <div className="h-16 border-b border-border/60 flex w-full items-center px-4 shrink-0 bg-muted/20 gap-3">
                
//                 {years.map((year) => (
//                   <StyledBtnWrapper 
//                     key={year.id} 
//                     $isActive={selectedYear === year.id}
//                     onClick={() => setSelectedYear(year.id)}
//                     className="flex-1 min-w-0"
//                   >
//                     <button>
//                       {year.label}
//                     </button>
//                   </StyledBtnWrapper>
//                 ))}

//                 {loading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
//               </div>

//               <ScrollArea className="flex-1">
//                 <div className="py-2 pb-20">{renderExplorerContent()}</div>
//               </ScrollArea>
//             </ResizablePanel>

//             <ResizableHandle withHandle className="bg-border/50 hover:bg-primary/50 transition-colors w-1" />

//             {/* COLUMN 2: Viewer (Tabs + Content) */}
//             <ResizablePanel defaultSize={75} className="bg-muted/10 flex flex-col h-full relative">
              
//               {/* --- TAB BAR --- */}
//               <div className="h-10 bg-background border-b border-border/60 flex items-end px-2 shrink-0 gap-1 overflow-x-auto no-scrollbar pt-1">
                
//                 {tabs.map((tab) => (
//                   <div 
//                     key={tab.id}
//                     onClick={() => setActiveTabId(tab.id)}
//                     className={cn(
//                       "group relative flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] h-9 text-xs rounded-t-lg cursor-pointer border-t border-x border-transparent transition-all user-select-none",
//                       activeTabId === tab.id 
//                         ? "bg-background border-border/40 text-foreground shadow-sm mb-[-1px] pb-2 z-10 font-medium" 
//                         : "bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
//                     )}
//                   >
//                     <FileText className={cn("w-3.5 h-3.5 shrink-0", activeTabId === tab.id ? "text-blue-500" : "opacity-50")} />
                    
//                     <span className="truncate flex-1">
//                       {tab.file ? tab.file.title : "New Tab"}
//                     </span>
                    
//                     <button
//                       onClick={(e) => handleCloseTab(e, tab.id)}
//                       className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-100 hover:text-red-600 rounded-sm transition-all"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 ))}

//                 <button
//                   onClick={handleAddTab}
//                   className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors ml-1 mb-1"
//                   title="New Tab"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>

//               </div>

//               {/* --- CONTENT AREA --- */}
//               <div className="flex-1 relative w-full h-full bg-white dark:bg-zinc-950/50 overflow-hidden">
//                 {activeTab && activeTab.file ? (
//                   isImage(activeTab.file.url) ? (
//                     <div className="w-full h-full overflow-auto flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
//                         <img
//                         src={activeTab.file.url}
//                         alt="Question Paper"
//                         className="max-w-full max-h-full object-contain p-4 shadow-lg bg-white"
//                         />
//                     </div>
//                   ) : (
//                     <iframe
//                       src={`${activeTab.file.url}#toolbar=0`}
//                       className="w-full h-full border-0 block"
//                       title="PDF Preview"
//                     />
//                   )
//                 ) : (
//                   <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6 h-full bg-grid-pattern">
//                     <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-6 border border-border/50">
//                       <BookOpen className="w-10 h-10 opacity-40 text-primary" />
//                     </div>
//                     <h3 className="text-xl font-bold mb-2 text-foreground">
//                       No Document Selected
//                     </h3>
//                     <p className="text-sm text-center max-w-md mb-6 text-muted-foreground/80">
//                       Select a paper from the explorer on the left to view it here.
//                     </p>
//                     <button 
//                       onClick={handleAddTab}
//                       className="flex items-center gap-2 text-xs bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20"
//                     >
//                       <Plus className="w-3.5 h-3.5" /> Open Another Tab
//                     </button>
//                   </div>
//                 )}
//               </div>

//             </ResizablePanel>

//           </ResizablePanelGroup>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PYQs;






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
import {
  // Standard UI Icons
  FileText, Folder, Monitor, X, Loader2, BookOpen, Plus,
  // Subject Specific Icons
  Calculator, Atom, Bot, Zap, Terminal, FlaskConical, Palette,
  Code2, Leaf, Cpu, Wifi, Activity, BrainCircuit, Briefcase, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// --- Configuration ---
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/pyqs`
  : "http://localhost:5000/api/pyqs";

// --- Data Definitions ---
const years = [
  { id: "1", label: "Year 1", short: "FE" },
  { id: "2", label: "Year 2", short: "SE" },
  { id: "3", label: "Year 3", short: "TE" },
  { id: "4", label: "Year 4", short: "BE" },
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

const year2Subjects: Record<string, string[]> = {
  "Computer Engineering": ["Data Structures (DS)", "Computer Organisation and Architecture (COA)", "Discrete Mathematics (DM)"],
  "Information Technology": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Development and Management (ESDM)"],
  "Electronics and Telecommunication Engineering": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
  "Artificial Intelligence & Data Science": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
  "Electronics & Computer Engineering": ["Analog and Digital Electronics (ADE)", "Analog and Digital Electronics Lab (ADEL)", "Operating System (OS)", "Principles of Data Structure (PDS)"]
};

// --- Components ---
const SubjectIcon = ({ name }: { name: string }) => {
  const n = name.toLowerCase();
  const iconBase = "w-4 h-4 mr-2.5 shrink-0";
  if (n.includes("calculus") || n.includes("algebra") || n.includes("statistics") || n.includes("math")) return <Calculator className={`${iconBase} text-pink-500`} />;
  if (n.includes("physics") || n.includes("quantum")) return <Atom className={`${iconBase} text-cyan-500`} />;
  if (n.includes("chemical") || n.includes("chemistry")) return <FlaskConical className={`${iconBase} text-teal-500`} />;
  if (n.includes("data structure") || n.includes("dsa") || n.includes("algorithm")) return <Code2 className={`${iconBase} text-indigo-500`} />;
  if (n.includes("programming") || n.includes("cpp") || n.includes("oop") || n.includes("java")) return <Terminal className={`${iconBase} text-violet-600`} />;
  if (n.includes("operating system") || n.includes("os")) return <Monitor className={`${iconBase} text-slate-600`} />;
  if (n.includes("intelligence") || n.includes("ai") || n.includes("data science")) return <BrainCircuit className={`${iconBase} text-purple-600`} />;
  if (n.includes("circuit") || n.includes("analog") || n.includes("digital")) return <Zap className={`${iconBase} text-yellow-600`} />;
  if (n.includes("processor") || n.includes("architecture") || n.includes("coa") || n.includes("hardware")) return <Cpu className={`${iconBase} text-orange-500`} />;
  if (n.includes("signals") || n.includes("systems")) return <Activity className={`${iconBase} text-amber-600`} />;
  if (n.includes("network") || n.includes("internet") || n.includes("iot")) return <Wifi className={`${iconBase} text-blue-500`} />;
  if (n.includes("mechanics") || n.includes("robotics")) return <Bot className={`${iconBase} text-slate-700`} />;
  if (n.includes("graphics") || n.includes("design")) return <Palette className={`${iconBase} text-rose-400`} />;
  if (n.includes("environment") || n.includes("sustainable")) return <Leaf className={`${iconBase} text-green-600`} />;
  if (n.includes("management") || n.includes("entrepreneurial")) return <Briefcase className={`${iconBase} text-amber-800`} />;
  return <BookOpen className={`${iconBase} text-neutral-500`} />;
};

const PYQs = () => {
  const [selectedYear, setSelectedYear] = useState("1");
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- TAB STATE MANAGEMENT ---
  const [tabs, setTabs] = useState<{ id: number; file: any }[]>([{ id: Date.now(), file: null }]);
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

  const handleCloseTab = (e: React.MouseEvent, tabId: number) => {
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

  const handleFileSelect = (paper: any) => {
    const fileData = { title: paper.title, subject: paper.subject, url: paper.fileUrl };
    setTabs(tabs.map(tab =>
      tab.id === activeTabId ? { ...tab, file: fileData } : tab
    ));
  };

  // --- RENDERING HELPERS ---
  const getPapersForSubject = (subjectName: string) => {
    return papers.filter(p => p.subject === subjectName && p.year === selectedYear);
  };

  const renderPapersList = (subjectName: string) => {
    const subjectPapers = getPapersForSubject(subjectName);
    const activeTab = tabs.find(t => t.id === activeTabId);

    if (subjectPapers.length === 0) {
      return <div className="pl-9 py-2 text-xs text-neutral-600 italic">No papers available yet...</div>;
    }

    return (
      <div className="pl-4 flex flex-col gap-1 py-1">
        {subjectPapers.map((paper) => (
          <button
            key={paper._id}
            onClick={() => handleFileSelect(paper)}
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md transition-colors group text-left border border-transparent",
              activeTab?.file?.url === paper.fileUrl
                ? "bg-white/[0.08] text-white border-white/[0.05]"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <FileText className="w-3.5 h-3.5 mr-2.5 text-indigo-400 shrink-0" />
            <span className="truncate">{paper.title}</span>
            <span className="ml-auto text-[10px] text-neutral-500 border border-white/[0.1] px-1.5 py-0.5 rounded">{paper.paperType}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderExplorerContent = () => {
    if (selectedYear === "1") {
      return (
        <Accordion type="multiple" className="w-full px-2">
          {year1Subjects.map((subject, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/[0.05]">
              <AccordionTrigger className="px-3 py-3 hover:bg-white/[0.02] text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:no-underline rounded-lg transition-colors [&[data-state=open]]:text-white [&[data-state=open]]:bg-white/[0.03]">
                <div className="flex items-center text-left gap-2">
                  <SubjectIcon name={subject} />
                  <span className="line-clamp-1">{subject}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-2">
                {renderPapersList(subject)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }
    return (
      <Accordion type="multiple" className="w-full px-2">
        {branches.map((branch, branchIndex) => (
          <AccordionItem key={branchIndex} value={`branch-${branchIndex}`} className="border-b border-white/[0.05]">
            <AccordionTrigger className="px-3 py-3 hover:bg-white/[0.02] text-sm font-medium text-neutral-300 hover:text-white hover:no-underline rounded-lg transition-colors">
              <div className="flex items-center text-left gap-2">
                <Folder className="w-4 h-4 text-indigo-400/80 fill-indigo-400/10" />
                <span>{branch}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-1">
              <div className="pl-3 border-l ml-5 border-white/[0.08]">
                {selectedYear === "2" ? (
                  <Accordion type="multiple" className="w-full">
                    {year2Subjects[branch]?.map((subject, subIndex) => (
                      <AccordionItem key={subIndex} value={`sub-${branchIndex}-${subIndex}`} className="border-b-0">
                        <AccordionTrigger className="px-3 py-2 hover:bg-white/[0.02] text-sm font-normal text-neutral-500 hover:text-neutral-300 hover:no-underline rounded-lg data-[state=open]:text-white">
                          <div className="flex items-center text-left gap-2">
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
                  <div className="px-4 py-3 text-xs text-neutral-600 italic">Coming soon...</div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) != null;
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-white/20 flex flex-col overflow-hidden relative">
      <Navbar />

      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="flex-1 flex pt-28 md:pt-32 h-screen overflow-hidden relative z-10 p-4 md:p-6 gap-6">

        {/* Mobile View Placeholder */}
        <div className="md:hidden flex flex-col w-full h-full items-center justify-center p-6 text-center border border-white/[0.08] rounded-2xl bg-white/[0.02]">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
            <Monitor className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="font-semibold text-lg mb-2 text-white">Desktop View Recommended</h2>
          <p className="text-neutral-500 text-sm leading-relaxed">Please view on a larger screen to use the split-screen PDF viewer effectively.</p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex w-full flex-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm shadow-2xl">
          <ResizablePanelGroup direction="horizontal" className="h-full">

            {/* COLUMN 1: Sidebar (Explorer) */}
            <ResizablePanel defaultSize={22} minSize={18} maxSize={30} className="bg-neutral-950/50 flex flex-col h-full border-r border-white/[0.08]">

              {/* Year Selector */}
              <div className="p-3 border-b border-white/[0.08] bg-neutral-950/80 backdrop-blur-md">
                <div className="grid grid-cols-4 gap-1 p-1 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                  {years.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => setSelectedYear(year.id)}
                      className={cn(
                        "py-1.5 px-2 text-[10px] font-semibold rounded-md transition-all uppercase tracking-wider",
                        selectedYear === year.id
                          ? "bg-white text-black shadow-sm"
                          : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.05]"
                      )}
                    >
                      {year.short}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explorer Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.05]">
                <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                  Subject Explorer
                </span>
                {loading && <Loader2 className="w-3 h-3 animate-spin text-neutral-500" />}
              </div>

              <ScrollArea className="flex-1">
                <div className="py-2">{renderExplorerContent()}</div>
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-transparent border-r border-white/[0.08] w-[1px]" />

            {/* COLUMN 2: PDF Viewer */}
            <ResizablePanel defaultSize={78} className="bg-[#0c0c0c] flex flex-col h-full relative">

              {/* Tab Bar */}
              <div className="h-10 bg-neutral-950 border-b border-white/[0.08] flex items-end px-2 shrink-0 gap-1">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={cn(
                      "group relative flex items-center gap-2 px-3 py-2 min-w-[140px] max-w-[200px] h-9 text-xs font-medium rounded-t-lg cursor-pointer border-t border-x transition-all user-select-none",
                      activeTabId === tab.id
                        ? "bg-[#0c0c0c] border-white/[0.08] text-white border-b-transparent z-10 mt-[1px]"
                        : "bg-neutral-900 border-transparent text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 mt-2"
                    )}
                  >
                    <FileText className={cn("w-3 h-3 shrink-0", activeTabId === tab.id ? "text-indigo-400" : "opacity-50")} />
                    <span className="truncate flex-1">{tab.file ? tab.file.title : "Welcome"}</span>
                    <div
                      onClick={(e) => handleCloseTab(e, tab.id)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/[0.1] rounded transition-all text-neutral-400"
                    >
                      <X className="w-3 h-3" />
                    </div>
                  </div>
                ))}

                <button onClick={handleAddTab} className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-white/[0.05] text-neutral-500 hover:text-white transition-colors ml-1 mb-1">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Viewer Content */}
              <div className="flex-1 relative w-full h-full overflow-hidden flex flex-col items-center justify-center bg-[#0c0c0c] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]">
                {activeTab && activeTab.file ? (
                  isImage(activeTab.file.url) ? (
                    <img src={activeTab.file.url} alt="Paper" className="max-w-full max-h-full object-contain p-8" />
                  ) : (
                    <iframe src={`${activeTab.file.url}#toolbar=0`} className="w-full h-full border-0 block bg-white" title="PDF Preview" />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-8 max-w-md animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-900/50 border border-white/[0.05] flex items-center justify-center mb-8 shadow-2xl relative">
                      <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full"></div>
                      <BookOpen className="w-8 h-8 text-neutral-400 relative z-10" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">Select a Document</h3>
                    <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                      Choose a year and subject from the explorer sidebar to view Previous Year Questions.
                    </p>
                    
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




// import { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "@/components/layout/Navbar";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup
// } from "@/components/ui/resizable";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger
// } from "@/components/ui/accordion";
// import {
//   // Standard UI Icons
//   FileText, Folder, Monitor, X, Loader2, BookOpen, Plus,
//   // Subject Specific Icons
//   Calculator, Atom, Bot, Zap, Terminal, FlaskConical, Palette,
//   Code2, Leaf, Cpu, Wifi, Activity, BrainCircuit, Briefcase
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// // --- Configuration ---
// const API_URL = import.meta.env.VITE_API_URL
//   ? `${import.meta.env.VITE_API_URL}/api/pyqs`
//   : "http://localhost:5000/api/pyqs";

// // --- Data Definitions ---
// const years = [
//   { id: "1", label: "Year 1", short: "FE" },
//   { id: "2", label: "Year 2", short: "SE" },
//   { id: "3", label: "Year 3", short: "TE" },
//   { id: "4", label: "Year 4", short: "BE" },
// ];

// const year1Subjects = [
//   "Linear Algebra and Calculus (LAC)", "Quantum Physics (QP)", "Mechanics for Robotics (MFR)",
//   "Integrated Electrical and Electronics Engineering (IEEE)", "C Programming for Problem Solving (CPPS)",
//   "Statistics and Integral Calculus (SIC)", "Chemical Science and Technology (CST)",
//   "Computer Graphics and Design (CGD)", "Object Oriented Programming Using C++ (OOPC)",
//   "Environment and Sustainable Engineering (ESE)"
// ];

// const branches = [
//   "Computer Engineering", "Information Technology", "Electronics and Telecommunication Engineering",
//   "Artificial Intelligence & Data Science", "Electronics & Computer Engineering"
// ];

// const year2Subjects: Record<string, string[]> = {
//   "Computer Engineering": ["Data Structures (DS)", "Computer Organisation and Architecture (COA)", "Discrete Mathematics (DM)"],
//   "Information Technology": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Development and Management (ESDM)"],
//   "Electronics and Telecommunication Engineering": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
//   "Artificial Intelligence & Data Science": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
//   "Electronics & Computer Engineering": ["Analog and Digital Electronics (ADE)", "Analog and Digital Electronics Lab (ADEL)", "Operating System (OS)", "Principles of Data Structure (PDS)"]
// };

// // --- Components ---
// const SubjectIcon = ({ name }: { name: string }) => {
//   const n = name.toLowerCase();
//   const iconBase = "w-3.5 h-3.5 mr-2 shrink-0";
//   if (n.includes("calculus") || n.includes("algebra") || n.includes("statistics") || n.includes("math")) return <Calculator className={`${iconBase} text-pink-500`} />;
//   if (n.includes("physics") || n.includes("quantum")) return <Atom className={`${iconBase} text-cyan-500`} />;
//   if (n.includes("chemical") || n.includes("chemistry")) return <FlaskConical className={`${iconBase} text-teal-500`} />;
//   if (n.includes("data structure") || n.includes("dsa") || n.includes("algorithm")) return <Code2 className={`${iconBase} text-indigo-500`} />;
//   if (n.includes("programming") || n.includes("cpp") || n.includes("oop") || n.includes("java")) return <Terminal className={`${iconBase} text-violet-600`} />;
//   if (n.includes("operating system") || n.includes("os")) return <Monitor className={`${iconBase} text-slate-600`} />;
//   if (n.includes("intelligence") || n.includes("ai") || n.includes("data science")) return <BrainCircuit className={`${iconBase} text-purple-600`} />;
//   if (n.includes("circuit") || n.includes("analog") || n.includes("digital")) return <Zap className={`${iconBase} text-yellow-600`} />;
//   if (n.includes("processor") || n.includes("architecture") || n.includes("coa") || n.includes("hardware")) return <Cpu className={`${iconBase} text-orange-500`} />;
//   if (n.includes("signals") || n.includes("systems")) return <Activity className={`${iconBase} text-amber-600`} />;
//   if (n.includes("network") || n.includes("internet") || n.includes("iot")) return <Wifi className={`${iconBase} text-blue-500`} />;
//   if (n.includes("mechanics") || n.includes("robotics")) return <Bot className={`${iconBase} text-slate-700`} />;
//   if (n.includes("graphics") || n.includes("design")) return <Palette className={`${iconBase} text-rose-400`} />;
//   if (n.includes("environment") || n.includes("sustainable")) return <Leaf className={`${iconBase} text-green-600`} />;
//   if (n.includes("management") || n.includes("entrepreneurial")) return <Briefcase className={`${iconBase} text-amber-800`} />;
//   return <BookOpen className={`${iconBase} text-neutral-500`} />;
// };

// const PYQs = () => {
//   const [selectedYear, setSelectedYear] = useState("1");
//   const [papers, setPapers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- TAB STATE MANAGEMENT ---
//   const [tabs, setTabs] = useState<{ id: number; file: any }[]>([{ id: Date.now(), file: null }]);
//   const [activeTabId, setActiveTabId] = useState(tabs[0].id);

//   // --- API CALLS ---
//   const fetchPapers = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setPapers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch papers", err);
//       toast.error("Could not load papers. Is the server running?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPapers();
//   }, []);

//   // --- TAB ACTIONS ---
//   const handleAddTab = () => {
//     const newTab = { id: Date.now(), file: null };
//     setTabs([...tabs, newTab]);
//     setActiveTabId(newTab.id);
//   };

//   const handleCloseTab = (e: React.MouseEvent, tabId: number) => {
//     e.stopPropagation();
//     if (tabs.length === 1) {
//       setTabs([{ id: Date.now(), file: null }]);
//       return;
//     }
//     const newTabs = tabs.filter(t => t.id !== tabId);
//     setTabs(newTabs);
//     if (activeTabId === tabId) {
//       setActiveTabId(newTabs[newTabs.length - 1].id);
//     }
//   };

//   const handleFileSelect = (paper: any) => {
//     const fileData = { title: paper.title, subject: paper.subject, url: paper.fileUrl };
//     setTabs(tabs.map(tab =>
//       tab.id === activeTabId ? { ...tab, file: fileData } : tab
//     ));
//   };

//   // --- RENDERING HELPERS ---
//   const getPapersForSubject = (subjectName: string) => {
//     return papers.filter(p => p.subject === subjectName && p.year === selectedYear);
//   };

//   const renderPapersList = (subjectName: string) => {
//     const subjectPapers = getPapersForSubject(subjectName);
//     const activeTab = tabs.find(t => t.id === activeTabId);

//     if (subjectPapers.length === 0) {
//       return <div className="pl-9 py-1.5 text-[10px] text-neutral-600 italic">No papers available...</div>;
//     }

//     return (
//       <div className="pl-3 flex flex-col gap-0.5 py-1">
//         {subjectPapers.map((paper) => (
//           <button
//             key={paper._id}
//             onClick={() => handleFileSelect(paper)}
//             className={cn(
//               "flex items-center px-2 py-1.5 text-xs rounded-md transition-colors group text-left border border-transparent",
//               activeTab?.file?.url === paper.fileUrl
//                 ? "bg-white/[0.08] text-white border-white/[0.05]"
//                 : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
//             )}
//           >
//             <FileText className="w-3 h-3 mr-2 text-indigo-400 shrink-0" />
//             <span className="truncate">{paper.title}</span>
//             <span className="ml-auto text-[9px] text-neutral-500 border border-white/[0.1] px-1 py-0.5 rounded uppercase">{paper.paperType}</span>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const renderExplorerContent = () => {
//     if (selectedYear === "1") {
//       return (
//         <Accordion type="multiple" className="w-full px-2">
//           {year1Subjects.map((subject, index) => (
//             <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/[0.05]">
//               <AccordionTrigger className="px-2 py-2 hover:bg-white/[0.02] text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:no-underline rounded-lg transition-colors [&[data-state=open]]:text-white [&[data-state=open]]:bg-white/[0.03]">
//                 <div className="flex items-center text-left gap-2">
//                   <SubjectIcon name={subject} />
//                   <span className="line-clamp-1">{subject}</span>
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent className="pt-0.5 pb-1">
//                 {renderPapersList(subject)}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       );
//     }
//     return (
//       <Accordion type="multiple" className="w-full px-2">
//         {branches.map((branch, branchIndex) => (
//           <AccordionItem key={branchIndex} value={`branch-${branchIndex}`} className="border-b border-white/[0.05]">
//             <AccordionTrigger className="px-2 py-2.5 hover:bg-white/[0.02] text-xs font-medium text-neutral-300 hover:text-white hover:no-underline rounded-lg transition-colors">
//               <div className="flex items-center text-left gap-2">
//                 <Folder className="w-3.5 h-3.5 text-indigo-400/80 fill-indigo-400/10" />
//                 <span>{branch}</span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent className="pb-0 pt-0.5">
//               <div className="pl-2 border-l ml-3.5 border-white/[0.08]">
//                 {selectedYear === "2" ? (
//                   <Accordion type="multiple" className="w-full">
//                     {year2Subjects[branch]?.map((subject, subIndex) => (
//                       <AccordionItem key={subIndex} value={`sub-${branchIndex}-${subIndex}`} className="border-b-0">
//                         <AccordionTrigger className="px-2 py-1.5 hover:bg-white/[0.02] text-xs font-normal text-neutral-500 hover:text-neutral-300 hover:no-underline rounded-lg data-[state=open]:text-white">
//                           <div className="flex items-center text-left gap-2">
//                             <SubjectIcon name={subject} />
//                             <span className="line-clamp-1">{subject}</span>
//                           </div>
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           {renderPapersList(subject)}
//                         </AccordionContent>
//                       </AccordionItem>
//                     ))}
//                   </Accordion>
//                 ) : (
//                   <div className="px-4 py-3 text-[10px] text-neutral-600 italic">Coming soon...</div>
//                 )}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     );
//   };

//   const isImage = (url: string) => {
//     return url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) != null;
//   };

//   const activeTab = tabs.find(t => t.id === activeTabId);

//   return (
//     <div className="h-screen w-full bg-neutral-950 text-neutral-200 font-sans selection:bg-white/20 flex flex-col overflow-hidden relative">
      
//       {/* SHRINKED NAVBAR WRAPPER:
//         - `shrink-0`: Prevents navbar from collapsing when content grows.
//         - `z-50`: Keeps it on top.
//         - Not `fixed`, so it naturally pushes the content below it.
//       */}
//       <div className="shrink-0 z-50 border-b border-white/[0.08] bg-neutral-950/80 backdrop-blur-md">
//         <Navbar isCompact={true} /> 
//       </div>

//       {/* Global Noise Overlay */}
//       <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

//       {/* Main Content Area:
//         - `flex-1`: Takes up all remaining vertical space after Navbar.
//         - `overflow-hidden`: Ensures scrollbars appear inside panels, not on body.
//         - `pt-0`: No padding needed because Navbar is part of flex layout.
//       */}
//       <div className="flex-1 flex overflow-hidden relative z-10 p-2 md:p-3 gap-2">

//         {/* Mobile View Placeholder */}
//         <div className="md:hidden flex flex-col w-full h-full items-center justify-center p-6 text-center border border-white/[0.08] rounded-xl bg-white/[0.02]">
//           <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
//             <Monitor className="w-6 h-6 text-indigo-400" />
//           </div>
//           <h2 className="font-semibold text-lg mb-2 text-white">Desktop View Recommended</h2>
//           <p className="text-neutral-500 text-sm leading-relaxed">Please view on a larger screen to use the split-screen PDF viewer effectively.</p>
//         </div>

//         {/* Desktop View - Dense Layout */}
//         <div className="hidden md:flex w-full flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm shadow-2xl">
//           <ResizablePanelGroup direction="horizontal" className="h-full">

//             {/* COLUMN 1: Sidebar (Explorer) */}
//             <ResizablePanel defaultSize={20} minSize={15} maxSize={28} className="bg-neutral-950/50 flex flex-col h-full border-r border-white/[0.08]">

//               {/* Year Selector - Compact */}
//               <div className="p-2 border-b border-white/[0.08] bg-neutral-950/80 backdrop-blur-md">
//                 <div className="grid grid-cols-4 gap-1 p-0.5 bg-white/[0.03] rounded-md border border-white/[0.05]">
//                   {years.map((year) => (
//                     <button
//                       key={year.id}
//                       onClick={() => setSelectedYear(year.id)}
//                       className={cn(
//                         "py-1 px-1 text-[10px] font-bold rounded transition-all uppercase tracking-wider",
//                         selectedYear === year.id
//                           ? "bg-white text-black shadow-sm"
//                           : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.05]"
//                       )}
//                     >
//                       {year.short}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Explorer Header */}
//               <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
//                 <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
//                   Subjects
//                 </span>
//                 {loading && <Loader2 className="w-3 h-3 animate-spin text-neutral-500" />}
//               </div>

//               <ScrollArea className="flex-1">
//                 <div className="py-1">{renderExplorerContent()}</div>
//               </ScrollArea>
//             </ResizablePanel>

//             <ResizableHandle withHandle className="bg-transparent border-r border-white/[0.08] w-[1px]" />

//             {/* COLUMN 2: PDF Viewer */}
//             <ResizablePanel defaultSize={80} className="bg-[#0c0c0c] flex flex-col h-full relative">

//               {/* Tab Bar - Compact */}
//               <div className="h-9 bg-neutral-950 border-b border-white/[0.08] flex items-end px-2 shrink-0 gap-1">
//                 {tabs.map((tab) => (
//                   <div
//                     key={tab.id}
//                     onClick={() => setActiveTabId(tab.id)}
//                     className={cn(
//                       "group relative flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[180px] h-8 text-[11px] font-medium rounded-t-md cursor-pointer border-t border-x transition-all user-select-none",
//                       activeTabId === tab.id
//                         ? "bg-[#0c0c0c] border-white/[0.08] text-white border-b-transparent z-10 mt-[1px]"
//                         : "bg-neutral-900 border-transparent text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 mt-1"
//                     )}
//                   >
//                     <FileText className={cn("w-3 h-3 shrink-0", activeTabId === tab.id ? "text-indigo-400" : "opacity-50")} />
//                     <span className="truncate flex-1">{tab.file ? tab.file.title : "Welcome"}</span>
//                     <div
//                       onClick={(e) => handleCloseTab(e, tab.id)}
//                       className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/[0.1] rounded transition-all text-neutral-400"
//                     >
//                       <X className="w-2.5 h-2.5" />
//                     </div>
//                   </div>
//                 ))}

//                 <button onClick={handleAddTab} className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-white/[0.05] text-neutral-500 hover:text-white transition-colors ml-1 mb-1">
//                   <Plus className="w-3.5 h-3.5" />
//                 </button>
//               </div>

//               {/* Viewer Content */}
//               <div className="flex-1 relative w-full h-full overflow-hidden flex flex-col items-center justify-center bg-[#0c0c0c] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]">
//                 {activeTab && activeTab.file ? (
//                   isImage(activeTab.file.url) ? (
//                     <img src={activeTab.file.url} alt="Paper" className="max-w-full max-h-full object-contain p-4" />
//                   ) : (
//                     <iframe src={`${activeTab.file.url}#toolbar=0`} className="w-full h-full border-0 block bg-white" title="PDF Preview" />
//                   )
//                 ) : (
//                   <div className="flex flex-col items-center justify-center text-center p-8 max-w-md animate-in fade-in zoom-in-95 duration-500">
//                     <div className="w-16 h-16 rounded-2xl bg-neutral-900/50 border border-white/[0.05] flex items-center justify-center mb-6 shadow-2xl relative">
//                       <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full"></div>
//                       <BookOpen className="w-6 h-6 text-neutral-400 relative z-10" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">Select a Document</h3>
//                     <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
//                       Choose a year and subject from the explorer sidebar to view Previous Year Questions in this secure viewer.
//                     </p>
//                     <div className="flex gap-3 text-[9px] text-neutral-600 font-mono uppercase tracking-widest">
//                       <span className="px-2 py-1 bg-white/[0.03] rounded border border-white/[0.05]">Secure Mode</span>
//                       <span className="px-2 py-1 bg-white/[0.03] rounded border border-white/[0.05]">Encrypted</span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//             </ResizablePanel>
//           </ResizablePanelGroup>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PYQs;