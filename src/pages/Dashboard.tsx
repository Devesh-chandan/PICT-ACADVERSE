// import { useState } from "react";
// import Navbar from "@/components/layout/Navbar";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import MagicBento, { BentoCardProps } from "@/components/ui/MagicBento"; 

// import { 
//   BrainCircuit,
//   Instagram,
//   Mail,
//   Phone,
//   Target,
//   FileText,
//   ChevronRight,
//   Filter,
//   Library
// } from "lucide-react";

// // --- DATA SECTION --- 
// // (Keep your existing subject data exactly as it was)

// const firstYearSubjects = [
//   { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
//   { name: "Quantum Physics (QP)", total: 40, present: 32 },
//   { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
//   { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
//   { name: "C Programming (CPPS)", total: 60, present: 55 },
//   { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
//   { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
//   { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
//   { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
//   { name: "Environment Engineering (ESE)", total: 20, present: 18 },
// ];

// const branchSubjectsData = {
//   "Computer Engineering": {
//     "2nd Year": [
//         { name: "Data Structures (DS)", total: 80, present: 75 },
//         { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
//         { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
//     ],
//     "3rd Year": [
//         { name: "Database Management (DBMS)", total: 70, present: 60 },
//         { name: "Theory of Computation (TOC)", total: 65, present: 55 },
//         { name: "Systems Programming (SPOS)", total: 60, present: 40 }
//     ],
//     "4th Year": [
//         { name: "Machine Learning (ML)", total: 55, present: 20 },
//         { name: "Information Security (IS)", total: 50, present: 30 },
//         { name: "Compilers (CD)", total: 45, present: 15 }
//     ]
//   },
//   "Information Technology": {
//      "2nd Year": [
//         { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
//         { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
//         { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
//      ],
//      "3rd Year": [
//         { name: "Web Technology (WT)", total: 60, present: 55 },
//         { name: "Software Engineering (SE)", total: 55, present: 45 },
//         { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
//      ],
//      "4th Year": [
//         { name: "Distributed Systems (DS)", total: 45, present: 10 },
//         { name: "Mobile Computing (MC)", total: 40, present: 5 },
//         { name: "Software Testing (STQA)", total: 35, present: 15 }
//      ]
//   },
//   "Electronics & Telecom (EnTC)": {
//     "2nd Year": [
//         { name: "Signals and Systems (S&S)", total: 70, present: 35 },
//         { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
//         { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
//     ],
//     "3rd Year": [
//         { name: "Digital Communication (DC)", total: 60, present: 40 },
//         { name: "Microcontrollers (MC)", total: 55, present: 30 },
//         { name: "Electromagnetics (EM)", total: 50, present: 20 }
//     ],
//     "4th Year": [
//         { name: "VLSI Design", total: 45, present: 15 },
//         { name: "Mobile Communication", total: 40, present: 10 },
//         { name: "Broadband Comm", total: 35, present: 5 }
//     ]
//   },
//   "AI & Data Science": {
//     "2nd Year": [
//         { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
//         { name: "Data Structures (DS)", total: 80, present: 65 },
//         { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
//     ],
//     "3rd Year": [
//         { name: "Data Science (DS)", total: 60, present: 30 },
//         { name: "Neural Networks (NN)", total: 55, present: 20 },
//         { name: "Software Engg (SE)", total: 50, present: 25 }
//     ],
//     "4th Year": [
//         { name: "Deep Learning (DL)", total: 45, present: 5 },
//         { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
//         { name: "Big Data (BD)", total: 35, present: 12 }
//     ]
//   },
//   "Electronics & Computer (E&CE)": {
//     "2nd Year": [
//         { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
//         { name: "Operating System (OS)", total: 70, present: 68 },
//         { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
//     ],
//     "3rd Year": [
//         { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
//         { name: "Microprocessors (MP)", total: 50, present: 35 },
//         { name: "Data Comm (DC)", total: 45, present: 25 }
//     ],
//     "4th Year": [
//         { name: "Embedded Systems (ES)", total: 40, present: 15 },
//         { name: "System on Chip (SoC)", total: 35, present: 10 },
//         { name: "Cloud Computing (CC)", total: 30, present: 5 }
//     ]
//   }
// };


// // 3. Bento Items Configuration (Updated with PYQ Access)
// // Using transparent colors to allow the glass effect to work
// const bentoItems: BentoCardProps[] = [
//   // Row 1, Col 1-2 (2 Columns Wide)
//   {
//     title: "AI Question Prediction",
//     description: "Generate smart predictions based on PYQ trends.",
//     label: "New Feature",
//     color: "transparent",
//     icon: BrainCircuit,
//     className: "col-span-2 group hover:ring-1 hover:ring-indigo-500/50" 
//   },
//   // Row 1, Col 3-4 (2 Columns Wide)
//   {
//     title: "Access PYQs",
//     description: "Browse and download previous year question papers.",
//     label: "Quick Link",
//     color: "transparent",
//     icon: Library,
//     className: "col-span-2 group hover:ring-1 hover:ring-purple-500/50" 
//   },
//   // Row 2, Col 1 (1 Column Wide)
//   {
//     title: "@pict_acadverse",
//     description: "Follow us",
//     label: "Instagram",
//     color: "transparent",
//     icon: Instagram,
//     className: "group hover:ring-1 hover:ring-pink-500/50"
//   },
//   // Row 2, Col 2 (1 Column Wide)
//   {
//     title: "support@pict.edu",
//     description: "Get help 24/7",
//     label: "Email",
//     color: "transparent",
//     icon: Mail,
//     className: "group hover:ring-1 hover:ring-teal-500/50"
//   },
//   // Row 2, Col 3-4 (2 Columns Wide)
//   {
//     title: "+91 98765 43210",
//     description: "Student Helpline",
//     label: "Mobile",
//     color: "transparent",
//     icon: Phone,
//     className: "col-span-2 group hover:ring-1 hover:ring-blue-500/50"
//   }
// ];

// // Helper Component for Progress Bars
// const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
//   const percentage = Math.round((present / total) * 100);
//   // Indicator color logic: Green (>80), Indigo (>40), Amber (<40)
//   const indicatorColor = percentage > 80 ? 'bg-emerald-400' : percentage > 40 ? 'bg-indigo-400' : 'bg-amber-400';

//   return (
//     <div className="group">
//       <div className="flex items-center justify-between text-sm mb-2">
//         <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{name}</span>
//         <span className="text-slate-400 text-xs">
//           {present}/{total} ({percentage}%)
//         </span>
//       </div>
//       <Progress value={percentage} className="h-1.5 bg-slate-800/50" indicatorClassName={indicatorColor} />
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [selectedYear, setSelectedYear] = useState("2nd Year");

//   // Reusable Glass Card Class with Purple Hover Effects
//   const glassCardClass = "bg-[#0f0c29]/40 backdrop-blur-md border border-white/5 shadow-2xl hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(140,50,255,0.15)] transition-all duration-300";

//   return (
//     <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
//       <Navbar />
//       <main className="pt-24 pb-12">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="mb-10 animate-fade-in-up">
//             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
//               Welcome back, Student! 👋
//             </h1>
//             <p className="text-slate-400">Everything you need to Ace Your Exams.</p>
//           </div>

//           {/* SECTION 1: Magic Bento Grid */}
//           <div className="mb-16 animate-fade-in-up delay-100"> 
//             <MagicBento 
//               items={bentoItems}
//               enableStars={true}
//               enableTilt={true}
//               enableBorderGlow={true}
//               spotlightRadius={400}
//               glowColor="124, 58, 237" // Vivid Purple Glow
//             />
//           </div>

//           {/* SECTION 2: Repository Heading */}
//           <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4 animate-fade-in-up delay-150">
//              <div>
//                 <h2 className="text-2xl font-semibold text-white tracking-tight">Repository Status</h2>
//                 <p className="text-sm text-slate-400 mt-1">Real-time availability of Question Papers per subject</p>
//              </div>
//              <div className="hidden md:block">
//                 <Badge variant="outline" className="bg-slate-900/50 text-slate-400 border-white/10 px-3 py-1">
//                    Database Updated: Today
//                 </Badge>
//              </div>
//           </div>

//           {/* SECTION 3: Progress Tracking Grid */}
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in-up delay-200">
            
//             {/* First Year Progress */}
//             <Card className={glassCardClass}>
//               <CardHeader className="pb-4 border-b border-white/5">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="flex items-center gap-2 text-xl text-slate-100">
//                     <Target className="w-5 h-5 text-indigo-400" />
//                     First Year Repository
//                   </CardTitle>
//                   <Badge variant="secondary" className="bg-white/5 text-indigo-300 hover:bg-white/10">Freshmen</Badge>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6 pt-6 pr-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
//                 {firstYearSubjects.map((sub) => (
//                   <SubjectProgressItem key={sub.name} {...sub} />
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Department Wise Progress (With Year Filter) */}
//             <Card className={glassCardClass}>
//               <CardHeader className="pb-4 border-b border-white/5">
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                   <div className="space-y-1">
//                     <CardTitle className="flex items-center gap-2 text-xl text-slate-100">
//                       <FileText className="w-5 h-5 text-purple-400" />
//                       Department Repository
//                     </CardTitle>
//                   </div>
                  
//                   {/* Dropdown for Year Selection */}
//                   <Select value={selectedYear} onValueChange={setSelectedYear}>
//                     <SelectTrigger className="w-[140px] bg-slate-950/50 border-white/10 text-slate-200 focus:ring-purple-500/50 backdrop-blur-sm">
//                       <div className="flex items-center gap-2">
//                         <Filter className="w-3.5 h-3.5" />
//                         <SelectValue placeholder="Select Year" />
//                       </div>
//                     </SelectTrigger>
//                     <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
//                       <SelectItem value="2nd Year">2nd Year</SelectItem>
//                       <SelectItem value="3rd Year">3rd Year</SelectItem>
//                       <SelectItem value="4th Year">4th Year</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardHeader>
              
//               <CardContent className="space-y-8 pt-6 pr-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
//                 {Object.entries(branchSubjectsData).map(([branch, yearData]) => {
//                   const subjects = (yearData as any)[selectedYear] || [];
//                   return (
//                     <div key={branch} className="space-y-4">
//                       <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
//                         <ChevronRight className="w-3 h-3 text-white/50" /> {branch}
//                       </h4>
//                       <div className="pl-4 space-y-5 border-l border-white/5">
//                         {subjects.length > 0 ? (
//                           subjects.map((sub: any) => (
//                             <SubjectProgressItem key={sub.name} {...sub} />
//                           ))
//                         ) : (
//                           <p className="text-sm text-slate-600 italic pl-2">No data available for {selectedYear}</p>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </CardContent>
//             </Card>
            
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;









// // import { useState } from "react";
// // import Navbar from "@/components/layout/Navbar";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import MagicBento, { BentoCardProps } from "@/components/ui/MagicBento"; 

// // import { 
// //   BrainCircuit,
// //   Instagram,
// //   Mail,
// //   Phone,
// //   Target,
// //   FileText,
// //   ChevronRight,
// //   Filter,
// //   Library
// // } from "lucide-react";

// // // --- DATA SECTION --- 
// // // (Keep your existing subject data exactly as it was)

// // const firstYearSubjects = [
// //   { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
// //   { name: "Quantum Physics (QP)", total: 40, present: 32 },
// //   { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
// //   { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
// //   { name: "C Programming (CPPS)", total: 60, present: 55 },
// //   { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
// //   { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
// //   { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
// //   { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
// //   { name: "Environment Engineering (ESE)", total: 20, present: 18 },
// // ];

// // const branchSubjectsData = {
// //   "Computer Engineering": {
// //     "2nd Year": [
// //         { name: "Data Structures (DS)", total: 80, present: 75 },
// //         { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
// //         { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
// //     ],
// //     "3rd Year": [
// //         { name: "Database Management (DBMS)", total: 70, present: 60 },
// //         { name: "Theory of Computation (TOC)", total: 65, present: 55 },
// //         { name: "Systems Programming (SPOS)", total: 60, present: 40 }
// //     ],
// //     "4th Year": [
// //         { name: "Machine Learning (ML)", total: 55, present: 20 },
// //         { name: "Information Security (IS)", total: 50, present: 30 },
// //         { name: "Compilers (CD)", total: 45, present: 15 }
// //     ]
// //   },
// //   "Information Technology": {
// //      "2nd Year": [
// //         { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
// //         { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
// //         { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
// //      ],
// //      "3rd Year": [
// //         { name: "Web Technology (WT)", total: 60, present: 55 },
// //         { name: "Software Engineering (SE)", total: 55, present: 45 },
// //         { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
// //      ],
// //      "4th Year": [
// //         { name: "Distributed Systems (DS)", total: 45, present: 10 },
// //         { name: "Mobile Computing (MC)", total: 40, present: 5 },
// //         { name: "Software Testing (STQA)", total: 35, present: 15 }
// //      ]
// //   },
// //   "Electronics & Telecom (EnTC)": {
// //     "2nd Year": [
// //         { name: "Signals and Systems (S&S)", total: 70, present: 35 },
// //         { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
// //         { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
// //     ],
// //     "3rd Year": [
// //         { name: "Digital Communication (DC)", total: 60, present: 40 },
// //         { name: "Microcontrollers (MC)", total: 55, present: 30 },
// //         { name: "Electromagnetics (EM)", total: 50, present: 20 }
// //     ],
// //     "4th Year": [
// //         { name: "VLSI Design", total: 45, present: 15 },
// //         { name: "Mobile Communication", total: 40, present: 10 },
// //         { name: "Broadband Comm", total: 35, present: 5 }
// //     ]
// //   },
// //   "AI & Data Science": {
// //     "2nd Year": [
// //         { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
// //         { name: "Data Structures (DS)", total: 80, present: 65 },
// //         { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
// //     ],
// //     "3rd Year": [
// //         { name: "Data Science (DS)", total: 60, present: 30 },
// //         { name: "Neural Networks (NN)", total: 55, present: 20 },
// //         { name: "Software Engg (SE)", total: 50, present: 25 }
// //     ],
// //     "4th Year": [
// //         { name: "Deep Learning (DL)", total: 45, present: 5 },
// //         { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
// //         { name: "Big Data (BD)", total: 35, present: 12 }
// //     ]
// //   },
// //   "Electronics & Computer (E&CE)": {
// //     "2nd Year": [
// //         { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
// //         { name: "Operating System (OS)", total: 70, present: 68 },
// //         { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
// //     ],
// //     "3rd Year": [
// //         { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
// //         { name: "Microprocessors (MP)", total: 50, present: 35 },
// //         { name: "Data Comm (DC)", total: 45, present: 25 }
// //     ],
// //     "4th Year": [
// //         { name: "Embedded Systems (ES)", total: 40, present: 15 },
// //         { name: "System on Chip (SoC)", total: 35, present: 10 },
// //         { name: "Cloud Computing (CC)", total: 30, present: 5 }
// //     ]
// //   }
// // };


