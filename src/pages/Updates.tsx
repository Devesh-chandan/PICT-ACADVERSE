// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { 
//   Bell, 
//   Calendar,
//   Download,
//   ExternalLink,
//   AlertTriangle,
//   Info,
//   CheckCircle,
//   Clock
// } from "lucide-react";

// const updates = [
//   {
//     id: 1,
//     title: "Mid-Sem Examination Schedule - December 2024",
//     description: "The mid-semester examination schedule for SE, TE, and BE has been released. Download the timetable below.",
//     type: "exam",
//     date: "Dec 1, 2024",
//     isNew: true,
//     hasAttachment: true,
//   },
//   {
//     id: 2,
//     title: "Holiday Notice - Constitution Day",
//     description: "College will remain closed on November 26, 2024 on account of Constitution Day.",
//     type: "holiday",
//     date: "Nov 24, 2024",
//     isNew: false,
//     hasAttachment: false,
//   },
//   {
//     id: 3,
//     title: "Lab External Examination - DSA Lab",
//     description: "DSA Lab external examination for TE Computer batch A will be conducted on December 5, 2024.",
//     type: "exam",
//     date: "Nov 22, 2024",
//     isNew: false,
//     hasAttachment: true,
//   },
//   {
//     id: 4,
//     title: "Placement Drive - TCS Digital",
//     description: "TCS Digital recruitment drive scheduled for December 10, 2024. Eligible students must register by December 5.",
//     type: "placement",
//     date: "Nov 20, 2024",
//     isNew: false,
//     hasAttachment: true,
//   },
//   {
//     id: 5,
//     title: "Syllabus Revision Notice",
//     description: "Minor revisions in Operating Systems syllabus for Module 4 & 5. Updated syllabus available for download.",
//     type: "academic",
//     date: "Nov 18, 2024",
//     isNew: false,
//     hasAttachment: true,
//   },
// ];

// const getTypeIcon = (type: string) => {
//   switch (type) {
//     case "exam": return AlertTriangle;
//     case "holiday": return CheckCircle;
//     case "placement": return Info;
//     default: return Bell;
//   }
// };

// const getTypeColor = (type: string) => {
//   switch (type) {
//     case "exam": return "text-amber-500 bg-amber-500/10";
//     case "holiday": return "text-emerald-500 bg-emerald-500/10";
//     case "placement": return "text-blue-500 bg-blue-500/10";
//     default: return "text-primary bg-primary/10";
//   }
// };

// const getTypeBadge = (type: string) => {
//   switch (type) {
//     case "exam": return "warning";
//     case "holiday": return "success";
//     case "placement": return "info";
//     default: return "secondary";
//   }
// };

// const Updates = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="pt-20 pb-12">
//         <div className="container mx-auto px-4">
//           {/* Header */}
//           <div className="mb-8">
//             <Badge variant="glass" className="mb-4">
//               <Bell className="w-3 h-3 mr-1" />
//               Updates
//             </Badge>
//             <h1 className="text-3xl md:text-4xl font-bold mb-2">
//               Circulars & <span className="gradient-text">Announcements</span>
//             </h1>
//             <p className="text-muted-foreground">
//               Stay updated with the latest notices and exam schedules
//             </p>
//           </div>

//           {/* Quick Filters */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             <Button variant="default" size="sm">All</Button>
//             <Button variant="outline" size="sm">Exams</Button>
//             <Button variant="outline" size="sm">Holidays</Button>
//             <Button variant="outline" size="sm">Placements</Button>
//             <Button variant="outline" size="sm">Academic</Button>
//           </div>

//           {/* Updates List */}
//           <div className="space-y-4">
//             {updates.map((update, index) => {
//               const Icon = getTypeIcon(update.type);
//               const colorClass = getTypeColor(update.type);
              
//               return (
//                 <Card 
//                   key={update.id}
//                   variant="interactive"
//                   className="animate-slide-in"
//                   style={{ animationDelay: `${index * 0.05}s` }}
//                 >
//                   <CardContent className="p-5">
//                     <div className="flex gap-4">
//                       {/* Icon */}
//                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
//                         <Icon className="w-6 h-6" />
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1">
//                         <div className="flex flex-wrap items-center gap-2 mb-2">
//                           <Badge variant={getTypeBadge(update.type) as any}>
//                             {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
//                           </Badge>
//                           {update.isNew && (
//                             <Badge variant="gradient">New</Badge>
//                           )}
//                         </div>

