// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { TrendingUp, ArrowRight, Eye, Download, Star } from "lucide-react";

// const trendingSubjects = [
//   { 
//     name: "Data Structures & Algorithms", 
//     code: "DSA", 
//     papers: 45, 
//     views: "12.5K",
//     trending: true,
//     color: "from-blue-500 to-indigo-500"
//   },
//   { 
//     name: "Database Management Systems", 
//     code: "DBMS", 
//     papers: 38, 
//     views: "9.8K",
//     trending: true,
//     color: "from-emerald-500 to-teal-500"
//   },
//   { 
//     name: "Operating Systems", 
//     code: "OS", 
//     papers: 42, 
//     views: "8.2K",
//     trending: false,
//     color: "from-orange-500 to-amber-500"
//   },
//   { 
//     name: "Computer Networks", 
//     code: "CN", 
//     papers: 35, 
//     views: "7.5K",
//     trending: true,
//     color: "from-purple-500 to-pink-500"
//   },
// ];

// const topNotes = [
//   { title: "Complete DSA Notes", author: "Rahul M.", rating: 4.9, downloads: "2.3K" },
//   { title: "DBMS One-Shot Notes", author: "Priya S.", rating: 4.8, downloads: "1.8K" },
//   { title: "OS Important Topics", author: "Amit K.", rating: 4.7, downloads: "1.5K" },
// ];

// const TrendingSection = () => {
//   return (
//     <section className="py-24">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Trending Subjects */}
//           <div>
//             <div className="flex items-center gap-2 mb-6">
//               <TrendingUp className="w-5 h-5 text-primary" />
//               <h3 className="text-2xl font-bold">Trending Subjects</h3>
//             </div>
//             <div className="space-y-4">
//               {trendingSubjects.map((subject, index) => (
//                 <Card 
//                   key={subject.code} 
//                   variant="interactive"
//                   className="animate-slide-in"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white font-bold`}>
//                         {subject.code.slice(0, 2)}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <h4 className="font-semibold">{subject.name}</h4>
//                           {subject.trending && (
//                             <Badge variant="gradient" className="text-xs">Hot</Badge>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                           <span>{subject.papers} Papers</span>
//                           <span className="flex items-center gap-1">
//                             <Eye className="w-3 h-3" />
//                             {subject.views}
//                           </span>
//                         </div>
//                       </div>
//                       <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//             {/* Link removed here */}
//             <Button variant="ghost" className="mt-4 w-full">
//                 View All Subjects
//                 <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           </div>

//           {/* Top Notes This Week */}
//           <div>
//             <div className="flex items-center gap-2 mb-6">
//               <Star className="w-5 h-5 text-amber-500" />
//               <h3 className="text-2xl font-bold">Top Notes This Week</h3>
//             </div>
//             <Card variant="gradient" className="p-6">
//               <div className="space-y-4">
//                 {topNotes.map((note, index) => (
//                   <div 
//                     key={note.title}
//                     className="flex items-center justify-between p-4 bg-card rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer animate-slide-in"
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <h4 className="font-medium">{note.title}</h4>
//                         <p className="text-sm text-muted-foreground">by {note.author}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="flex items-center gap-1 text-amber-500">
//                         <Star className="w-4 h-4 fill-current" />
//                         <span className="font-medium">{note.rating}</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                         <Download className="w-3 h-3" />
//                         {note.downloads}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {/* Link removed here */}
//               <Button variant="warm" className="w-full mt-6">
//                   Explore Notes Vault
//                   <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingSection;

const TrendingSection = () => {
  return null;
};

export default TrendingSection;