// // // 3. Bento Items Configuration (Updated with PYQ Access)
// // const bentoItems: BentoCardProps[] = [
// //   // Row 1, Col 1-2 (2 Columns Wide)
// //   {
// //     title: "AI Question Prediction",
// //     description: "Generate smart predictions based on PYQ trends.",
// //     label: "New Feature",
// //     color: "transparent",
// //     icon: BrainCircuit,
// //     className: "col-span-2 group" 
// //   },
// //   // Row 1, Col 3-4 (2 Columns Wide)
// //   {
// //     title: "Access PYQs",
// //     description: "Browse and download previous year question papers.",
// //     label: "Quick Link",
// //     color: "transparent",
// //     icon: Library,
// //     className: "col-span-2 group" 
// //   },
// //   // Row 2, Col 1 (1 Column Wide)
// //   {
// //     title: "@pict_acadverse",
// //     description: "Follow us",
// //     label: "Instagram",
// //     color: "transparent",
// //     icon: Instagram,
// //     className: "group"
// //   },
// //   // Row 2, Col 2 (1 Column Wide)
// //   {
// //     title: "support@pict.edu",
// //     description: "Get help 24/7",
// //     label: "Email",
// //     color: "transparent",
// //     icon: Mail,
// //     className: "group"
// //   },
// //   // Row 2, Col 3-4 (2 Columns Wide)
// //   {
// //     title: "+91 98765 43210",
// //     description: "Student Helpline",
// //     label: "Mobile",
// //     color: "transparent",
// //     icon: Phone,
// //     className: "col-span-2 group"
// //   }
// // ];

// // // Helper Component for Progress Bars
// // const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
// //   const percentage = Math.round((present / total) * 100);
// //   const indicatorColor = percentage > 80 ? 'bg-emerald-400' : percentage > 40 ? 'bg-indigo-400' : 'bg-amber-400';

// //   return (
// //     <div className="group">
// //       <div className="flex items-center justify-between text-sm mb-2">
// //         <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{name}</span>
// //         <span className="text-slate-400 text-xs">
// //           {present}/{total} ({percentage}%)
// //         </span>
// //       </div>
// //       <Progress value={percentage} className="h-1.5 bg-slate-800/50" indicatorClassName={indicatorColor} />
// //     </div>
// //   );
// // };

// // const Dashboard = () => {
// //   const [selectedYear, setSelectedYear] = useState("2nd Year");

// //   // Reusable Glass Class for Cards
// //   const glassCardClass = "bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300";

// //   return (
// //     <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
// //       <Navbar />
// //       <main className="pt-24 pb-12">
// //         <div className="container mx-auto px-4 max-w-7xl">
// //           {/* Header */}
// //           <div className="mb-10 animate-fade-in-up">
// //             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
// //               Welcome back, Student! 👋
// //             </h1>
// //             <p className="text-slate-400">Everything you need to Ace Your Exams.</p>
// //           </div>

// //           {/* SECTION 1: Magic Bento Grid */}
// //           <div className="mb-16 animate-fade-in-up delay-100"> 
// //             <MagicBento 
// //               items={bentoItems}
// //               enableStars={true}
// //               enableTilt={true}
// //               enableBorderGlow={true}
// //               spotlightRadius={400}
// //               glowColor="100, 116, 139" // Subtle Slate/White Glow
// //             />
// //           </div>

// //           {/* SECTION 2: Repository Heading */}
// //           <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4 animate-fade-in-up delay-150">
// //              <div>
// //                 <h2 className="text-2xl font-semibold text-white tracking-tight">Repository Status</h2>
// //                 <p className="text-sm text-slate-400 mt-1">Real-time availability of Question Papers per subject</p>
// //              </div>
// //              <div className="hidden md:block">
// //                 <Badge variant="outline" className="bg-slate-900/50 text-slate-400 border-white/10 px-3 py-1">
// //                    Database Updated: Today
// //                 </Badge>
// //              </div>
// //           </div>

// //           {/* SECTION 3: Progress Tracking Grid */}
// //           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in-up delay-200">
            
// //             {/* First Year Progress */}
// //             <Card className={glassCardClass}>
// //               <CardHeader className="pb-4 border-b border-white/5">
// //                 <div className="flex items-center justify-between">
// //                   <CardTitle className="flex items-center gap-2 text-xl text-slate-100">
// //                     <Target className="w-5 h-5 text-indigo-400" />
// //                     First Year Repository
// //                   </CardTitle>
// //                   <Badge variant="secondary" className="bg-white/5 text-indigo-300 hover:bg-white/10">Freshmen</Badge>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="space-y-6 pt-6 pr-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
// //                 {firstYearSubjects.map((sub) => (
// //                   <SubjectProgressItem key={sub.name} {...sub} />
// //                 ))}
// //               </CardContent>
// //             </Card>

// //             {/* Department Wise Progress (With Year Filter) */}
// //             <Card className={glassCardClass}>
// //               <CardHeader className="pb-4 border-b border-white/5">
// //                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //                   <div className="space-y-1">
// //                     <CardTitle className="flex items-center gap-2 text-xl text-slate-100">
// //                       <FileText className="w-5 h-5 text-purple-400" />
// //                       Department Repository
// //                     </CardTitle>
// //                   </div>
                  
// //                   {/* Dropdown for Year Selection */}
// //                   <Select value={selectedYear} onValueChange={setSelectedYear}>
// //                     <SelectTrigger className="w-[140px] bg-slate-950/50 border-white/10 text-slate-200 focus:ring-purple-500/50 backdrop-blur-sm">
// //                       <div className="flex items-center gap-2">
// //                         <Filter className="w-3.5 h-3.5" />
// //                         <SelectValue placeholder="Select Year" />
// //                       </div>
// //                     </SelectTrigger>
// //                     <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
// //                       <SelectItem value="2nd Year">2nd Year</SelectItem>
// //                       <SelectItem value="3rd Year">3rd Year</SelectItem>
// //                       <SelectItem value="4th Year">4th Year</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //               </CardHeader>
              
// //               <CardContent className="space-y-8 pt-6 pr-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
// //                 {Object.entries(branchSubjectsData).map(([branch, yearData]) => {
// //                   const subjects = (yearData as any)[selectedYear] || [];
// //                   return (
// //                     <div key={branch} className="space-y-4">
// //                       <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
// //                         <ChevronRight className="w-3 h-3 text-white/50" /> {branch}
// //                       </h4>
// //                       <div className="pl-4 space-y-5 border-l border-white/5">
// //                         {subjects.length > 0 ? (
// //                           subjects.map((sub: any) => (
// //                             <SubjectProgressItem key={sub.name} {...sub} />
// //                           ))
// //                         ) : (
// //                           <p className="text-sm text-slate-600 italic pl-2">No data available for {selectedYear}</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </CardContent>
// //             </Card>
            
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Dashboard;











// // import { useState } from "react";
// // import Navbar from "@/components/layout/Navbar";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import MagicBento, { BentoCardProps } from "@/components/ui/MagicBento"; 

// // import { 
// //   BrainCircuit,
// //   Instagram,
// //   Mail,
// //   Phone,
// //   Target,
// //   FileText,
// //   ChevronRight,
// //   Filter,
// //   Library
// // } from "lucide-react";

// // // --- DATA SECTION --- 
// // // (Keep your existing subject data exactly as it was)

// // const firstYearSubjects = [
// //   { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
// //   { name: "Quantum Physics (QP)", total: 40, present: 32 },
// //   { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
// //   { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
// //   { name: "C Programming (CPPS)", total: 60, present: 55 },
// //   { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
// //   { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
// //   { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
// //   { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
// //   { name: "Environment Engineering (ESE)", total: 20, present: 18 },
// // ];

// // const branchSubjectsData = {
// //   "Computer Engineering": {
// //     "2nd Year": [
// //         { name: "Data Structures (DS)", total: 80, present: 75 },
// //         { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
// //         { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
// //     ],
// //     "3rd Year": [
// //         { name: "Database Management (DBMS)", total: 70, present: 60 },
// //         { name: "Theory of Computation (TOC)", total: 65, present: 55 },
// //         { name: "Systems Programming (SPOS)", total: 60, present: 40 }
// //     ],
// //     "4th Year": [
// //         { name: "Machine Learning (ML)", total: 55, present: 20 },
// //         { name: "Information Security (IS)", total: 50, present: 30 },
// //         { name: "Compilers (CD)", total: 45, present: 15 }
// //     ]
// //   },
// //   "Information Technology": {
// //      "2nd Year": [
// //         { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
// //         { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
// //         { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
// //       ],
// //       "3rd Year": [
// //         { name: "Web Technology (WT)", total: 60, present: 55 },
// //         { name: "Software Engineering (SE)", total: 55, present: 45 },
// //         { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
// //       ],
// //       "4th Year": [
// //         { name: "Distributed Systems (DS)", total: 45, present: 10 },
// //         { name: "Mobile Computing (MC)", total: 40, present: 5 },
// //         { name: "Software Testing (STQA)", total: 35, present: 15 }
// //       ]
// //   },
// //   "Electronics & Telecom (EnTC)": {
// //     "2nd Year": [
// //         { name: "Signals and Systems (S&S)", total: 70, present: 35 },
// //         { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
// //         { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
// //     ],
// //     "3rd Year": [
// //         { name: "Digital Communication (DC)", total: 60, present: 40 },
// //         { name: "Microcontrollers (MC)", total: 55, present: 30 },
// //         { name: "Electromagnetics (EM)", total: 50, present: 20 }
// //     ],
// //     "4th Year": [
// //         { name: "VLSI Design", total: 45, present: 15 },
// //         { name: "Mobile Communication", total: 40, present: 10 },
// //         { name: "Broadband Comm", total: 35, present: 5 }
// //     ]
// //   },
// //   "AI & Data Science": {
// //     "2nd Year": [
// //         { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
// //         { name: "Data Structures (DS)", total: 80, present: 65 },
// //         { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
// //     ],
// //     "3rd Year": [
// //         { name: "Data Science (DS)", total: 60, present: 30 },
// //         { name: "Neural Networks (NN)", total: 55, present: 20 },
// //         { name: "Software Engg (SE)", total: 50, present: 25 }
// //     ],
// //     "4th Year": [
// //         { name: "Deep Learning (DL)", total: 45, present: 5 },
// //         { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
// //         { name: "Big Data (BD)", total: 35, present: 12 }
// //     ]
// //   },
// //   "Electronics & Computer (E&CE)": {
// //     "2nd Year": [
// //         { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
// //         { name: "Operating System (OS)", total: 70, present: 68 },
// //         { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
// //     ],
// //     "3rd Year": [
// //         { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
// //         { name: "Microprocessors (MP)", total: 50, present: 35 },
// //         { name: "Data Comm (DC)", total: 45, present: 25 }
// //     ],
// //     "4th Year": [
// //         { name: "Embedded Systems (ES)", total: 40, present: 15 },
// //         { name: "System on Chip (SoC)", total: 35, present: 10 },
// //         { name: "Cloud Computing (CC)", total: 30, present: 5 }
// //     ]
// //   }
// // };


// // // 3. Bento Items Configuration (Updated with PYQ Access)
// // const bentoItems: BentoCardProps[] = [
// //   // Row 1, Col 1-2
// //   {
// //     title: "AI Question Prediction",
// //     description: "Generate smart predictions based on PYQ trends.",
// //     label: "New Feature",
// //     color: "transparent",
// //     icon: BrainCircuit,
// //     className: "col-span-2 group hover:bg-white/5 transition-all duration-500" 
// //   },
// //   // Row 1, Col 3-4 (UPDATED CARD)
// //   {
// //     title: "Access PYQs",
// //     description: "Browse and download previous year question papers.",
// //     label: "Quick Link",
// //     color: "transparent",
// //     icon: Library,
// //     className: "col-span-2 group hover:bg-white/5 transition-all duration-500" 
// //   },
// //   // Row 2, Col 1
// //   {
// //     title: "@pict_acadverse",
// //     description: "Follow us",
// //     label: "Instagram",
// //     color: "transparent",
// //     icon: Instagram,
// //     className: "group hover:bg-white/5 transition-all duration-500"
// //   },
// //   // Row 2, Col 2
// //   {
// //     title: "support@pict.edu",
// //     description: "Get help 24/7",
// //     label: "Email",
// //     color: "transparent",
// //     icon: Mail,
// //     className: "group hover:bg-white/5 transition-all duration-500"
// //   },
// //   // Row 2, Col 3-4
// //   {
// //     title: "+91 98765 43210",
// //     description: "Student Helpline",
// //     label: "Mobile",
// //     color: "transparent",
// //     icon: Phone,
// //     className: "col-span-2 group hover:bg-white/5 transition-all duration-500"
// //   }
// // ];