//                         <h3 className="font-semibold text-lg mb-2">{update.title}</h3>
//                         <p className="text-muted-foreground text-sm mb-3">
//                           {update.description}
//                         </p>

//                         <div className="flex flex-wrap items-center justify-between gap-4">
//                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                             <Calendar className="w-4 h-4" />
//                             {update.date}
//                           </div>

//                           {update.hasAttachment && (
//                             <div className="flex gap-2">
//                               <Button variant="outline" size="sm">
//                                 <Download className="w-4 h-4 mr-2" />
//                                 Download
//                               </Button>
//                               <Button variant="ghost" size="sm">
//                                 <ExternalLink className="w-4 h-4 mr-2" />
//                                 View
//                               </Button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Subscribe Card */}
//           <Card variant="gradient" className="mt-8">
//             <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
//                   <Bell className="w-6 h-6 text-primary" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">Never Miss an Update</h3>
//                   <p className="text-sm text-muted-foreground">Get notified about important circulars via email</p>
//                 </div>
//               </div>
//               <Button variant="default">
//                 Subscribe to Updates
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Updates;



import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar"; // Assuming you have these
import Footer from "@/components/layout/Footer"; // Assuming you have these
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Calendar,
  Download,
  ExternalLink,
  AlertTriangle,
  FileText,
  Sparkles,
  Search,
  Filter,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShootingStars } from "@/components/ui/shooting-stars"; // Assuming you have this from Hero

// ==========================================
// MOCK DATA
// ==========================================
const updates = [
  {
    id: 1,
    title: "Mid-Sem Examination Schedule - Dec 2024",
    description: "The mid-semester examination schedule for SE, TE, and BE has been released.",
    type: "exam",
    date: "Dec 1, 2024",
    isNew: true,
    hasAttachment: true,
  },
  {
    id: 2,
    title: "New PYQs Added: CMOS Design (2023)",
    description: "Uploaded solved papers for CMOS Design for TE E&TC.",
    type: "upload",
    date: "Nov 28, 2024",
    isNew: true,
    hasAttachment: true,
  },
  {
    id: 3,
    title: "Holiday Notice - Constitution Day",
    description: "College will remain closed on November 26, 2024.",
    type: "platform",
    date: "Nov 24, 2024",
    isNew: false,
    hasAttachment: false,
  },
  {
    id: 4,
    title: "DSA Lab External Examination",
    description: "DSA Lab external exam for TE Computer Batch A.",
    type: "exam",
    date: "Nov 22, 2024",
    isNew: false,
    hasAttachment: true,
  },
  {
    id: 5,
    title: "Placement Drive - TCS Digital",
    description: "TCS Digital recruitment drive scheduled for Dec 10.",
    type: "platform",
    date: "Nov 20, 2024",
    isNew: false,
    hasAttachment: true,
  },
];

// ==========================================
// HELPER: Shiny Text (Simplified for this page)
// ==========================================
const ShinyText = ({ text }: { text: string }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/80 via-white to-white/60 font-medium animate-shine bg-[length:200%_100%]">
    {text}
  </span>
);

