// import { useState } from "react";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { 
//   Sparkles, 
//   Brain,
//   TrendingUp,
//   BookOpen,
//   AlertCircle,
//   ChevronRight,
//   Lightbulb
// } from "lucide-react";

// const subjects = ["DSA", "DBMS", "OS", "CN", "TOC"];

// const predictions = {
//   DSA: [
//     { question: "Explain the working of QuickSort algorithm with time complexity analysis", confidence: 95, module: 3, importance: "High" },
//     { question: "Implement and explain Dijkstra's shortest path algorithm", confidence: 88, module: 5, importance: "High" },
//     { question: "Compare BFS and DFS traversal algorithms with applications", confidence: 82, module: 4, importance: "Medium" },
//     { question: "Explain heap data structure and heapify operation", confidence: 78, module: 3, importance: "High" },
//     { question: "AVL tree rotations with insertion example", confidence: 75, module: 4, importance: "Medium" },
//   ],
//   DBMS: [
//     { question: "Explain normalization forms (1NF to BCNF) with examples", confidence: 92, module: 2, importance: "High" },
//     { question: "Write SQL queries for complex join operations", confidence: 87, module: 3, importance: "High" },
//     { question: "Explain ACID properties with transaction examples", confidence: 83, module: 4, importance: "Medium" },
//     { question: "ER diagram to relational schema conversion", confidence: 79, module: 1, importance: "High" },
//     { question: "Indexing techniques and B+ tree structure", confidence: 74, module: 5, importance: "Medium" },
//   ],
//   OS: [
//     { question: "Compare CPU scheduling algorithms with examples", confidence: 90, module: 2, importance: "High" },
//     { question: "Explain deadlock detection and prevention methods", confidence: 85, module: 3, importance: "High" },
//     { question: "Virtual memory and page replacement algorithms", confidence: 81, module: 4, importance: "Medium" },
//     { question: "Process synchronization using semaphores", confidence: 77, module: 3, importance: "High" },
//     { question: "File allocation methods comparison", confidence: 72, module: 5, importance: "Medium" },
//   ],
//   CN: [
//     { question: "Explain OSI model layers with protocols", confidence: 94, module: 1, importance: "High" },
//     { question: "TCP vs UDP comparison with use cases", confidence: 89, module: 3, importance: "High" },
//     { question: "IP addressing and subnetting problems", confidence: 84, module: 2, importance: "High" },
//     { question: "Routing algorithms: Distance Vector vs Link State", confidence: 80, module: 4, importance: "Medium" },
//     { question: "Network security protocols and encryption", confidence: 76, module: 5, importance: "Medium" },
//   ],
//   TOC: [
//     { question: "Design DFA/NFA for given language patterns", confidence: 91, module: 1, importance: "High" },
//     { question: "Convert NFA to DFA with example", confidence: 86, module: 2, importance: "High" },
//     { question: "Context-free grammar and derivation trees", confidence: 82, module: 3, importance: "Medium" },
//     { question: "Pushdown automata construction", confidence: 78, module: 4, importance: "Medium" },
//     { question: "Turing machine design for simple computations", confidence: 73, module: 5, importance: "Medium" },
//   ],
// };

// const getConfidenceColor = (confidence: number) => {
//   if (confidence >= 90) return "text-emerald-500";
//   if (confidence >= 80) return "text-amber-500";
//   return "text-orange-500";
// };

// const getConfidenceBg = (confidence: number) => {
//   if (confidence >= 90) return "bg-emerald-500";
//   if (confidence >= 80) return "bg-amber-500";
//   return "bg-orange-500";
// };

// const Predict = () => {
//   const [selectedSubject, setSelectedSubject] = useState("DSA");

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="pt-20 pb-12">
//         <div className="container mx-auto px-4">
//           {/* Header */}
//           <div className="mb-8">
//             <Badge variant="gradient" className="mb-4">
//               <Sparkles className="w-3 h-3 mr-1" />
//               AI Powered
//             </Badge>
//             <h1 className="text-3xl md:text-4xl font-bold mb-2">
//               Predicted <span className="gradient-text">Questions</span>
//             </h1>
//             <p className="text-muted-foreground max-w-2xl">
//               Our AI analyzes patterns from 5+ years of previous papers to predict likely questions for upcoming exams.
//             </p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//             <Card variant="accent">
//               <CardContent className="p-4 flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
//                   <Brain className="w-6 h-6 text-accent" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">98%</p>
//                   <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card variant="primary">
//               <CardContent className="p-4 flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
//                   <TrendingUp className="w-6 h-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">2500+</p>
//                   <p className="text-sm text-muted-foreground">Papers Analyzed</p>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-4 flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
//                   <Lightbulb className="w-6 h-6 text-amber-500" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">150+</p>
//                   <p className="text-sm text-muted-foreground">Predictions Made</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Subject Tabs */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {subjects.map((subject) => (
//               <Button
//                 key={subject}
//                 variant={selectedSubject === subject ? "gradient" : "outline"}
//                 onClick={() => setSelectedSubject(subject)}
//               >
//                 {subject}
//               </Button>
//             ))}
//           </div>

//           {/* Predictions List */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Sparkles className="w-5 h-5 text-primary" />
//                 {selectedSubject} Predictions for Mid-Sem 2024
//               </CardTitle>
//               <CardDescription>
//                 Based on analysis of previous 5 years' question patterns
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {predictions[selectedSubject as keyof typeof predictions].map((prediction, index) => (
//                 <div 
//                   key={index}
//                   className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors animate-slide-in"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <div className="flex flex-col md:flex-row md:items-start gap-4">
//                     {/* Confidence Meter */}
//                     <div className="flex-shrink-0">
//                       <div className="relative w-16 h-16">
//                         <svg className="w-16 h-16 transform -rotate-90">
//                           <circle
//                             cx="32"
//                             cy="32"
//                             r="28"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                             fill="transparent"
//                             className="text-muted"
//                           />
//                           <circle
//                             cx="32"
//                             cy="32"
//                             r="28"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                             fill="transparent"
//                             strokeDasharray={175.93}
//                             strokeDashoffset={175.93 * (1 - prediction.confidence / 100)}
//                             className={getConfidenceColor(prediction.confidence)}
//                           />
//                         </svg>
//                         <span className={`absolute inset-0 flex items-center justify-center font-bold ${getConfidenceColor(prediction.confidence)}`}>
//                           {prediction.confidence}%
//                         </span>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="flex-1">
//                       <div className="flex flex-wrap items-center gap-2 mb-2">
//                         <Badge variant={prediction.importance === "High" ? "destructive" : "warning"}>
//                           {prediction.importance} Priority
//                         </Badge>
//                         <Badge variant="outline">Module {prediction.module}</Badge>
//                       </div>
//                       <p className="font-medium">{prediction.question}</p>
//                     </div>

//                     {/* Action */}
//                     <Button variant="ghost" size="icon" className="flex-shrink-0">
//                       <ChevronRight className="w-5 h-5" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Disclaimer */}
//           <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="text-sm text-muted-foreground">
//                 <span className="font-medium text-foreground">Disclaimer:</span> These predictions are based on historical data analysis and pattern recognition. 
//                 They should be used as a study guide alongside comprehensive preparation. Actual exam questions may vary.
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Predict;