// // // Helper Component for Progress Bars
// // const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
// //   const percentage = Math.round((present / total) * 100);
// //   const indicatorColor = percentage > 80 ? 'bg-emerald-400' : percentage > 40 ? 'bg-indigo-400' : 'bg-amber-400';

// //   return (
// //     <div className="group">
// //       <div className="flex items-center justify-between text-sm mb-2">
// //         <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{name}</span>
// //         <span className="text-slate-400 text-xs">
// //           {present}/{total} ({percentage}%)
// //         </span>
// //       </div>
// //       <Progress value={percentage} className="h-1.5 bg-slate-800/50" indicatorClassName={indicatorColor} />
// //     </div>
// //   );
// // };

// // const Dashboard = () => {
// //   const [selectedYear, setSelectedYear] = useState("2nd Year");

// //   // Reusable Glass Class for Cards
// //   const glassCardClass = "bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300";

// //   return (
// //     <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
// //       <Navbar />
// //       <main className="pt-24 pb-12">
// //         <div className="container mx-auto px-4 max-w-7xl">
// //           {/* Header */}
// //           <div className="mb-10 animate-fade-in-up">
// //             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
// //               Welcome back, Student! 👋
// //             </h1>
// //             <p className="text-slate-400">Everything you need to Ace Your Exams.</p>
// //           </div>

// //           {/* SECTION 1: Magic Bento Grid */}
// //           <div className="mb-16 animate-fade-in-up delay-100"> 
// //             <MagicBento 
// //               items={bentoItems}
// //               enableStars={true}
// //               enableTilt={true}
// //               enableBorderGlow={true}
// //               spotlightRadius={400}
// //               glowColor="100, 116, 139" // Subtle Slate/White Glow
// //             />
// //           </div>

// //           {/* SECTION 2: Repository Heading */}
// //           <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4 animate-fade-in-up delay-150">
// //              <div>
// //                 <h2 className="text-2xl font-semibold text-white tracking-tight">Repository Status</h2>
// //                 <p className="text-sm text-slate-400 mt-1">Real-time availability of Question Papers per subject</p>
// //              </div>
// //              <div className="hidden md:block">
// //                 <Badge variant="outline" className="bg-slate-900/50 text-slate-400 border-white/10 px-3 py-1">
// //                    Database Updated: Today
// //                 </Badge>
// //              </div>
// //           </div>

// //           {/* SECTION 3: Progress Tracking Grid */}
// //           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in-up delay-200">
            
// //             {/* First Year Progress */}
// //             <Card className={glassCardClass}>
// //               <CardHeader className="pb-4 border-b border-white/5">
// //                 <div className="flex items-center justify-between">
// //                   <CardTitle className="flex items-center gap-2 text-xl text-slate-100">
// //                     <Target className="w-5 h-5 text-indigo-400" />
// //                     First Year Repository
// //                   </CardTitle>
// //                   <Badge variant="secondary" className="bg-white/5 text-indigo-300 hover:bg-white/10">Freshmen</Badge>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="space-y-6 pt-6 pr-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
// //                 {firstYearSubjects.map((sub) => (
// //                   <SubjectProgressItem key={sub.name} {...sub} />
// //                 ))}
// //               </CardContent>
// //             </Card>

// //             {/* Department Wise Progress (With Year Filter) */}
// //             <Card className={glassCardClass}>
// //               <CardHeader className="pb-4 border-b border-white/5">
// //                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //                   <div className="space-y-1">
// //                     <CardTitle className="flex items-center gap-2 text-xl text-slate-100">
// //                       <FileText className="w-5 h-5 text-purple-400" />
// //                       Department Repository
// //                     </CardTitle>
// //                   </div>
                  
// //                   {/* Dropdown for Year Selection */}
// //                   <Select value={selectedYear} onValueChange={setSelectedYear}>
// //                     <SelectTrigger className="w-[140px] bg-slate-950/50 border-white/10 text-slate-200 focus:ring-purple-500/50 backdrop-blur-sm">
// //                       <div className="flex items-center gap-2">
// //                         <Filter className="w-3.5 h-3.5" />
// //                         <SelectValue placeholder="Select Year" />
// //                       </div>
// //                     </SelectTrigger>
// //                     <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
// //                       <SelectItem value="2nd Year">2nd Year</SelectItem>
// //                       <SelectItem value="3rd Year">3rd Year</SelectItem>
// //                       <SelectItem value="4th Year">4th Year</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //               </CardHeader>
              
// //               <CardContent className="space-y-8 pt-6 pr-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
// //                 {Object.entries(branchSubjectsData).map(([branch, yearData]) => {
// //                   const subjects = (yearData as any)[selectedYear] || [];
// //                   return (
// //                     <div key={branch} className="space-y-4">
// //                       <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
// //                         <ChevronRight className="w-3 h-3 text-white/50" /> {branch}
// //                       </h4>
// //                       <div className="pl-4 space-y-5 border-l border-white/5">
// //                         {subjects.length > 0 ? (
// //                           subjects.map((sub: any) => (
// //                             <SubjectProgressItem key={sub.name} {...sub} />
// //                           ))
// //                         ) : (
// //                           <p className="text-sm text-slate-600 italic pl-2">No data available for {selectedYear}</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </CardContent>
// //             </Card>
            
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Dashboard;








// // import { useState } from "react";
// // import Navbar from "@/components/layout/Navbar";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import MagicBento, { BentoCardProps } from "@/components/ui/MagicBento"; 

// // import { 
// //   BrainCircuit,
// //   Instagram,
// //   Mail,
// //   Phone,
// //   Target,
// //   FileText,
// //   ChevronRight,
// //   Filter,
// //   UploadCloud
// // } from "lucide-react";

// // // ... [Keep your existing subject data arrays here: firstYearSubjects, branchSubjectsData] ...
// // // (I am omitting the long data arrays for brevity, but keep them exactly as they were in your previous file)
// // // 1. First Year Subjects Data (Dummy Data for Progress)
// // const firstYearSubjects = [
// //   { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
// //   { name: "Quantum Physics (QP)", total: 40, present: 32 },
// //   { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
// //   { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
// //   { name: "C Programming (CPPS)", total: 60, present: 55 },
// //   { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
// //   { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
// //   { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
// //   { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
// //   { name: "Environment Engineering (ESE)", total: 20, present: 18 },
// // ];

// // const branchSubjectsData = {
// //   "Computer Engineering": {
// //     "2nd Year": [
// //         { name: "Data Structures (DS)", total: 80, present: 75 },
// //         { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
// //         { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
// //     ],
// //     "3rd Year": [
// //         { name: "Database Management (DBMS)", total: 70, present: 60 },
// //         { name: "Theory of Computation (TOC)", total: 65, present: 55 },
// //         { name: "Systems Programming (SPOS)", total: 60, present: 40 }
// //     ],
// //     "4th Year": [
// //         { name: "Machine Learning (ML)", total: 55, present: 20 },
// //         { name: "Information Security (IS)", total: 50, present: 30 },
// //         { name: "Compilers (CD)", total: 45, present: 15 }
// //     ]
// //   },
// //   "Information Technology": {
// //      "2nd Year": [
// //         { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
// //         { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
// //         { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
// //      ],
// //      "3rd Year": [
// //         { name: "Web Technology (WT)", total: 60, present: 55 },
// //         { name: "Software Engineering (SE)", total: 55, present: 45 },
// //         { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
// //      ],
// //      "4th Year": [
// //         { name: "Distributed Systems (DS)", total: 45, present: 10 },
// //         { name: "Mobile Computing (MC)", total: 40, present: 5 },
// //         { name: "Software Testing (STQA)", total: 35, present: 15 }
// //      ]
// //   },
// //   "Electronics & Telecom (EnTC)": {
// //     "2nd Year": [
// //         { name: "Signals and Systems (S&S)", total: 70, present: 35 },
// //         { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
// //         { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
// //     ],
// //     "3rd Year": [
// //         { name: "Digital Communication (DC)", total: 60, present: 40 },
// //         { name: "Microcontrollers (MC)", total: 55, present: 30 },
// //         { name: "Electromagnetics (EM)", total: 50, present: 20 }
// //     ],
// //     "4th Year": [
// //         { name: "VLSI Design", total: 45, present: 15 },
// //         { name: "Mobile Communication", total: 40, present: 10 },
// //         { name: "Broadband Comm", total: 35, present: 5 }
// //     ]
// //   },
// //   "AI & Data Science": {
// //     "2nd Year": [
// //         { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
// //         { name: "Data Structures (DS)", total: 80, present: 65 },
// //         { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
// //     ],
// //     "3rd Year": [
// //         { name: "Data Science (DS)", total: 60, present: 30 },
// //         { name: "Neural Networks (NN)", total: 55, present: 20 },
// //         { name: "Software Engg (SE)", total: 50, present: 25 }
// //     ],
// //     "4th Year": [
// //         { name: "Deep Learning (DL)", total: 45, present: 5 },
// //         { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
// //         { name: "Big Data (BD)", total: 35, present: 12 }
// //     ]
// //   },
// //   "Electronics & Computer (E&CE)": {
// //     "2nd Year": [
// //         { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
// //         { name: "Operating System (OS)", total: 70, present: 68 },
// //         { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
// //     ],
// //     "3rd Year": [
// //         { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
// //         { name: "Microprocessors (MP)", total: 50, present: 35 },
// //         { name: "Data Comm (DC)", total: 45, present: 25 }
// //     ],
// //     "4th Year": [
// //         { name: "Embedded Systems (ES)", total: 40, present: 15 },
// //         { name: "System on Chip (SoC)", total: 35, present: 10 },
// //         { name: "Cloud Computing (CC)", total: 30, present: 5 }
// //     ]
// //   }
// // };


// // // 3. Bento Items Configuration (With new Quick Action card to fill grid)
// // // We use 'transparent' color string as a fallback, but the MagicBento CSS now handles the glass effect.
// // const bentoItems: BentoCardProps[] = [
// //   // Row 1, Col 1-2
// //   {
// //     title: "AI Question Prediction",
// //     description: "Generate smart predictions based on PYQ trends.",
// //     label: "Quick Action",
// //     color: "transparent",
// //     icon: BrainCircuit,
// //     className: "col-span-2 group hover:ring-1 hover:ring-indigo-500/50" 
// //   },
// //   // Row 1, Col 3-4 (NEW CARD)
// //   {
// //     title: "Contribute Notes",
// //     description: "Upload your notes to help the community.",
// //     label: "Quick Action",
// //     color: "transparent",
// //     icon: UploadCloud,
// //     className: "col-span-2 group hover:ring-1 hover:ring-cyan-500/50" 
// //   },
// //   // Row 2, Col 1
// //   {
// //     title: "@pict_acadverse",
// //     description: "Follow us",
// //     label: "Instagram",
// //     color: "transparent",
// //     icon: Instagram,
// //     className: "group hover:ring-1 hover:ring-pink-500/50"
// //   },
// //   // Row 2, Col 2
// //   {
// //     title: "support@pict.edu",
// //     description: "Get help 24/7",
// //     label: "Email",
// //     color: "transparent",
// //     icon: Mail,
// //     className: "group hover:ring-1 hover:ring-teal-500/50"
// //   },
// //   // Row 2, Col 3-4
// //   {
// //     title: "+91 98765 43210",
// //     description: "Student Helpline",
// //     label: "Mobile",
// //     color: "transparent",
// //     icon: Phone,
// //     className: "col-span-2 group hover:ring-1 hover:ring-blue-500/50"
// //   }
// // ];

// // // Helper Component for Progress Bars
// // const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
// //   const percentage = Math.round((present / total) * 100);
// //   const indicatorColor = percentage > 80 ? 'bg-emerald-500' : percentage > 40 ? 'bg-indigo-500' : 'bg-amber-500';

// //   return (
// //     <div className="group">
// //       <div className="flex items-center justify-between text-sm mb-1.5">
// //         <span className="font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">{name}</span>
// //         <span className="text-muted-foreground text-xs">
// //           {present}/{total} Papers ({percentage}%)
// //         </span>
// //       </div>
// //       <Progress value={percentage} className="h-2 bg-slate-800" indicatorClassName={indicatorColor} />
// //     </div>
// //   );
// // };

// // const Dashboard = () => {
// //   const [selectedYear, setSelectedYear] = useState("2nd Year");

// //   return (
// //     <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-indigo-500/30">
// //       <Navbar />
// //       <main className="pt-24 pb-12">
// //         <div className="container mx-auto px-4 max-w-7xl">
// //           {/* Header */}
// //           <div className="mb-10 animate-fade-in-up">
// //             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
// //               Welcome back, Student! 👋
// //             </h1>
// //             <p className="text-slate-400">Everything you need to Ace Your Exams.</p>
// //           </div>