// ==========================================
// COMPONENT: Update Card
// ==========================================
const UpdateCard = ({ update, index }: { update: any; index: number }) => {
  const getIcon = () => {
    switch (update.type) {
      case "exam": return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case "upload": return <FileText className="w-5 h-5 text-[#00ddeb]" />;
      default: return <Sparkles className="w-5 h-5 text-[#af40ff]" />;
    }
  };

  const getGlow = () => {
    switch (update.type) {
      case "exam": return "group-hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.3)]";
      case "upload": return "group-hover:shadow-[0_0_30px_-5px_rgba(0,221,235,0.3)]";
      default: return "group-hover:shadow-[0_0_30px_-5px_rgba(175,64,255,0.3)]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative p-6 rounded-2xl bg-[#0f0f10] border border-white/5 hover:border-white/10 transition-all duration-300 ${getGlow()}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          {/* Icon Box */}
          <div className="relative w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300">
            {getIcon()}
          </div>

          {/* Content */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               {update.isNew && (
                <span className="px-2 py-0.5 rounded-full bg-[#00ddeb]/10 text-[#00ddeb] text-[10px] font-bold uppercase tracking-wider border border-[#00ddeb]/20">
                  New
                </span>
              )}
              <span className="text-xs text-white/40 font-mono tracking-wide">{update.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-[#00ddeb] transition-colors">
              {update.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed max-w-xl">
              {update.description}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2">
           {update.hasAttachment ? (
             <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10">
               <Download className="w-5 h-5" />
             </Button>
           ) : (
             <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10">
               <ExternalLink className="w-5 h-5" />
             </Button>
           )}
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENT: Feature Grid Item
// ==========================================
const FeatureGridItem = ({ icon: Icon, title, subtitle, colorClass, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="relative group p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass} opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity`} />
    
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
        <Icon className={`w-6 h-6 text-${colorClass}`} />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/60">{subtitle}</p>
      </div>
    </div>
  </motion.div>
);

// ==========================================
// MAIN PAGE
// ==========================================
const UpdatesPage = () => {
  const [filter, setFilter] = useState("all");

  const filteredUpdates = filter === "all" 
    ? updates 
    : updates.filter(u => u.type === filter);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00ddeb]/30 overflow-x-hidden">
      <style>{`
        .stars-static {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.2;
        }
      `}</style>
      
      {/* BACKGROUND LAYERS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_100%)]" />
        <div className="stars-static absolute inset-0" />
        <ShootingStars starColor="#00ddeb" trailColor="#2EB9DF" minDelay={2000} maxDelay={5000} />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* HEADER SECTION */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#00ddeb] mb-6 backdrop-blur-md"
            >
              <Bell className="w-3 h-3" />
              <span>Live Circulars & Notices</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Never Miss an Exam or <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ddeb] via-[#5b42f3] to-[#af40ff]">
                a New Paper.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto"
            >
              Stay informed with real-time exam updates, new PYQ uploads, and important platform announcements—so you’re always a step ahead.
            </motion.p>
          </div>

          {/* GRID FEATURES (As Requested) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <FeatureGridItem 
              icon={Calendar}
              title="Exam Notifications"
              subtitle="Timetables, seat numbers, and hall ticket alerts sent directly to you."
              colorClass="amber-400" // Tailwind color ref
              delay={0.2}
            />
            <FeatureGridItem 
              icon={FileText}
              title="New Upload Alerts"
              subtitle="Instant notification when new PYQs or notes for your branch are added."
              colorClass="[#00ddeb]" // Custom cyan
              delay={0.3}
            />
             <FeatureGridItem 
              icon={Sparkles}
              title="Platform Updates"
              subtitle="New features, bug fixes, and improvements to the PICT-ACADVERSE vault."
              colorClass="[#af40ff]" // Custom purple
              delay={0.4}
            />
          </div>

          {/* FILTERS & SEARCH */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 sticky top-20 z-20 py-4 bg-black/50 backdrop-blur-xl border-y border-white/5 -mx-6 px-6 md:mx-0 md:rounded-2xl md:border md:px-6">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              {['all', 'exam', 'upload', 'platform'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    filter === type 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-white/50 border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search circulars..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#00ddeb]/50 transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          {/* UPDATES LIST */}
          <div className="space-y-4 min-h-[400px]">
            <AnimatePresence mode="wait">
              {filteredUpdates.length > 0 ? (
                filteredUpdates.map((update, index) => (
                  <UpdateCard key={update.id} update={update} index={index} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-white/30"
                >
                  <Filter className="w-12 h-12 mb-4 opacity-50" />
                  <p>No updates found for this category.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SUBSCRIBE CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 relative rounded-3xl overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ddeb]/10 via-[#5b42f3]/10 to-[#af40ff]/10" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Want updates in your inbox?</h2>
                <p className="text-white/60">Subscribe to our newsletter and never miss a critical notice.</p>
              </div>
              <div className="flex gap-4">
                 <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 h-12 font-medium transition-transform active:scale-95">
                    Subscribe Now
                 </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpdatesPage;