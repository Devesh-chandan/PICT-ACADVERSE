

// import { useState } from "react";
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
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { 
//   FileText, 
//   Folder, 
//   FolderOpen, 
//   ChevronRight, 
//   Code2, 
//   BookOpen, 
//   Layout, 
//   Monitor, 
//   Wifi, 
//   Cpu, 
//   Database,
//   Menu,
//   X
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // --- Data Definitions ---

// const years = [
//   { id: "1", label: "1st Year", short: "FE" },
//   { id: "2", label: "2nd Year", short: "SE" },
//   { id: "3", label: "3rd Year", short: "TE" },
//   { id: "4", label: "4th Year", short: "BE" },
// ];

// const year1Subjects = [
//   "Linear Algebra and Calculus (LAC)",
//   "Quantum Physics (QP)",
//   "Mechanics for Robotics (MFR)",
//   "Integrated Electrical and Electronics Engineering (IEEE)",
//   "C Programming for Problem Solving (CPPS)",
//   "Statistics and Integral Calculus (SIC)",
//   "Chemical Science and Technology (CST)",
//   "Computer Graphics and Design (CGD)",
//   "Object Oriented Programming Using C++ (OOPC)",
//   "Environment and Sustainable Engineering (ESE)"
// ];

// const branches = [
//   "Computer Engineering",
//   "Information Technology",
//   "Electronics and Telecommunication Engineering",
//   "Artificial Intelligence & Data Science",
//   "Electronics & Computer Engineering"
// ];

// const year2Subjects: Record<string, string[]> = {
//   "Computer Engineering": [
//     "Data Structures (DS)",
//     "Computer Organisation and Architecture (COA)",
//     "Discrete Mathematics (DM)"
//   ],
//   "Information Technology": [
//     "Data Structures & Applications (DSA)",
//     "Computer Network Technology (CNT)",
//     "Entrepreneurial Software Development and Management (ESDM)"
//   ],
//   "Electronics and Telecommunication Engineering": [
//     "Signals and Systems (S&S)",
//     "Analog Circuit Design (ACD)",
//     "Network Analysis and Synthesis (NAS)"
//   ],
//   "Artificial Intelligence & Data Science": [
//     "Discrete Mathematics (DM)",
//     "Data Structures (DS)",
//     "Artificial Intelligence (AI)"
//   ],
//   "Electronics & Computer Engineering": [
//     "Analog and Digital Electronics (ADE)",
//     "Analog and Digital Electronics Lab (ADEL)",
//     "Operating System (OS)",
//     "Principles of Data Structure (PDS)"
//   ]
// };

// // Dummy papers for generation
// const paperTypes = ["End-Sem 2024", "In-Sem 2024", "End-Sem 2023", "In-Sem 2023", "Unit Test 1"];

// // --- Components ---

// const FileIcon = ({ type }: { type?: string }) => {
//   return <FileText className="w-4 h-4 mr-2 text-blue-400" />;
// };

// const SubjectIcon = ({ name }: { name: string }) => {
//   if (name.includes("Data") || name.includes("Structure")) return <Database className="w-4 h-4 mr-2 text-yellow-500" />;
//   if (name.includes("Network") || name.includes("Internet")) return <Wifi className="w-4 h-4 mr-2 text-blue-500" />;
//   if (name.includes("Electronics") || name.includes("Circuit")) return <Cpu className="w-4 h-4 mr-2 text-green-500" />;
//   if (name.includes("Computer") || name.includes("OS")) return <Monitor className="w-4 h-4 mr-2 text-purple-500" />;
//   return <BookOpen className="w-4 h-4 mr-2 text-orange-400" />;
// };

// const PYQs = () => {
//   const [selectedYear, setSelectedYear] = useState("1");
//   const [selectedFile, setSelectedFile] = useState<{ title: string; subject: string; url: string } | null>(null);
  
//   // Helper to handle file selection
//   const handleFileClick = (subject: string, paper: string) => {
//     setSelectedFile({
//       title: paper,
//       subject: subject,
//       // Using a placeholder PDF for demonstration.
//       url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
//     });
//   };

//   // Render the list of papers for a subject
//   const renderPapersList = (subjectName: string) => (
//     <div className="pl-4 flex flex-col gap-1 py-1">
//       {paperTypes.map((paper, idx) => (
//         <button
//           key={idx}
//           onClick={() => handleFileClick(subjectName, paper)}
//           className={cn(
//             "flex items-center px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent group",
//             selectedFile?.title === paper && selectedFile?.subject === subjectName ? "bg-accent text-accent-foreground" : "text-muted-foreground"
//           )}
//         >
//           <FileIcon />
//           <span className="truncate">{paper}</span>
//         </button>
//       ))}
//     </div>
//   );

//   // Render the explorer content based on selected year
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

//     // For Years 2, 3, 4
//     return (
//       <Accordion type="multiple" className="w-full">
//         {branches.map((branch, branchIndex) => (
//           <AccordionItem key={branchIndex} value={`branch-${branchIndex}`} className="border-b-0">
//             <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-medium hover:no-underline">
//               <div className="flex items-center text-left">
//                 <Folder className="w-4 h-4 mr-2 text-indigo-400 fill-indigo-400/20" />
//                 <span>{branch}</span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent className="pb-0">
//               <div className="pl-4 border-l ml-6 border-border/50">
//                 {selectedYear === "2" ? (
//                   // Show subjects for 2nd Year
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
//                   // Show placeholder for 3rd and 4th Year
//                   <div className="px-4 py-3 text-xs text-muted-foreground italic">
//                     Subjects yet to come...
//                   </div>
//                 )}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background flex flex-col font-sans overflow-hidden">
//       <Navbar />
      
//       {/* Main Content Area */}
//       <div className="flex-1 flex pt-16 h-screen overflow-hidden">
        
//         {/* Mobile View Strategy */}
//         <div className="md:hidden flex flex-col w-full h-full">
//            {/* Mobile Year Selector */}
//            <div className="flex overflow-x-auto bg-muted/30 border-b border-border p-2 gap-2 scrollbar-hide shrink-0">
//               {years.map((year) => (
//                 <Button
//                   key={year.id}
//                   variant={selectedYear === year.id ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedYear(year.id)}
//                   className="whitespace-nowrap"
//                 >
//                   {year.label}
//                 </Button>
//               ))}
//            </div>
           
//            {/* Mobile File View or Explorer */}
//            {!selectedFile ? (
//              <ScrollArea className="flex-1">
//                <div className="p-2">
//                  <h2 className="text-sm font-semibold mb-2 px-2 text-muted-foreground uppercase tracking-wider">
//                    {years.find(y => y.id === selectedYear)?.label} Subjects
//                  </h2>
//                  {renderExplorerContent()}
//                </div>
//              </ScrollArea>
//            ) : (
//              <div className="flex-1 flex flex-col h-full">
//                <div className="flex items-center justify-between p-2 border-b bg-muted/10">
//                  <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
//                    <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back
//                  </Button>
//                  <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.title}</span>
//                  <div className="w-10"></div>
//                </div>
//                <iframe src={selectedFile.url} className="w-full flex-1 border-0" title="PDF Preview" />
//              </div>
//            )}
//         </div>

//         {/* Desktop View: VS Code Layout */}
//         <div className="hidden md:flex w-full h-full">
//           <ResizablePanelGroup direction="horizontal">
            
//             {/* COLUMN 1: Activity Bar (Fixed approx 5%) */}
//             <ResizablePanel defaultSize={5} minSize={4} maxSize={8} className="bg-muted/30 border-r border-border flex flex-col items-center py-4">
//                <div className="flex flex-col gap-4 w-full px-1 items-center">
//                   <div className="text-[10px] font-bold text-muted-foreground uppercase text-center mb-2 tracking-widest rotate-0 hidden xl:block">
//                     Years
//                   </div>
//                   {years.map((year) => (
//                     <button
//                       key={year.id}
//                       onClick={() => setSelectedYear(year.id)}
//                       className={cn(
//                         "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group relative w-12 h-14",
//                         selectedYear === year.id 
//                           ? "bg-background shadow-sm border border-border/50 text-primary" 
//                           : "hover:bg-background/50 text-muted-foreground"
//                       )}
//                       title={year.label}
//                     >
//                       {/* Active Indicator Line */}
//                       {selectedYear === year.id && (
//                         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
//                       )}
                      
//                       <Badge 
//                         variant={selectedYear === year.id ? "default" : "secondary"} 
//                         className="mb-0.5 w-6 h-6 flex items-center justify-center rounded-md p-0 text-[10px]"
//                       >
//                         {year.id}
//                       </Badge>
//                       <span className="text-[9px] font-bold">{year.short}</span>
//                     </button>
//                   ))}
//                </div>
//             </ResizablePanel>

//             <ResizableHandle withHandle />

//             {/* COLUMN 2: Explorer / Subjects (30%) */}
//             <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="bg-background/50 flex flex-col">
//               <div className="h-10 border-b border-border flex items-center px-4 shrink-0 bg-background/80 backdrop-blur">
//                 <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
//                   EXPLORER: {years.find(y => y.id === selectedYear)?.label}
//                 </span>
//               </div>
//               <ScrollArea className="flex-1">
//                 <div className="py-2">
//                   {renderExplorerContent()}
//                 </div>
//               </ScrollArea>
//             </ResizablePanel>

//             <ResizableHandle withHandle />

//             {/* COLUMN 3: Editor / PDF Preview (Remaining ~65%) */}
//             <ResizablePanel defaultSize={65} className="bg-muted/10 flex flex-col">
//               {selectedFile ? (
//                 <>
//                   {/* Tab Header */}
//                   <div className="h-10 bg-background border-b border-border flex items-center px-0 shrink-0 overflow-x-auto scrollbar-hide">
//                     <div className="h-full px-4 border-r border-border bg-background flex items-center gap-2 min-w-[200px] border-t-2 border-t-accent text-sm select-none">
//                       <FileText className="w-3.5 h-3.5 text-accent" />
//                       <span className="truncate max-w-[300px]">{selectedFile.subject} - {selectedFile.title}</span>
//                       <button 
//                         onClick={() => setSelectedFile(null)}
//                         className="ml-auto hover:bg-muted rounded-sm p-0.5"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* PDF Viewer */}
//                   <div className="flex-1 relative w-full h-full bg-white dark:bg-zinc-900">
//                     <iframe 
//                       src={selectedFile.url} 
//                       className="w-full h-full border-0 block" 
//                       title="PDF Preview"
//                     />
//                   </div>
//                 </>
//               ) : (
//                 // Empty State
//                 <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6">
//                   <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6 animate-pulse-slow">
//                     <Code2 className="w-12 h-12 opacity-50" />
//                   </div>
//                   <h3 className="text-xl font-bold mb-2 text-foreground">Select a Question Paper</h3>
//                   <p className="max-w-md text-center text-sm mb-8">
//                     Navigate through the years and subjects on the left to view previous year question papers.
//                   </p>
//                   <div className="flex gap-4 text-xs opacity-60">
//                     <div className="flex items-center gap-1">
//                       <Layout className="w-4 h-4" />
//                       <span>Select Year</span>
//                     </div>
//                     <ChevronRight className="w-3 h-3" />
//                     <div className="flex items-center gap-1">
//                       <FolderOpen className="w-4 h-4" />
//                       <span>Choose Subject</span>
//                     </div>
//                     <ChevronRight className="w-3 h-3" />
//                     <div className="flex items-center gap-1">
//                       <FileText className="w-4 h-4" />
//                       <span>View PDF</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, Folder, FolderOpen, ChevronRight, Code2, 
  BookOpen, Layout, Monitor, Wifi, Cpu, Database, X, 
  Upload, CloudUpload, Loader2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // Assuming you have sonner installed

// --- Data Definitions (Structure Only) ---
const API_URL = "http://localhost:5000/api/pyqs";

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

const year2Subjects: Record<string, string[]> = {
  "Computer Engineering": ["Data Structures (DS)", "Computer Organisation and Architecture (COA)", "Discrete Mathematics (DM)"],
  "Information Technology": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Development and Management (ESDM)"],
  "Electronics and Telecommunication Engineering": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
  "Artificial Intelligence & Data Science": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
  "Electronics & Computer Engineering": ["Analog and Digital Electronics (ADE)", "Analog and Digital Electronics Lab (ADEL)", "Operating System (OS)", "Principles of Data Structure (PDS)"]
};

// --- Components ---

const SubjectIcon = ({ name }: { name: string }) => {
  if (name.includes("Data") || name.includes("Structure")) return <Database className="w-4 h-4 mr-2 text-yellow-500" />;
  if (name.includes("Network") || name.includes("Internet")) return <Wifi className="w-4 h-4 mr-2 text-blue-500" />;
  if (name.includes("Electronics") || name.includes("Circuit")) return <Cpu className="w-4 h-4 mr-2 text-green-500" />;
  if (name.includes("Computer") || name.includes("OS")) return <Monitor className="w-4 h-4 mr-2 text-purple-500" />;
  return <BookOpen className="w-4 h-4 mr-2 text-orange-400" />;
};

// Interface for DB Data
interface Paper {
  _id: string;
  subject: string;
  year: string;
  paperType: string;
  title: string;
  fileUrl: string;
}

const PYQs = () => {
  const [selectedYear, setSelectedYear] = useState("1");
  const [selectedFile, setSelectedFile] = useState<{ title: string; subject: string; url: string } | null>(null);
  
  // Data State
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    year: "1",
    paperType: "End-Sem",
    title: "",
    file: null as File | null
  });

  // Fetch Papers on Load
  const fetchPapers = async () => {
    try {
      const res = await axios.get(API_URL);
      setPapers(res.data);
    } catch (err) {
      console.error("Failed to fetch papers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // Handle Upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file || !formData.subject) {
      toast.error("Please fill all fields and select a file");
      return;
    }

    try {
      setUploading(true);
      const data = new FormData();
      data.append("subject", formData.subject);
      data.append("year", formData.year);
      data.append("paperType", formData.paperType);
      data.append("title", formData.title || formData.file.name);
      data.append("file", formData.file);

      await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Upload Successful!");
      setIsUploadOpen(false);
      fetchPapers(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Helper to filter papers for a specific subject
  const getPapersForSubject = (subjectName: string) => {
    return papers.filter(p => p.subject === subjectName && p.year === selectedYear);
  };

  // Render the list of papers dynamically
  const renderPapersList = (subjectName: string) => {
    const subjectPapers = getPapersForSubject(subjectName);

    if (subjectPapers.length === 0) {
      return <div className="pl-9 py-1 text-xs text-muted-foreground italic">No papers yet...</div>;
    }

    return (
      <div className="pl-4 flex flex-col gap-1 py-1">
        {subjectPapers.map((paper) => (
          <button
            key={paper._id}
            onClick={() => setSelectedFile({ title: paper.title, subject: paper.subject, url: paper.fileUrl })}
            className={cn(
              "flex items-center px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent group text-left",
              selectedFile?.url === paper.fileUrl ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <FileText className="w-4 h-4 mr-2 text-blue-400 shrink-0" />
            <span className="truncate">{paper.title}</span>
            <span className="ml-auto text-[10px] opacity-50 border px-1 rounded">{paper.paperType}</span>
          </button>
        ))}
      </div>
    );
  };

  // Render Explorer (Same structure, but calls dynamic renderPapersList)
  const renderExplorerContent = () => {
    if (selectedYear === "1") {
      return (
        <Accordion type="multiple" className="w-full">
          {year1Subjects.map((subject, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
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
    // Years 2, 3, 4
    return (
      <Accordion type="multiple" className="w-full">
        {branches.map((branch, branchIndex) => (
          <AccordionItem key={branchIndex} value={`branch-${branchIndex}`} className="border-b-0">
            <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-sm font-medium hover:no-underline">
              <div className="flex items-center text-left">
                <Folder className="w-4 h-4 mr-2 text-indigo-400 fill-indigo-400/20" />
                <span>{branch}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="pl-4 border-l ml-6 border-border/50">
                {selectedYear === "2" ? (
                  <Accordion type="multiple" className="w-full">
                    {year2Subjects[branch]?.map((subject, subIndex) => (
                      <AccordionItem key={subIndex} value={`sub-${branchIndex}-${subIndex}`} className="border-b-0">
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

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-hidden">
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex pt-16 h-screen overflow-hidden">
        
        {/* ... (Mobile View Code remains largely same, just updated to use new render functions if needed) ... */}

        {/* Desktop View */}
        <div className="hidden md:flex w-full h-full">
          <ResizablePanelGroup direction="horizontal">
            
            {/* COLUMN 1: Activity Bar */}
            <ResizablePanel defaultSize={5} minSize={4} maxSize={8} className="bg-muted/30 border-r border-border flex flex-col items-center py-4">
               {/* Upload Button at Top */}
               <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                 <DialogTrigger asChild>
                   <Button variant="ghost" size="icon" className="mb-4 text-muted-foreground hover:text-primary" title="Upload Paper">
                     <CloudUpload className="w-5 h-5" />
                   </Button>
                 </DialogTrigger>
                 <DialogContent>
                   <DialogHeader>
                     <DialogTitle>Upload Question Paper</DialogTitle>
                   </DialogHeader>
                   <form onSubmit={handleUpload} className="space-y-4 pt-4">
                     <div className="space-y-2">
                       <Label>Subject Name (Exact Match)</Label>
                       <select 
                          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                          required
                        >
                          <option value="">Select Subject</option>
                          {selectedYear === "1" 
                            ? year1Subjects.map(s => <option key={s} value={s}>{s}</option>)
                            : Object.values(year2Subjects).flat().map(s => <option key={s} value={s}>{s}</option>)
                          }
                       </select>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Year</Label>
                          <select className="w-full h-10 rounded-md border px-3 bg-background text-sm" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                             {years.map(y => <option key={y.id} value={y.id}>{y.label}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <select className="w-full h-10 rounded-md border px-3 bg-background text-sm" value={formData.paperType} onChange={e => setFormData({...formData, paperType: e.target.value})}>
                             {["End-Sem", "In-Sem", "Unit Test", "Practical"].map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                     </div>
                     <div className="space-y-2">
                       <Label>Paper Title</Label>
                       <Input placeholder="e.g. End Sem 2024" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                     </div>
                     <div className="space-y-2">
                       <Label>File (PDF)</Label>
                       <Input type="file" accept=".pdf" onChange={e => setFormData({...formData, file: e.target.files?.[0] || null})} required />
                     </div>
                     <Button type="submit" className="w-full" disabled={uploading}>
                       {uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Uploading...</> : "Upload"}
                     </Button>
                   </form>
                 </DialogContent>
               </Dialog>

               <div className="w-8 h-[1px] bg-border mb-4"></div>

               {/* Year Selectors */}
               {years.map((year) => (
                 <button
                   key={year.id}
                   onClick={() => setSelectedYear(year.id)}
                   className={cn(
                     "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group relative w-12 h-14",
                     selectedYear === year.id ? "bg-background shadow-sm border border-border/50 text-primary" : "hover:bg-background/50 text-muted-foreground"
                   )}
                 >
                   {selectedYear === year.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />}
                   <Badge variant={selectedYear === year.id ? "default" : "secondary"} className="mb-0.5 w-6 h-6 flex items-center justify-center rounded-md p-0 text-[10px]">
                     {year.id}
                   </Badge>
                   <span className="text-[9px] font-bold">{year.short}</span>
                 </button>
               ))}
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* COLUMN 2: Explorer */}
            <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="bg-background/50 flex flex-col">
              <div className="h-10 border-b border-border flex items-center px-4 shrink-0 bg-background/80 backdrop-blur justify-between">
                <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                  EXPLORER: {years.find(y => y.id === selectedYear)?.label}
                </span>
                {loading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
              </div>
              <ScrollArea className="flex-1">
                <div className="py-2">
                  {renderExplorerContent()}
                </div>
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* COLUMN 3: PDF Viewer */}
            <ResizablePanel defaultSize={65} className="bg-muted/10 flex flex-col">
              {selectedFile ? (
                <>
                  <div className="h-10 bg-background border-b border-border flex items-center px-0 shrink-0">
                    <div className="h-full px-4 border-r border-border bg-background flex items-center gap-2 min-w-[200px] border-t-2 border-t-accent text-sm">
                      <FileText className="w-3.5 h-3.5 text-accent" />
                      <span className="truncate max-w-[300px]">{selectedFile.subject} - {selectedFile.title}</span>
                      <button onClick={() => setSelectedFile(null)} className="ml-auto hover:bg-muted rounded-sm p-0.5"><X className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <div className="flex-1 relative w-full h-full bg-white dark:bg-zinc-900">
                    <iframe src={selectedFile.url} className="w-full h-full border-0 block" title="PDF Preview" />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6">
                   {/* Empty State UI (Same as before) */}
                   <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                    <Code2 className="w-12 h-12 opacity-50" />
                   </div>
                   <h3 className="text-xl font-bold mb-2 text-foreground">Select a Question Paper</h3>
                   <p className="text-sm">Navigate to view papers</p>
                </div>
              )}
            </ResizablePanel>

          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default PYQs;