// //           {/* SECTION 1: Magic Bento Grid */}
// //           <div className="mb-12 animate-fade-in-up delay-100"> 
// //             <MagicBento 
// //               items={bentoItems}
// //               enableStars={true}
// //               enableTilt={true}
// //               enableBorderGlow={true}
// //               spotlightRadius={400}
// //               glowColor="124, 58, 237" // Violet Glow
// //             />
// //           </div>

// //           {/* SECTION 2: Comprehensive Progress Tracking */}
// //           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in-up delay-200">
            
// //             {/* First Year Progress */}
// //             <Card className="bg-[#0b1221] border-slate-800 shadow-2xl hover:border-indigo-500/30 transition-colors duration-300">
// //               <CardHeader>
// //                 <div className="flex items-center justify-between">
// //                   <CardTitle className="flex items-center gap-2 text-xl text-white">
// //                     <Target className="w-6 h-6 text-indigo-500" />
// //                     First Year Repository
// //                   </CardTitle>
// //                   <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10">Freshmen</Badge>
// //                 </div>
// //                 <CardDescription className="text-slate-400">
// //                   Total available previous year questions per subject.
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent className="space-y-6 pr-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
// //                 {firstYearSubjects.map((sub) => (
// //                   <SubjectProgressItem key={sub.name} {...sub} />
// //                 ))}
// //               </CardContent>
// //             </Card>

// //             {/* Department Wise Progress (With Year Filter) */}
// //             <Card className="bg-[#0b1221] border-slate-800 shadow-2xl hover:border-purple-500/30 transition-colors duration-300">
// //               <CardHeader>
// //                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //                   <div className="space-y-1.5">
// //                     <CardTitle className="flex items-center gap-2 text-xl text-white">
// //                       <FileText className="w-6 h-6 text-purple-500" />
// //                       Department Repository
// //                     </CardTitle>
// //                     <CardDescription className="text-slate-400">
// //                       Track repository status for major engineering branches.
// //                     </CardDescription>
// //                   </div>
                  
// //                   {/* Dropdown for Year Selection */}
// //                   <Select value={selectedYear} onValueChange={setSelectedYear}>
// //                     <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700 text-slate-200 focus:ring-purple-500">
// //                       <div className="flex items-center gap-2">
// //                         <Filter className="w-3.5 h-3.5" />
// //                         <SelectValue placeholder="Select Year" />
// //                       </div>
// //                     </SelectTrigger>
// //                     <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
// //                       <SelectItem value="2nd Year">2nd Year</SelectItem>
// //                       <SelectItem value="3rd Year">3rd Year</SelectItem>
// //                       <SelectItem value="4th Year">4th Year</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="space-y-8 pr-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
// //                 {Object.entries(branchSubjectsData).map(([branch, yearData]) => {
// //                   const subjects = (yearData as any)[selectedYear] || [];
// //                   return (
// //                     <div key={branch} className="space-y-3">
// //                       <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
// //                         <ChevronRight className="w-3 h-3 text-purple-500" /> {branch}
// //                       </h4>
// //                       <div className="pl-4 space-y-4 border-l border-slate-800">
// //                         {subjects.length > 0 ? (
// //                           subjects.map((sub: any) => (
// //                             <SubjectProgressItem key={sub.name} {...sub} />
// //                           ))
// //                         ) : (
// //                           <p className="text-sm text-slate-600 italic pl-2">No data available for {selectedYear}</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </CardContent>
// //             </Card>
            
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Dashboard;









// // import { useState } from "react";
// // import Navbar from "@/components/layout/Navbar";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import MagicBento, { BentoCardProps } from "@/components/ui/MagicBento"; 

// // import { 
// //   BrainCircuit,
// //   Instagram,
// //   Mail,
// //   Phone,
// //   Target,
// //   FileText,
// //   ChevronRight,
// //   Filter
// // } from "lucide-react";

// // // --- Data Configuration ---

// // // 1. First Year Subjects Data (Dummy Data for Progress)
// // const firstYearSubjects = [
// //   { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
// //   { name: "Quantum Physics (QP)", total: 40, present: 32 },
// //   { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
// //   { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
// //   { name: "C Programming (CPPS)", total: 60, present: 55 },
// //   { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
// //   { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
// //   { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
// //   { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
// //   { name: "Environment Engineering (ESE)", total: 20, present: 18 },
// // ];

// // // 2. Branch Specific Subjects Data
// // const branchSubjectsData = {
// //   "Computer Engineering": {
// //     "2nd Year": [
// //         { name: "Data Structures (DS)", total: 80, present: 75 },
// //         { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
// //         { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
// //     ],
// //     "3rd Year": [
// //         { name: "Database Management (DBMS)", total: 70, present: 60 },
// //         { name: "Theory of Computation (TOC)", total: 65, present: 55 },
// //         { name: "Systems Programming (SPOS)", total: 60, present: 40 }
// //     ],
// //     "4th Year": [
// //         { name: "Machine Learning (ML)", total: 55, present: 20 },
// //         { name: "Information Security (IS)", total: 50, present: 30 },
// //         { name: "Compilers (CD)", total: 45, present: 15 }
// //     ]
// //   },
// //   "Information Technology": {
// //      "2nd Year": [
// //         { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
// //         { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
// //         { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
// //      ],
// //      "3rd Year": [
// //         { name: "Web Technology (WT)", total: 60, present: 55 },
// //         { name: "Software Engineering (SE)", total: 55, present: 45 },
// //         { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
// //      ],
// //      "4th Year": [
// //         { name: "Distributed Systems (DS)", total: 45, present: 10 },
// //         { name: "Mobile Computing (MC)", total: 40, present: 5 },
// //         { name: "Software Testing (STQA)", total: 35, present: 15 }
// //      ]
// //   },
// //   "Electronics & Telecom (EnTC)": {
// //     "2nd Year": [
// //         { name: "Signals and Systems (S&S)", total: 70, present: 35 },
// //         { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
// //         { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
// //     ],
// //     "3rd Year": [
// //         { name: "Digital Communication (DC)", total: 60, present: 40 },
// //         { name: "Microcontrollers (MC)", total: 55, present: 30 },
// //         { name: "Electromagnetics (EM)", total: 50, present: 20 }
// //     ],
// //     "4th Year": [
// //         { name: "VLSI Design", total: 45, present: 15 },
// //         { name: "Mobile Communication", total: 40, present: 10 },
// //         { name: "Broadband Comm", total: 35, present: 5 }
// //     ]
// //   },
// //   "AI & Data Science": {
// //     "2nd Year": [
// //         { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
// //         { name: "Data Structures (DS)", total: 80, present: 65 },
// //         { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
// //     ],
// //     "3rd Year": [
// //         { name: "Data Science (DS)", total: 60, present: 30 },
// //         { name: "Neural Networks (NN)", total: 55, present: 20 },
// //         { name: "Software Engg (SE)", total: 50, present: 25 }
// //     ],
// //     "4th Year": [
// //         { name: "Deep Learning (DL)", total: 45, present: 5 },
// //         { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
// //         { name: "Big Data (BD)", total: 35, present: 12 }
// //     ]
// //   },
// //   "Electronics & Computer (E&CE)": {
// //     "2nd Year": [
// //         { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
// //         { name: "Operating System (OS)", total: 70, present: 68 },
// //         { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
// //     ],
// //     "3rd Year": [
// //         { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
// //         { name: "Microprocessors (MP)", total: 50, present: 35 },
// //         { name: "Data Comm (DC)", total: 45, present: 25 }
// //     ],
// //     "4th Year": [
// //         { name: "Embedded Systems (ES)", total: 40, present: 15 },
// //         { name: "System on Chip (SoC)", total: 35, present: 10 },
// //         { name: "Cloud Computing (CC)", total: 30, present: 5 }
// //     ]
// //   }
// // };

// // // 3. Bento Items Configuration (Quick Actions & Socials)
// // // UPDATED: Removed solid hex colors, added transparency for glass effect
// // const bentoItems: BentoCardProps[] = [
// //   // Item 1: Quick Action - AI Prediction
// //   {
// //     title: "AI Question Prediction",
// //     description: "Generate smart predictions based on PYQ trends.",
// //     label: "Quick Action",
// //     color: "rgba(255, 255, 255, 0.03)", // Transparent Glass
// //     icon: BrainCircuit,
// //     className: "col-span-2 group hover:ring-1 hover:ring-indigo-500/50" 
// //   },
// //   // Item 2: Social - Insta
// //   {
// //     title: "@pict_acadverse",
// //     description: "Follow for updates",
// //     label: "Instagram",
// //     color: "rgba(255, 255, 255, 0.03)", // Transparent Glass
// //     icon: Instagram,
// //     className: "group hover:ring-1 hover:ring-pink-500/50"
// //   },
// //   // Item 3: Social - Email
// //   {
// //     title: "support@pict.edu",
// //     description: "Get help 24/7",
// //     label: "Email",
// //     color: "rgba(255, 255, 255, 0.03)", // Transparent Glass
// //     icon: Mail,
// //     className: "group hover:ring-1 hover:ring-teal-500/50"
// //   },
// //   // Item 4: Social - Mobile
// //   {
// //     title: "+91 98765 43210",
// //     description: "Student Helpline",
// //     label: "Mobile",
// //     color: "rgba(255, 255, 255, 0.03)", // Transparent Glass
// //     icon: Phone,
// //     className: "group hover:ring-1 hover:ring-blue-500/50"
// //   }
// // ];

// // // Helper Component for Progress Bars
// // const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
// //   const percentage = Math.round((present / total) * 100);
// //   // Indicator color logic: Green (>80), Indigo (>40), Amber (<40)
// //   const indicatorColor = percentage > 80 ? 'bg-emerald-500' : percentage > 40 ? 'bg-indigo-500' : 'bg-amber-500';

// //   return (
// //     <div className="group">
// //       <div className="flex items-center justify-between text-sm mb-1.5">
// //         <span className="font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">{name}</span>
// //         <span className="text-muted-foreground text-xs">
// //           {present}/{total} Papers ({percentage}%)
// //         </span>
// //       </div>
// //       <Progress value={percentage} className="h-2 bg-slate-800" indicatorClassName={indicatorColor} />
// //     </div>
// //   );
// // };

// // const Dashboard = () => {
// //   const [selectedYear, setSelectedYear] = useState("2nd Year");

// //   return (
// //     <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-indigo-500/30">
// //       <Navbar />
// //       <main className="pt-24 pb-12">
// //         <div className="container mx-auto px-4 max-w-7xl">
// //           {/* Header */}
// //           <div className="mb-10 animate-fade-in-up">
// //             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
// //               Welcome back, Student! 👋
// //             </h1>
// //             <p className="text-slate-400">Everything you need to Ace Your Exams.</p>
// //           </div>

// //           {/* SECTION 1: Magic Bento Grid (Quick Actions & Socials) */}
// //           <div className="mb-12 animate-fade-in-up delay-100"> 
// //             <MagicBento 
// //               items={bentoItems}
// //               enableStars={true}
// //               enableTilt={true}
// //               enableBorderGlow={true}
// //               spotlightRadius={400}
// //               glowColor="124, 58, 237" // Violet Glow
// //             />
// //           </div>

// //           {/* SECTION 2: Comprehensive Progress Tracking */}
// //           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in-up delay-200">
            
// //             {/* First Year Progress */}
// //             <Card className="bg-[#0b1221] border-slate-800 shadow-2xl hover:border-indigo-500/30 transition-colors duration-300">
// //               <CardHeader>
// //                 <div className="flex items-center justify-between">
// //                   <CardTitle className="flex items-center gap-2 text-xl text-white">
// //                     <Target className="w-6 h-6 text-indigo-500" />
// //                     First Year Repository
// //                   </CardTitle>
// //                   <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10">Freshmen</Badge>
// //                 </div>
// //                 <CardDescription className="text-slate-400">
// //                   Total available previous year questions per subject.
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent className="space-y-6 pr-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
// //                 {firstYearSubjects.map((sub) => (
// //                   <SubjectProgressItem key={sub.name} {...sub} />
// //                 ))}
// //               </CardContent>
// //             </Card>

// //             {/* Department Wise Progress (With Year Filter) */}
// //             <Card className="bg-[#0b1221] border-slate-800 shadow-2xl hover:border-purple-500/30 transition-colors duration-300">
// //               <CardHeader>
// //                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //                   <div className="space-y-1.5">
// //                     <CardTitle className="flex items-center gap-2 text-xl text-white">
// //                       <FileText className="w-6 h-6 text-purple-500" />
// //                       Department Repository
// //                     </CardTitle>
// //                     <CardDescription className="text-slate-400">
// //                       Track repository status for major engineering branches.
// //                     </CardDescription>
// //                   </div>
                  
// //                   {/* Dropdown for Year Selection */}
// //                   <Select value={selectedYear} onValueChange={setSelectedYear}>
// //                     <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700 text-slate-200 focus:ring-purple-500">
// //                       <div className="flex items-center gap-2">
// //                         <Filter className="w-3.5 h-3.5" />
// //                         <SelectValue placeholder="Select Year" />
// //                       </div>
// //                     </SelectTrigger>
// //                     <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
// //                       <SelectItem value="2nd Year">2nd Year</SelectItem>
// //                       <SelectItem value="3rd Year">3rd Year</SelectItem>
// //                       <SelectItem value="4th Year">4th Year</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="space-y-8 pr-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
// //                 {Object.entries(branchSubjectsData).map(([branch, yearData]) => {
// //                   // Type assertion because we know the keys exist based on our data structure
// //                   const subjects = (yearData as any)[selectedYear] || [];
                  
