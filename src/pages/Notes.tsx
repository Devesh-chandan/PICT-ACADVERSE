import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Download, 
  Eye, 
  BookmarkPlus,
  Star,
  Upload,
  BookOpen,
  FileText,
  User,
  Calendar
} from "lucide-react";

const subjects = ["All", "DSA", "DBMS", "OS", "CN", "TOC", "SE", "AI"];

const notesData = [
  {
    id: 1,
    title: "Complete DSA Notes - All Modules",
    subject: "DSA",
    author: "Rahul Mehta",
    rating: 4.9,
    reviews: 156,
    downloads: 2345,
    pages: 120,
    uploadDate: "Nov 15, 2024",
    preview: "Comprehensive notes covering arrays, linked lists, trees, graphs, sorting, and more.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    title: "DBMS One-Shot Revision Notes",
    subject: "DBMS",
    author: "Priya Sharma",
    rating: 4.8,
    reviews: 124,
    downloads: 1890,
    pages: 85,
    uploadDate: "Nov 10, 2024",
    preview: "Quick revision notes for ER diagrams, normalization, SQL queries, and transactions.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "Operating Systems - Important Topics",
    subject: "OS",
    author: "Amit Kumar",
    rating: 4.7,
    reviews: 98,
    downloads: 1567,
    pages: 95,
    uploadDate: "Nov 8, 2024",
    preview: "Process management, memory management, file systems, and deadlocks explained.",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 4,
    title: "Computer Networks Handwritten Notes",
    subject: "CN",
    author: "Sneha Patel",
    rating: 4.6,
    reviews: 87,
    downloads: 1234,
    pages: 110,
    uploadDate: "Nov 5, 2024",
    preview: "Detailed handwritten notes covering OSI, TCP/IP, routing, and security protocols.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "TOC - Automata & Languages",
    subject: "TOC",
    author: "Vikram Singh",
    rating: 4.5,
    reviews: 76,
    downloads: 987,
    pages: 75,
    uploadDate: "Nov 1, 2024",
    preview: "DFA, NFA, CFG, PDA, and Turing machines with solved examples.",
    color: "from-rose-500 to-red-500",
  },
  {
    id: 6,
    title: "Software Engineering Complete Guide",
    subject: "SE",
    author: "Neha Gupta",
    rating: 4.4,
    reviews: 65,
    downloads: 876,
    pages: 90,
    uploadDate: "Oct 28, 2024",
    preview: "SDLC models, UML diagrams, testing strategies, and project management concepts.",
    color: "from-cyan-500 to-sky-500",
  },
];

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filteredNotes = notesData.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <Badge variant="glass" className="mb-4">
                <BookOpen className="w-3 h-3 mr-1" />
                Notes Vault
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Student <span className="gradient-text">Notes</span>
              </h1>
              <p className="text-muted-foreground">
                Curated notes from top-performing students
              </p>
            </div>
            <Button variant="warm" className="mt-4 md:mt-0">
              <Upload className="w-4 h-4 mr-2" />
              Upload Notes
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <Button
                    key={subject}
                    variant={selectedSubject === subject ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <Card 
                key={note.id} 
                variant="interactive"
                className="group animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Preview Banner */}
                <div className={`h-32 bg-gradient-to-br ${note.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-white/50" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="glass" className="bg-white/20 text-white border-white/30">
                      {note.pages} pages
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {note.title}
                  </h3>

                  {/* Preview Text */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {note.preview}
                  </p>

                  {/* Author & Date */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {note.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {note.uploadDate}
                    </span>
                  </div>

                  {/* Rating & Downloads */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{note.rating}</span>
                      <span className="text-muted-foreground text-sm">({note.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Download className="w-4 h-4" />
                      {note.downloads.toLocaleString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="default" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="icon">
                      <BookmarkPlus className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