// //                   return (
// //                     <div key={branch} className="space-y-3">
// //                       <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
// //                         <ChevronRight className="w-3 h-3 text-purple-500" /> {branch}
// //                       </h4>
// //                       <div className="pl-4 space-y-4 border-l border-slate-800">
// //                         {subjects.length > 0 ? (
// //                           subjects.map((sub: any) => (
// //                             <SubjectProgressItem key={sub.name} {...sub} />
// //                           ))
// //                         ) : (
// //                           <p className="text-sm text-slate-600 italic pl-2">No data available for {selectedYear}</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </CardContent>
// //             </Card>
            
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Dashboard;








// import { useState } from "react";
// import Navbar from "@/components/layout/Navbar";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import MagicBento, { BentoCardProps } from "@/components/ui/MagicBento"; 

// import { 
//   BrainCircuit,
//   Instagram,
//   Mail,
//   Phone,
//   Target,
//   FileText,
//   ChevronRight,
//   Filter
// } from "lucide-react";

// // --- Data Configuration ---

// // 1. First Year Subjects Data (Dummy Data for Progress)
// const firstYearSubjects = [
//   { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
//   { name: "Quantum Physics (QP)", total: 40, present: 32 },
//   { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
//   { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
//   { name: "C Programming (CPPS)", total: 60, present: 55 },
//   { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
//   { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
//   { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
//   { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
//   { name: "Environment Engineering (ESE)", total: 20, present: 18 },
// ];

// // 2. Branch Specific Subjects Data (With Year-Based filtering logic)
// // I've expanded the structure slightly to simulate different years having different completion rates or even slightly different subjects if needed.
// const branchSubjectsData = {
//   "Computer Engineering": {
//     "2nd Year": [
//         { name: "Data Structures (DS)", total: 80, present: 75 },
//         { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
//         { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
//     ],
//     "3rd Year": [
//         { name: "Database Management (DBMS)", total: 70, present: 60 },
//         { name: "Theory of Computation (TOC)", total: 65, present: 55 },
//         { name: "Systems Programming (SPOS)", total: 60, present: 40 }
//     ],
//     "4th Year": [
//         { name: "Machine Learning (ML)", total: 55, present: 20 },
//         { name: "Information Security (IS)", total: 50, present: 30 },
//         { name: "Compilers (CD)", total: 45, present: 15 }
//     ]
//   },
//   "Information Technology": {
//      "2nd Year": [
//         { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
//         { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
//         { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
//      ],
//      "3rd Year": [
//         { name: "Web Technology (WT)", total: 60, present: 55 },
//         { name: "Software Engineering (SE)", total: 55, present: 45 },
//         { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
//      ],
//      "4th Year": [
//         { name: "Distributed Systems (DS)", total: 45, present: 10 },
//         { name: "Mobile Computing (MC)", total: 40, present: 5 },
//         { name: "Software Testing (STQA)", total: 35, present: 15 }
//      ]
//   },
//   "Electronics & Telecom (EnTC)": {
//     "2nd Year": [
//         { name: "Signals and Systems (S&S)", total: 70, present: 35 },
//         { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
//         { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
//     ],
//     "3rd Year": [
//         { name: "Digital Communication (DC)", total: 60, present: 40 },
//         { name: "Microcontrollers (MC)", total: 55, present: 30 },
//         { name: "Electromagnetics (EM)", total: 50, present: 20 }
//     ],
//     "4th Year": [
//         { name: "VLSI Design", total: 45, present: 15 },
//         { name: "Mobile Communication", total: 40, present: 10 },
//         { name: "Broadband Comm", total: 35, present: 5 }
//     ]
//   },
//   "AI & Data Science": {
//     "2nd Year": [
//         { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
//         { name: "Data Structures (DS)", total: 80, present: 65 },
//         { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
//     ],
//     "3rd Year": [
//         { name: "Data Science (DS)", total: 60, present: 30 },
//         { name: "Neural Networks (NN)", total: 55, present: 20 },
//         { name: "Software Engg (SE)", total: 50, present: 25 }
//     ],
//     "4th Year": [
//         { name: "Deep Learning (DL)", total: 45, present: 5 },
//         { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
//         { name: "Big Data (BD)", total: 35, present: 12 }
//     ]
//   },
//   "Electronics & Computer (E&CE)": {
//     "2nd Year": [
//         { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
//         { name: "Operating System (OS)", total: 70, present: 68 },
//         { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
//     ],
//     "3rd Year": [
//         { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
//         { name: "Microprocessors (MP)", total: 50, present: 35 },
//         { name: "Data Comm (DC)", total: 45, present: 25 }
//     ],
//     "4th Year": [
//         { name: "Embedded Systems (ES)", total: 40, present: 15 },
//         { name: "System on Chip (SoC)", total: 35, present: 10 },
//         { name: "Cloud Computing (CC)", total: 30, present: 5 }
//     ]
//   }
// };

// // 3. Bento Items Configuration (Quick Actions & Socials)
// const bentoItems: BentoCardProps[] = [
//   // Item 1: Quick Action - AI Prediction (Spans 2 cols via CSS in MagicBento)
//   {
//     title: "AI Question Prediction",
//     description: "Generate smart predictions based on PYQ trends.",
//     label: "Quick Action",
//     color: "#4f46e5", // Indigo
//     icon: BrainCircuit,
//     className: "col-span-2" 
//   },
//   // Item 2: Social - Insta
//   {
//     title: "@pict_acadverse",
//     description: "Follow for updates",
//     label: "Instagram",
//     color: "#be185d", // Pink
//     icon: Instagram
//   },
//   // Item 3: Social - Email
//   {
//     title: "support@pict.edu",
//     description: "Get help 24/7",
//     label: "Email",
//     color: "#0f766e", // Teal
//     icon: Mail
//   },
//   // Item 4: Social - Mobile
//   {
//     title: "+91 98765 43210",
//     description: "Student Helpline",
//     label: "Mobile",
//     color: "#1e3a8a", // Dark Blue
//     icon: Phone
//   }
// ];

// // Helper Component for Progress Bars
// const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
//   const percentage = Math.round((present / total) * 100);
//   // Indicator color logic: Green (>80), Indigo (>40), Amber (<40)
//   const indicatorColor = percentage > 80 ? 'bg-emerald-500' : percentage > 40 ? 'bg-indigo-500' : 'bg-amber-500';

//   return (
//     <div className="group">
//       <div className="flex items-center justify-between text-sm mb-1.5">
//         <span className="font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">{name}</span>
//         <span className="text-muted-foreground text-xs">
//           {present}/{total} Papers ({percentage}%)
//         </span>
//       </div>
//       <Progress value={percentage} className="h-2 bg-slate-800" indicatorClassName={indicatorColor} />
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [selectedYear, setSelectedYear] = useState("2nd Year");

//   return (
//     <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-indigo-500/30">
//       <Navbar />
//       <main className="pt-24 pb-12">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="mb-10 animate-fade-in-up">
//             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
//               Welcome back, Student! 👋
//             </h1>
//             <p className="text-slate-400">Everything you need to Ace Your Exams.</p>
//           </div>

//           {/* SECTION 1: Magic Bento Grid (Quick Actions & Socials) */}
//           <div className="mb-12 animate-fade-in-up delay-100"> 
//             <MagicBento 
//               items={bentoItems}
//               enableStars={true}
//               enableTilt={true}
//               enableBorderGlow={true}
//               spotlightRadius={400}
//               glowColor="124, 58, 237" // Violet Glow
//             />
//           </div>

//           {/* SECTION 2: Comprehensive Progress Tracking */}
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in-up delay-200">
            
//             {/* First Year Progress */}
//             <Card className="bg-[#0b1221] border-slate-800 shadow-2xl hover:border-indigo-500/30 transition-colors duration-300">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="flex items-center gap-2 text-xl text-white">
//                     <Target className="w-6 h-6 text-indigo-500" />
//                     First Year Repository
//                   </CardTitle>
//                   <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10">Freshmen</Badge>
//                 </div>
//                 <CardDescription className="text-slate-400">
//                   Total available previous year questions per subject.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6 pr-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
//                 {firstYearSubjects.map((sub) => (
//                   <SubjectProgressItem key={sub.name} {...sub} />
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Department Wise Progress (With Year Filter) */}
//             <Card className="bg-[#0b1221] border-slate-800 shadow-2xl hover:border-purple-500/30 transition-colors duration-300">
//               <CardHeader>
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                   <div className="space-y-1.5">
//                     <CardTitle className="flex items-center gap-2 text-xl text-white">
//                       <FileText className="w-6 h-6 text-purple-500" />
//                       Department Repository
//                     </CardTitle>
//                     <CardDescription className="text-slate-400">
//                       Track repository status for major engineering branches.
//                     </CardDescription>
//                   </div>
                  
//                   {/* Dropdown for Year Selection */}
//                   <Select value={selectedYear} onValueChange={setSelectedYear}>
//                     <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700 text-slate-200 focus:ring-purple-500">
//                       <div className="flex items-center gap-2">
//                         <Filter className="w-3.5 h-3.5" />
//                         <SelectValue placeholder="Select Year" />
//                       </div>
//                     </SelectTrigger>
//                     <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
//                       <SelectItem value="2nd Year">2nd Year</SelectItem>
//                       <SelectItem value="3rd Year">3rd Year</SelectItem>
//                       <SelectItem value="4th Year">4th Year</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-8 pr-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
//                 {Object.entries(branchSubjectsData).map(([branch, yearData]) => {
//                   // Type assertion because we know the keys exist based on our data structure
//                   const subjects = (yearData as any)[selectedYear] || [];
                  
//                   return (
//                     <div key={branch} className="space-y-3">
//                       <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
//                         <ChevronRight className="w-3 h-3 text-purple-500" /> {branch}
//                       </h4>
//                       <div className="pl-4 space-y-4 border-l border-slate-800">
//                         {subjects.length > 0 ? (
//                           subjects.map((sub: any) => (
//                             <SubjectProgressItem key={sub.name} {...sub} />
//                           ))
//                         ) : (
//                           <p className="text-sm text-slate-600 italic pl-2">No data available for {selectedYear}</p>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </CardContent>
//             </Card>
            
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;






// import { useState } from "react";
// import Navbar from "@/components/layout/Navbar";
// import { Progress } from "@/components/ui/progress";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { 
//   BrainCircuit, 
//   Flame, 
//   Clock, 
//   ChevronRight, 
//   BookOpen, 
//   X,
//   Instagram,
//   Mail,
//   Phone,
//   ArrowRight
// } from "lucide-react";

// // --- DATA SECTION --- 
// // (Kept exactly as provided)
// const firstYearSubjects = [
//   { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
//   { name: "Quantum Physics (QP)", total: 40, present: 32 },
//   { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
//   { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
//   { name: "C Programming (CPPS)", total: 60, present: 55 },
//   { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
//   { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
//   { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
//   { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
//   { name: "Environment Engineering (ESE)", total: 20, present: 18 },
// ];

// const branchSubjectsData: Record<string, any> = {
//   "Computer Engineering": {
//     "2nd Year": [
//         { name: "Data Structures (DS)", total: 80, present: 75 },
//         { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
//         { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
//     ],
//     "3rd Year": [
//         { name: "Database Management (DBMS)", total: 70, present: 60 },
//         { name: "Theory of Computation (TOC)", total: 65, present: 55 },
//         { name: "Systems Programming (SPOS)", total: 60, present: 40 }
//     ],
//     "4th Year": [
//         { name: "Machine Learning (ML)", total: 55, present: 20 },
//         { name: "Information Security (IS)", total: 50, present: 30 },
//         { name: "Compilers (CD)", total: 45, present: 15 }
//     ]
//   },
//   "Information Technology": {
//      "2nd Year": [
//         { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
//         { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
//         { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
//       ],
//       "3rd Year": [
//         { name: "Web Technology (WT)", total: 60, present: 55 },
//         { name: "Software Engineering (SE)", total: 55, present: 45 },
//         { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
//       ],
//       "4th Year": [
//         { name: "Distributed Systems (DS)", total: 45, present: 10 },
//         { name: "Mobile Computing (MC)", total: 40, present: 5 },
//         { name: "Software Testing (STQA)", total: 35, present: 15 }
//       ]
//   },
//   "Electronics & Telecom (EnTC)": {
//     "2nd Year": [
//         { name: "Signals and Systems (S&S)", total: 70, present: 35 },
//         { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
//         { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
//     ],
//     "3rd Year": [
//         { name: "Digital Communication (DC)", total: 60, present: 40 },
//         { name: "Microcontrollers (MC)", total: 55, present: 30 },
//         { name: "Electromagnetics (EM)", total: 50, present: 20 }
//     ],
//     "4th Year": [
//         { name: "VLSI Design", total: 45, present: 15 },
//         { name: "Mobile Communication", total: 40, present: 10 },
//         { name: "Broadband Comm", total: 35, present: 5 }
//     ]
//   },
//   "AI & Data Science": {
//     "2nd Year": [
//         { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
//         { name: "Data Structures (DS)", total: 80, present: 65 },
//         { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
//     ],
//     "3rd Year": [
//         { name: "Data Science (DS)", total: 60, present: 30 },
//         { name: "Neural Networks (NN)", total: 55, present: 20 },
//         { name: "Software Engg (SE)", total: 50, present: 25 }
//     ],
//     "4th Year": [
//         { name: "Deep Learning (DL)", total: 45, present: 5 },
//         { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
//         { name: "Big Data (BD)", total: 35, present: 12 }
//     ]
//   },
//   "Electronics & Computer (E&CE)": {
//     "2nd Year": [
//         { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
//         { name: "Operating System (OS)", total: 70, present: 68 },
//         { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
//     ],
//     "3rd Year": [
//         { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
//         { name: "Microprocessors (MP)", total: 50, present: 35 },
//         { name: "Data Comm (DC)", total: 45, present: 25 }
//     ],
//     "4th Year": [
//         { name: "Embedded Systems (ES)", total: 40, present: 15 },
//         { name: "System on Chip (SoC)", total: 35, present: 10 },
//         { name: "Cloud Computing (CC)", total: 30, present: 5 }
//     ]
//   }
// };

// // --- COMPONENTS ---

// // 1. Subject Progress Item (For the Expanded View)
// const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
//   const percentage = Math.round((present / total) * 100);
//   const indicatorColor = percentage > 80 ? 'bg-emerald-400' : percentage > 40 ? 'bg-indigo-400' : 'bg-amber-400';

//   return (
//     <div className="group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
//       <div className="flex items-center justify-between text-sm mb-2">
//         <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{name}</span>
//         <span className="text-slate-400 text-xs font-mono">
//           {present}/{total} ({percentage}%)
//         </span>
//       </div>
//       <Progress value={percentage} className="h-1.5 bg-slate-800" indicatorClassName={indicatorColor} />
//     </div>
//   );
// };

// // 2. Repo Summary Card (The Clickable Department Cards)
// const RepoSummaryCard = ({ 
//   title, 
//   subtitle, 
//   progress, 
//   colorClass, 
//   onClick, 
//   isActive 
// }: { 
//   title: string, 
//   subtitle: string, 
//   progress: number, 
//   colorClass: string,
//   onClick: () => void,
//   isActive: boolean
// }) => {
//   return (
//     <div 
//       onClick={onClick}
//       className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 group
//         ${isActive 
//           ? "bg-white/10 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-[1.02]" 
//           : "bg-[#0f0c29]/40 border-white/5 hover:border-white/20 hover:bg-[#0f0c29]/60"
//         } border backdrop-blur-md`}
//     >
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className={`font-bold text-lg ${isActive ? "text-white" : "text-slate-200"} group-hover:text-white transition-colors`}>{title}</h3>
//           <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
//         </div>
//         <div className={`text-2xl font-bold ${colorClass}`}>{progress}%</div>
//       </div>
      
//       {/* Mini Progress Bar */}
//       <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
//         <div 
//           className={`h-full rounded-full ${colorClass.replace("text-", "bg-")} transition-all duration-1000`} 
//           style={{ width: `${progress}%` }}
//         />
//       </div>
      
//       {/* Active Indicator */}
//       {isActive && (
//         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-purple-500/50"></div>
//       )}
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [selectedYear, setSelectedYear] = useState("2nd Year");
//   const [activeBranch, setActiveBranch] = useState<string | null>(null);

//   // Helper to get total progress for a branch (averaged for the selected year)
//   const getBranchProgress = (branch: string) => {
//     if (branch === "First Year") {
//       const totalDocs = firstYearSubjects.reduce((acc, curr) => acc + curr.total, 0);
//       const totalPresent = firstYearSubjects.reduce((acc, curr) => acc + curr.present, 0);
//       return Math.round((totalPresent / totalDocs) * 100);
//     }
    
//     const subjects = branchSubjectsData[branch]?.[selectedYear] || [];
//     if (subjects.length === 0) return 0;
    
//     const totalDocs = subjects.reduce((acc: number, curr: any) => acc + curr.total, 0);
//     const totalPresent = subjects.reduce((acc: number, curr: any) => acc + curr.present, 0);
//     return Math.round((totalPresent / totalDocs) * 100);
//   };

//   return (
//     <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-purple-500/30 overflow-x-hidden">
//       <Navbar />
      
//       <main className="pt-24 pb-20">
//         <div className="container mx-auto px-4 max-w-7xl space-y-8">
          
//           {/* --- SECTION 1: THE COMMAND CENTER (Bento Grid) --- */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            
//             {/* Card 1: Resume Study (Hero) - Spans 2 cols */}
//             <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-8 group hover:border-purple-500/30 transition-all duration-500 shadow-2xl">
//               {/* Background ambient glow */}
//               <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              
//               <div className="relative z-10 flex flex-col h-full justify-between">
//                 <div>
//                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
//                     Welcome back, Student! 👋
//                    </h1>
//                    <p className="text-slate-400 max-w-md text-lg">
//                      You are on a roll! Ready to continue your preparation?
//                    </p>
//                 </div>

//                 <div className="mt-8 bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm group-hover:bg-black/30 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
//                       <BookOpen className="w-6 h-6" />
//                     </div>
//                     <div>
//                        <div className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-0.5">Last Opened</div>
//                        <div className="text-white font-medium">Signals & Systems: Unit 4 PYQs</div>
//                     </div>
//                   </div>
//                   <button className="w-full sm:w-auto px-6 py-2.5 bg-white text-black rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
//                     Resume Study <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column Stack */}
//             <div className="grid grid-rows-2 gap-6 h-full">
              
//               {/* Card 2: Exam Countdown (Urgency) */}
//               <div className="rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-6 flex flex-col justify-center items-center text-center group hover:border-amber-500/30 transition-all shadow-xl">
//                  <div className="mb-2 p-3 bg-amber-500/10 rounded-full text-amber-500">
//                    <Clock className="w-6 h-6" />
//                  </div>
//                  <div className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-orange-500">
//                    14
//                  </div>
//                  <div className="text-slate-400 font-medium mt-1">Days to In-Sem</div>
//                  <div className="text-xs text-slate-500 mt-2">Next: Data Structures</div>
//               </div>

//               {/* Card 3: Daily Streak (Gamification) */}
//               <div className="rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-6 flex flex-col justify-center items-center text-center group hover:border-pink-500/30 transition-all shadow-xl relative overflow-hidden">
//                  {/* Fire Animation Background */}
//                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-transparent opacity-50"></div>
                 
//                  <div className="relative z-10">
//                    <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-1">
//                      <Flame className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" /> 4
//                    </div>
//                    <div className="text-slate-400 font-medium">Day Streak</div>
//                    <p className="text-xs text-slate-500 mt-2">You're in the top 5%!</p>
//                  </div>
//               </div>
//             </div>

//             {/* Bottom Row - Full Width AI Feature */}
//             <div className="md:col-span-3 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-900/20 to-[#0f0c29]/40 backdrop-blur-xl p-6 flex items-center justify-between group hover:border-indigo-500/30 transition-all shadow-xl relative overflow-hidden">
//                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               
//                <div className="flex items-center gap-4 relative z-10">
//                  <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
//                    <BrainCircuit className="w-6 h-6" />
//                  </div>
//                  <div>
//                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                      AI Question Predictor <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Beta</span>
//                    </h3>
//                    <p className="text-slate-400 text-sm">Generate smart predictions based on 5 years of PYQ patterns.</p>
//                  </div>
//                </div>
//                <button className="hidden sm:flex items-center gap-2 text-indigo-300 hover:text-white transition-colors text-sm font-semibold relative z-10">
//                  Try Now <ChevronRight className="w-4 h-4" />
//                </button>
//             </div>
//           </div>

//           {/* --- SECTION 2: REPOSITORY STATS (Interactive) --- */}
//           <div className="animate-fade-in-up delay-100">
//             <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 border-b border-white/5 pb-4">
//               <div>
//                 <h2 className="text-2xl font-bold text-white tracking-tight">Repository Stats</h2>
//                 <p className="text-slate-400 text-sm mt-1">Select a branch to view detailed subject availability.</p>
//               </div>
              
//               {/* Year Filter */}
//               <div className="mt-4 sm:mt-0">
//                 <Select value={selectedYear} onValueChange={(val) => {
//                   setSelectedYear(val);
//                   setActiveBranch(null); // Reset detail view on year change
//                 }}>
//                   <SelectTrigger className="w-[140px] bg-slate-900 border-white/10 text-slate-200 focus:ring-purple-500">
//                     <SelectValue placeholder="Select Year" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
//                     <SelectItem value="2nd Year">2nd Year</SelectItem>
//                     <SelectItem value="3rd Year">3rd Year</SelectItem>
//                     <SelectItem value="4th Year">4th Year</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Summary Cards Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//               {/* First Year Card (Always visible) */}
//               <RepoSummaryCard 
//                 title="First Year" 
//                 subtitle="All Branches"
//                 progress={getBranchProgress("First Year")} 
//                 colorClass="text-cyan-400"
//                 isActive={activeBranch === "First Year"}
//                 onClick={() => setActiveBranch(activeBranch === "First Year" ? null : "First Year")}
//               />
//               {/* Branch Cards */}
//               {Object.keys(branchSubjectsData).map((branch, index) => {
//                 const colors = ["text-purple-400", "text-pink-400", "text-amber-400", "text-emerald-400"];
//                 return (
//                   <RepoSummaryCard 
//                     key={branch}
//                     title={branch.split(" ")[0]} // Shorten title (e.g. "Computer")
//                     subtitle={branchSubjectsData[branch][selectedYear]?.length + " Subjects"}
//                     progress={getBranchProgress(branch)}
//                     colorClass={colors[index % colors.length]}
//                     isActive={activeBranch === branch}
//                     onClick={() => setActiveBranch(activeBranch === branch ? null : branch)}
//                   />
//                 )
//               })}
//             </div>

//             {/* --- EXPANDABLE DETAIL VIEW --- */}
//             {activeBranch && (
//               <div className="mt-6 animate-in slide-in-from-top-4 fade-in duration-300">
//                 <div className="rounded-2xl bg-[#0f0c29]/60 border border-purple-500/20 backdrop-blur-xl p-6 relative">
//                   <button 
//                     onClick={() => setActiveBranch(null)}
//                     className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
                  
//                   <div className="mb-6">
//                     <h3 className="text-xl font-bold text-white flex items-center gap-2">
//                       {activeBranch === "First Year" ? "First Year Common" : `${activeBranch} Engineering`}
//                       <span className="text-sm font-normal text-slate-500 bg-white/5 px-3 py-1 rounded-full">{selectedYear}</span>
//                     </h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {activeBranch === "First Year" 
//                       ? firstYearSubjects.map((sub) => (
//                           <SubjectProgressItem key={sub.name} {...sub} />
//                         ))
//                       : (branchSubjectsData[activeBranch]?.[selectedYear] || []).map((sub: any) => (
//                           <SubjectProgressItem key={sub.name} {...sub} />
//                         ))
//                     }
//                     {(activeBranch !== "First Year" && (!branchSubjectsData[activeBranch]?.[selectedYear] || branchSubjectsData[activeBranch]?.[selectedYear].length === 0)) && (
//                       <div className="col-span-full text-center py-10 text-slate-500 italic">
//                         No subjects data found for {selectedYear}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//         </div>
//       </main>

//       {/* --- FOOTER (Contact & Links) --- */}
//       <footer className="border-t border-white/5 bg-[#010409] py-12 mt-12">
//         <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="text-center md:text-left">
//             <h4 className="font-bold text-lg text-white">PICT AcadVerse</h4>
//             <p className="text-slate-500 text-sm mt-1">Made with 💜 by Students, for Students.</p>
//           </div>
          
//           <div className="flex items-center gap-6">
//             <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-colors text-sm">
//               <Instagram className="w-4 h-4" /> @pict_acadverse
//             </a>
//             <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm">
//               <Mail className="w-4 h-4" /> support@pict.edu
//             </a>
//             <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm">
//               <Phone className="w-4 h-4" /> +91 98765 43210
//             </a>
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// };

// export default Dashboard;






// import { useState } from "react";
// import Navbar from "@/components/layout/Navbar";
// import { Progress } from "@/components/ui/progress";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { 
//   BrainCircuit, 
//   Flame, 
//   Clock, 
//   BookOpen, 
//   X,
//   Instagram,
//   Mail,
//   Phone,
//   ArrowRight,
//   MessageCircle,
//   HelpCircle
// } from "lucide-react";

// // --- DATA SECTION --- 
// // (Restored full data structure to ensure dropdown works for all years)

// const firstYearSubjects = [
//   { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
//   { name: "Quantum Physics (QP)", total: 40, present: 32 },
//   { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
//   { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
//   { name: "C Programming (CPPS)", total: 60, present: 55 },
//   { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
//   { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
//   { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
//   { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
//   { name: "Environment Engineering (ESE)", total: 20, present: 18 },
// ];

// const branchSubjectsData: Record<string, any> = {
//   "Computer Engineering": {
//     "2nd Year": [
//         { name: "Data Structures (DS)", total: 80, present: 75 },
//         { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
//         { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
//     ],
//     "3rd Year": [
//         { name: "Database Management (DBMS)", total: 70, present: 60 },
//         { name: "Theory of Computation (TOC)", total: 65, present: 55 },
//         { name: "Systems Programming (SPOS)", total: 60, present: 40 }
//     ],
//     "4th Year": [
//         { name: "Machine Learning (ML)", total: 55, present: 20 },
//         { name: "Information Security (IS)", total: 50, present: 30 },
//         { name: "Compilers (CD)", total: 45, present: 15 }
//     ]
//   },
//   "Information Technology": {
//      "2nd Year": [
//         { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
//         { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
//         { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
//       ],
//       "3rd Year": [
//         { name: "Web Technology (WT)", total: 60, present: 55 },
//         { name: "Software Engineering (SE)", total: 55, present: 45 },
//         { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
//       ],
//       "4th Year": [
//         { name: "Distributed Systems (DS)", total: 45, present: 10 },
//         { name: "Mobile Computing (MC)", total: 40, present: 5 },
//         { name: "Software Testing (STQA)", total: 35, present: 15 }
//       ]
//   },
//   "Electronics & Telecom (EnTC)": {
//     "2nd Year": [
//         { name: "Signals and Systems (S&S)", total: 70, present: 70 },
//         { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
//         { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
//     ],
//     "3rd Year": [
//         { name: "Digital Communication (DC)", total: 60, present: 40 },
//         { name: "Microcontrollers (MC)", total: 55, present: 30 },
//         { name: "Electromagnetics (EM)", total: 50, present: 20 }
//     ],
//     "4th Year": [
//         { name: "VLSI Design", total: 45, present: 15 },
//         { name: "Mobile Communication", total: 40, present: 10 },
//         { name: "Broadband Comm", total: 35, present: 5 }
//     ]
//   },
//   "AI & Data Science": {
//     "2nd Year": [
//         { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
//         { name: "Data Structures (DS)", total: 80, present: 65 },
//         { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
//     ],
//     "3rd Year": [
//         { name: "Data Science (DS)", total: 60, present: 30 },
//         { name: "Neural Networks (NN)", total: 55, present: 20 },
//         { name: "Software Engg (SE)", total: 50, present: 25 }
//     ],
//     "4th Year": [
//         { name: "Deep Learning (DL)", total: 45, present: 5 },
//         { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
//         { name: "Big Data (BD)", total: 35, present: 12 }
//     ]
//   },
//   "Electronics & Computer (E&CE)": {
//     "2nd Year": [
//         { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
//         { name: "Operating System (OS)", total: 70, present: 68 },
//         { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
//     ],
//     "3rd Year": [
//         { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
//         { name: "Microprocessors (MP)", total: 50, present: 35 },
//         { name: "Data Comm (DC)", total: 45, present: 25 }
//     ],
//     "4th Year": [
//         { name: "Embedded Systems (ES)", total: 40, present: 15 },
//         { name: "System on Chip (SoC)", total: 35, present: 10 },
//         { name: "Cloud Computing (CC)", total: 30, present: 5 }
//     ]
//   }
// };

// // --- COMPONENTS ---

// // 1. Subject Progress Item
// const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
//   const percentage = Math.round((present / total) * 100);
//   const indicatorColor = percentage > 80 ? 'bg-emerald-400' : percentage > 40 ? 'bg-indigo-400' : 'bg-amber-400';

//   return (
//     <div className="group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
//       <div className="flex items-center justify-between text-sm mb-2">
//         <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{name}</span>
//         <span className="text-slate-400 text-xs font-mono">
//           {present}/{total} ({percentage}%)
//         </span>
//       </div>
//       <Progress value={percentage} className="h-1.5 bg-slate-800" indicatorClassName={indicatorColor} />
//     </div>
//   );
// };

// // 2. Repo Summary Card
// const RepoSummaryCard = ({ 
//   title, 
//   subtitle, 
//   progress, 
//   colorClass, 
//   onClick, 
//   isActive 
// }: { 
//   title: string, 
//   subtitle: string, 
//   progress: number, 
//   colorClass: string,
//   onClick: () => void,
//   isActive: boolean
// }) => {
//   return (
//     <div 
//       onClick={onClick}
//       className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 group
//         ${isActive 
//           ? "bg-white/10 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-[1.02]" 
//           : "bg-[#0f0c29]/40 border-white/5 hover:border-white/20 hover:bg-[#0f0c29]/60"
//         } border backdrop-blur-md`}
//     >
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className={`font-bold text-lg ${isActive ? "text-white" : "text-slate-200"} group-hover:text-white transition-colors`}>{title}</h3>
//           <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
//         </div>
//         <div className={`text-2xl font-bold ${colorClass}`}>{progress}%</div>
//       </div>
      
//       <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
//         <div 
//           className={`h-full rounded-full ${colorClass.replace("text-", "bg-")} transition-all duration-1000`} 
//           style={{ width: `${progress}%` }}
//         />
//       </div>
      
//       {isActive && (
//         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-purple-500/50"></div>
//       )}
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [selectedYear, setSelectedYear] = useState("2nd Year");
//   const [activeBranch, setActiveBranch] = useState<string | null>(null);

//   // Helper to get total progress for a branch
//   const getBranchProgress = (branch: string) => {
//     if (branch === "First Year") {
//       const totalDocs = firstYearSubjects.reduce((acc, curr) => acc + curr.total, 0);
//       const totalPresent = firstYearSubjects.reduce((acc, curr) => acc + curr.present, 0);
//       return Math.round((totalPresent / totalDocs) * 100);
//     }
    
//     // Safety check for empty arrays or missing data
//     const subjects = branchSubjectsData[branch]?.[selectedYear] || [];
//     if (subjects.length === 0) return 0;
    
//     const totalDocs = subjects.reduce((acc: number, curr: any) => acc + curr.total, 0);
//     const totalPresent = subjects.reduce((acc: number, curr: any) => acc + curr.present, 0);
//     return Math.round((totalPresent / totalDocs) * 100);
//   };

//   return (
//     <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-purple-500/30 overflow-x-hidden">
//       <Navbar />
      
//       <main className="pt-24 pb-20">
//         <div className="container mx-auto px-4 max-w-7xl space-y-8">
          
//           {/* --- SECTION 1: THE COMMAND CENTER --- */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            
//             {/* LEFT: Resume Study (Spans 2 cols) */}
//             <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-8 group hover:border-purple-500/30 transition-all duration-500 shadow-2xl flex flex-col justify-between">
//               {/* Background ambient glow */}
//               <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              
//               <div className="relative z-10">
//                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
//                   Welcome back, Student! 👋
//                  </h1>
//                  <p className="text-slate-400 max-w-md text-lg">
//                    You are on a roll! Ready to continue your preparation?
//                  </p>
//               </div>

//               <div className="relative z-10 mt-8 bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm group-hover:bg-black/30 transition-colors">
//                 <div className="flex items-center gap-4">
//                   <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
//                     <BookOpen className="w-6 h-6" />
//                   </div>
//                   <div>
//                      <div className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-0.5">Last Opened</div>
//                      <div className="text-white font-medium">Signals & Systems: Unit 4 PYQs</div>
//                   </div>
//                 </div>
//                 <button className="w-full sm:w-auto px-6 py-2.5 bg-white text-black rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
//                   Resume Study <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT COLUMN: Split Cards & Contact */}
//             <div className="flex flex-col gap-6 h-full">
              
//               {/* Row 1: Countdown & Streak (Side by Side) */}
//               <div className="grid grid-cols-2 gap-4 h-1/2">
                
//                 {/* Countdown Card (Mini) */}
//                 <div className="rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-4 flex flex-col justify-center items-center text-center group hover:border-amber-500/30 transition-all shadow-xl">
//                    <div className="text-3xl font-mono font-bold text-amber-400 mb-1">
//                      14
//                    </div>
//                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Days Left</div>
//                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
//                      <Clock className="w-3 h-3" /> In-Sem
//                    </div>
//                 </div>

//                 {/* Streak Card (Mini) */}
//                 <div className="rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-4 flex flex-col justify-center items-center text-center group hover:border-pink-500/30 transition-all shadow-xl relative overflow-hidden">
//                    <div className="flex items-center gap-1 text-3xl font-bold text-white mb-1">
//                      <Flame className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" /> 4
//                    </div>
//                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Day Streak</div>
//                    <div className="text-xs text-slate-400 mt-1">Top 5%</div>
//                 </div>
//               </div>

//               {/* Row 2: Contact & Query Section (Bottom Half) */}
//               <div className="h-1/2 rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-5 flex flex-col justify-between group hover:border-blue-500/30 transition-all shadow-xl">
//                  <div className="flex items-start justify-between">
//                     <div>
//                       <h3 className="font-bold text-white text-sm flex items-center gap-2">
//                         <HelpCircle className="w-4 h-4 text-blue-400" /> Need Help?
//                       </h3>
//                       <p className="text-xs text-slate-400 mt-1 leading-relaxed">
//                         Facing issues with notes or login?
//                       </p>
//                     </div>
//                  </div>

//                  <div className="flex items-center justify-between gap-2 mt-2">
//                     <div className="flex gap-2">
//                       <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Email Support">
//                         <Mail className="w-4 h-4" />
//                       </a>
//                       <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Call Helpline">
//                         <Phone className="w-4 h-4" />
//                       </a>
//                       <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-pink-400 transition-colors" title="Instagram">
//                         <Instagram className="w-4 h-4" />
//                       </a>
//                     </div>
//                     <button className="text-xs bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1">
//                       Query <MessageCircle className="w-3 h-3" />
//                     </button>
//                  </div>
//               </div>

//             </div>

//             {/* Bottom Row - Full Width AI Feature (Kept as per design consistency) */}
//             <div className="md:col-span-3 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-900/20 to-[#0f0c29]/40 backdrop-blur-xl p-6 flex items-center justify-between group hover:border-indigo-500/30 transition-all shadow-xl relative overflow-hidden">
//                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               
//                <div className="flex items-center gap-4 relative z-10">
//                  <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
//                    <BrainCircuit className="w-6 h-6" />
//                  </div>
//                  <div>
//                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                      AI Question Predictor <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Beta</span>
//                    </h3>
//                    <p className="text-slate-400 text-sm">Generate smart predictions based on 5 years of PYQ patterns.</p>
//                  </div>
//                </div>
//                <button className="hidden sm:flex items-center gap-2 text-indigo-300 hover:text-white transition-colors text-sm font-semibold relative z-10">
//                  Try Now <ArrowRight className="w-4 h-4" />
//                </button>
//             </div>
//           </div>

//           {/* --- SECTION 2: REPOSITORY STATS --- */}
//           <div className="animate-fade-in-up delay-100">
//             <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 border-b border-white/5 pb-4">
//               <div>
//                 <h2 className="text-2xl font-bold text-white tracking-tight">Repository Stats</h2>
//                 <p className="text-slate-400 text-sm mt-1">Select a branch to view detailed subject availability.</p>
//               </div>
              
//               {/* Year Filter Dropdown */}
//               <div className="mt-4 sm:mt-0">
//                 <Select value={selectedYear} onValueChange={(val) => {
//                   setSelectedYear(val);
//                   setActiveBranch(null); // Reset detail view on year change to avoid confusing data
//                 }}>
//                   <SelectTrigger className="w-[140px] bg-slate-900 border-white/10 text-slate-200 focus:ring-purple-500">
//                     <SelectValue placeholder="Select Year" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
//                     <SelectItem value="2nd Year">2nd Year</SelectItem>
//                     <SelectItem value="3rd Year">3rd Year</SelectItem>
//                     <SelectItem value="4th Year">4th Year</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Summary Cards Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//               {/* First Year Card */}
//               <RepoSummaryCard 
//                 title="First Year" 
//                 subtitle="10 SUBJECTS"
//                 progress={getBranchProgress("First Year")} 
//                 colorClass="text-cyan-400"
//                 isActive={activeBranch === "First Year"}
//                 onClick={() => setActiveBranch(activeBranch === "First Year" ? null : "First Year")}
//               />
//               {/* Branch Cards */}
//               {Object.keys(branchSubjectsData).map((branch, index) => {
//                 const colors = ["text-purple-400", "text-pink-400", "text-amber-400", "text-emerald-400"];
//                 const subjectCount = branchSubjectsData[branch][selectedYear]?.length || 0;
                
//                 return (
//                   <RepoSummaryCard 
//                     key={branch}
//                     title={branch.split(" ")[0]} 
//                     subtitle={`${subjectCount} Subjects`}
//                     progress={getBranchProgress(branch)}
//                     colorClass={colors[index % colors.length]}
//                     isActive={activeBranch === branch}
//                     onClick={() => setActiveBranch(activeBranch === branch ? null : branch)}
//                   />
//                 )
//               })}
//             </div>

//             {/* --- EXPANDABLE DETAIL VIEW --- */}
//             {activeBranch && (
//               <div className="mt-6 animate-in slide-in-from-top-4 fade-in duration-300">
//                 <div className="rounded-2xl bg-[#0f0c29]/60 border border-purple-500/20 backdrop-blur-xl p-6 relative">
//                   <button 
//                     onClick={() => setActiveBranch(null)}
//                     className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
                  
//                   <div className="mb-6">
//                     <h3 className="text-xl font-bold text-white flex items-center gap-2">
//                       {activeBranch === "First Year" ? "First Year Common" : `${activeBranch} Engineering`}
//                       <span className="text-sm font-normal text-slate-500 bg-white/5 px-3 py-1 rounded-full">{selectedYear}</span>
//                     </h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {activeBranch === "First Year" 
//                       ? firstYearSubjects.map((sub) => (
//                           <SubjectProgressItem key={sub.name} {...sub} />
//                         ))
//                       : (branchSubjectsData[activeBranch]?.[selectedYear] || []).map((sub: any) => (
//                           <SubjectProgressItem key={sub.name} {...sub} />
//                         ))
//                     }
//                     {/* Empty State Check */}
//                     {(activeBranch !== "First Year" && (!branchSubjectsData[activeBranch]?.[selectedYear] || branchSubjectsData[activeBranch]?.[selectedYear].length === 0)) && (
//                       <div className="col-span-full text-center py-10 text-slate-500 italic flex flex-col items-center">
//                         <BookOpen className="w-8 h-8 mb-2 opacity-50" />
//                         No subjects data found for {selectedYear}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;












import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BrainCircuit, 
  Flame, 
  Clock, 
  BookOpen, 
  X,
  Instagram,
  Mail,
  Phone,
  ArrowRight,
  MessageCircle,
  HelpCircle
} from "lucide-react";

// --- DATA SECTION --- 

const firstYearSubjects = [
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

const branchSubjectsData: Record<string, any> = {
  "Computer Engineering": {
    "2nd Year": [
        { name: "Data Structures (DS)", total: 80, present: 75 },
        { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
        { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
    ],
    "3rd Year": [
        { name: "Database Management (DBMS)", total: 70, present: 60 },
        { name: "Theory of Computation (TOC)", total: 65, present: 55 },
        { name: "Systems Programming (SPOS)", total: 60, present: 40 }
    ],
    "4th Year": [
        { name: "Machine Learning (ML)", total: 55, present: 20 },
        { name: "Information Security (IS)", total: 50, present: 30 },
        { name: "Compilers (CD)", total: 45, present: 15 }
    ]
  },
  "Information Technology": {
     "2nd Year": [
        { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
        { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
        { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
      ],
      "3rd Year": [
        { name: "Web Technology (WT)", total: 60, present: 55 },
        { name: "Software Engineering (SE)", total: 55, present: 45 },
        { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
      ],
      "4th Year": [
        { name: "Distributed Systems (DS)", total: 45, present: 10 },
        { name: "Mobile Computing (MC)", total: 40, present: 5 },
        { name: "Software Testing (STQA)", total: 35, present: 15 }
      ]
  },
  "Electronics & Telecom (EnTC)": {
    "2nd Year": [
        { name: "Signals and Systems (S&S)", total: 70, present: 70 },
        { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
        { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
    ],
    "3rd Year": [
        { name: "Digital Communication (DC)", total: 60, present: 40 },
        { name: "Microcontrollers (MC)", total: 55, present: 30 },
        { name: "Electromagnetics (EM)", total: 50, present: 20 }
    ],
    "4th Year": [
        { name: "VLSI Design", total: 45, present: 15 },
        { name: "Mobile Communication", total: 40, present: 10 },
        { name: "Broadband Comm", total: 35, present: 5 }
    ]
  },
  "AI & Data Science": {
    "2nd Year": [
        { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
        { name: "Data Structures (DS)", total: 80, present: 65 },
        { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
    ],
    "3rd Year": [
        { name: "Data Science (DS)", total: 60, present: 30 },
        { name: "Neural Networks (NN)", total: 55, present: 20 },
        { name: "Software Engg (SE)", total: 50, present: 25 }
    ],
    "4th Year": [
        { name: "Deep Learning (DL)", total: 45, present: 5 },
        { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
        { name: "Big Data (BD)", total: 35, present: 12 }
    ]
  },
  "Electronics & Computer (E&CE)": {
    "2nd Year": [
        { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
        { name: "Operating System (OS)", total: 70, present: 68 },
        { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
    ],
    "3rd Year": [
        { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
        { name: "Microprocessors (MP)", total: 50, present: 35 },
        { name: "Data Comm (DC)", total: 45, present: 25 }
    ],
    "4th Year": [
        { name: "Embedded Systems (ES)", total: 40, present: 15 },
        { name: "System on Chip (SoC)", total: 35, present: 10 },
        { name: "Cloud Computing (CC)", total: 30, present: 5 }
    ]
  }
};

// --- COMPONENTS ---

// 1. Subject Progress Item
const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
  const percentage = Math.round((present / total) * 100);
  const indicatorColor = percentage > 80 ? 'bg-emerald-400' : percentage > 40 ? 'bg-indigo-400' : 'bg-amber-400';

  return (
    <div className="group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{name}</span>
        <span className="text-slate-400 text-xs font-mono">
          {present}/{total} ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-1.5 bg-slate-800" indicatorClassName={indicatorColor} />
    </div>
  );
};

// 2. Repo Summary Card
// FIXED: Now accepts 'bgClass' explicitly to avoid Tailwind purging the color
const RepoSummaryCard = ({ 
  title, 
  subtitle, 
  progress, 
  colorClass, 
  bgClass, // New Prop
  onClick, 
  isActive 
}: { 
  title: string, 
  subtitle: string, 
  progress: number, 
  colorClass: string,
  bgClass: string,
  onClick: () => void,
  isActive: boolean
}) => {
  return (
    <div 
      onClick={onClick}
      className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 group
        ${isActive 
          ? "bg-white/10 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-[1.02]" 
          : "bg-[#0f0c29]/40 border-white/5 hover:border-white/20 hover:bg-[#0f0c29]/60"
        } border backdrop-blur-md`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`font-bold text-lg ${isActive ? "text-white" : "text-slate-200"} group-hover:text-white transition-colors`}>{title}</h3>
          <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
        </div>
        <div className={`text-2xl font-bold ${colorClass}`}>{progress}%</div>
      </div>
      
      <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
        {/* FIXED: Using bgClass directly */}
        <div 
          className={`h-full rounded-full ${bgClass} transition-all duration-1000`} 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {isActive && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-purple-500/50"></div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2nd Year");
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  // Helper to get total progress for a branch
  const getBranchProgress = (branch: string) => {
    if (branch === "First Year") {
      const totalDocs = firstYearSubjects.reduce((acc, curr) => acc + curr.total, 0);
      const totalPresent = firstYearSubjects.reduce((acc, curr) => acc + curr.present, 0);
      return Math.round((totalPresent / totalDocs) * 100);
    }
    
    // Safety check for empty arrays or missing data
    const subjects = branchSubjectsData[branch]?.[selectedYear] || [];
    if (subjects.length === 0) return 0;
    
    const totalDocs = subjects.reduce((acc: number, curr: any) => acc + curr.total, 0);
    const totalPresent = subjects.reduce((acc: number, curr: any) => acc + curr.present, 0);
    return Math.round((totalPresent / totalDocs) * 100);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl space-y-8">
          
          {/* --- SECTION 1: THE COMMAND CENTER --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            
            {/* LEFT: Resume Study (Spans 2 cols) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-8 group hover:border-purple-500/30 transition-all duration-500 shadow-2xl flex flex-col justify-between">
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                 <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Welcome back, Student! 
                 </h1>
                 <p className="text-slate-400 max-w-md text-lg">
                   You are on a roll! Ready to continue your preparation?
                 </p>
              </div>

              <div className="relative z-10 mt-8 bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm group-hover:bg-black/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                     <div className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-0.5">Last Opened</div>
                     <div className="text-white font-medium">Signals & Systems: Unit 4 PYQs</div>
                  </div>
                </div>
                <a href="/pyqs" className="w-full sm:w-auto px-6 py-2.5 bg-white text-black rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                  Resume Study <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Split Cards & Contact */}
            <div className="flex flex-col gap-6 h-full">
              
              {/* Row 1: Countdown & Streak (Side by Side) */}
              <div className="grid grid-cols-2 gap-4 h-1/2">
                
                {/* Countdown Card (Mini) */}
                <div className="rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-4 flex flex-col justify-center items-center text-center group hover:border-amber-500/30 transition-all shadow-xl">
                   <div className="text-3xl font-mono font-bold text-amber-400 mb-1">
                     14
                   </div>
                   <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Days Left</div>
                   <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                     <Clock className="w-3 h-3" /> In-Sem
                   </div>
                </div>

                {/* Streak Card (Mini) */}
                <div className="rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-4 flex flex-col justify-center items-center text-center group hover:border-pink-500/30 transition-all shadow-xl relative overflow-hidden">
                   <div className="flex items-center gap-1 text-3xl font-bold text-white mb-1">
                     <Flame className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" /> 4
                   </div>
                   <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Day Streak</div>
                   <div className="text-xs text-slate-400 mt-1">Top 5%</div>
                </div>
              </div>

              {/* Row 2: Contact & Query Section (Bottom Half) */}
              <div className="h-1/2 rounded-3xl border border-white/10 bg-[#0f0c29]/40 backdrop-blur-xl p-5 flex flex-col justify-between group hover:border-blue-500/30 transition-all shadow-xl">
                 <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white text-sm flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-400" /> Need Help?
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Facing issues with notes or login?
                      </p>
                    </div>
                 </div>

                 <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="flex gap-2">
                      <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Email Support">
                        <Mail className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Call Helpline">
                        <Phone className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-pink-400 transition-colors" title="Instagram">
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                    <button className="text-xs bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1">
                      Query <MessageCircle className="w-3 h-3" />
                    </button>
                 </div>
              </div>

            </div>

            {/* Bottom Row - Full Width AI Feature */}
            <div className="md:col-span-3 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-900/20 to-[#0f0c29]/40 backdrop-blur-xl p-6 flex items-center justify-between group hover:border-indigo-500/30 transition-all shadow-xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               
               <div className="flex items-center gap-4 relative z-10">
                 <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                   <BrainCircuit className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-white flex items-center gap-2">
                     AI Question Predictor <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Beta</span>
                   </h3>
                   <p className="text-slate-400 text-sm">Generate smart predictions based on 5 years of PYQ patterns.</p>
                 </div>
               </div>
               <button className="hidden sm:flex items-center gap-2 text-indigo-300 hover:text-white transition-colors text-sm font-semibold relative z-10">
                 Try Now <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* --- SECTION 2: REPOSITORY STATS --- */}
          <div className="animate-fade-in-up delay-100">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 border-b border-white/5 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Repository Stats</h2>
                <p className="text-slate-400 text-sm mt-1">Select a branch to view detailed subject availability.</p>
              </div>
              
              {/* Year Filter Dropdown */}
              <div className="mt-4 sm:mt-0">
                <Select value={selectedYear} onValueChange={(val) => {
                  setSelectedYear(val);
                  setActiveBranch(null); // Reset detail view on year change
                }}>
                  <SelectTrigger className="w-[140px] bg-slate-900 border-white/10 text-slate-200 focus:ring-purple-500">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary Cards Grid: CHANGED TO 3 COLUMNS & UPDATED COLORS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* First Year Card - Added explicit bgClass */}
              <RepoSummaryCard 
                title="First Year" 
                subtitle="10 SUBJECTS"
                progress={getBranchProgress("First Year")} 
                colorClass="text-cyan-400"
                bgClass="bg-cyan-400"
                isActive={activeBranch === "First Year"}
                onClick={() => setActiveBranch(activeBranch === "First Year" ? null : "First Year")}
              />
              
              {/* Branch Cards */}
              {Object.keys(branchSubjectsData).map((branch, index) => {
                // Extended Color Palette with explicit text and bg classes to prevent Tailwind purging
                const colorVariants = [
                    { text: "text-purple-400", bg: "bg-purple-400" },  // Computer
                    { text: "text-pink-400",   bg: "bg-pink-400" },    // IT
                    { text: "text-amber-400",  bg: "bg-amber-400" },   // EnTC
                    { text: "text-emerald-400", bg: "bg-emerald-400" }, // AI & DS
                    { text: "text-sky-400",    bg: "bg-sky-400" }      // E&CE
                ];
                
                const variant = colorVariants[index % colorVariants.length];
                const subjectCount = branchSubjectsData[branch][selectedYear]?.length || 0;
                
                return (
                  <RepoSummaryCard 
                    key={branch}
                    title={branch.split(" ")[0]} 
                    subtitle={`${subjectCount} Subjects`}
                    progress={getBranchProgress(branch)}
                    colorClass={variant.text}
                    bgClass={variant.bg}
                    isActive={activeBranch === branch}
                    onClick={() => setActiveBranch(activeBranch === branch ? null : branch)}
                  />
                )
              })}
            </div>

            {/* --- EXPANDABLE DETAIL VIEW --- */}
            {activeBranch && (
              <div className="mt-6 animate-in slide-in-from-top-4 fade-in duration-300">
                <div className="rounded-2xl bg-[#0f0c29]/60 border border-purple-500/20 backdrop-blur-xl p-6 relative">
                  <button 
                    onClick={() => setActiveBranch(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {activeBranch === "First Year" ? "First Year Common" : `${activeBranch} Engineering`}
                      <span className="text-sm font-normal text-slate-500 bg-white/5 px-3 py-1 rounded-full">{selectedYear}</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeBranch === "First Year" 
                      ? firstYearSubjects.map((sub) => (
                          <SubjectProgressItem key={sub.name} {...sub} />
                        ))
                      : (branchSubjectsData[activeBranch]?.[selectedYear] || []).map((sub: any) => (
                          <SubjectProgressItem key={sub.name} {...sub} />
                        ))
                    }
                    {/* Empty State Check */}
                    {(activeBranch !== "First Year" && (!branchSubjectsData[activeBranch]?.[selectedYear] || branchSubjectsData[activeBranch]?.[selectedYear].length === 0)) && (
                      <div className="col-span-full text-center py-10 text-slate-500 italic flex flex-col items-center">
                        <BookOpen className="w-8 h-8 mb-2 opacity-50" />
                        No subjects data found for {selectedYear}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;