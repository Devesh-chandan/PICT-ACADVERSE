import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Download, Eye, Upload, BookOpen, FileText, User, Calendar } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface PublicNote {
  _id: string;
  title: string;
  subject: string;
  author: string;
  description: string;
  pages: number;
  fileUrl: string;
  downloads: number;
  uploadedAt: string;
}

// Banner colours, picked deterministically from the subject so a subject always looks the same
const BANNER_COLORS = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-purple-500 to-pink-500",
  "from-rose-500 to-red-500",
  "from-cyan-500 to-sky-500",
];
const bannerFor = (subject: string) => {
  let hash = 0;
  for (const ch of subject) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return BANNER_COLORS[hash % BANNER_COLORS.length];
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const Notes = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const { data: notes = [], isLoading, error, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => (await api.get<PublicNote[]>("/notes")).data,
  });

  // The link opens straight away (no popup blocking); the counter is bumped in the background
  const countDownload = (id: string) => {
    api
      .post(`/notes/${id}/download`)
      .then(() => queryClient.invalidateQueries({ queryKey: ["notes"] }))
      .catch(() => undefined);
  };

  const subjects = useMemo(() => ["All", ...Array.from(new Set(notes.map((n) => n.subject))).sort()], [notes]);

  const q = searchQuery.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      q === "" ||
      note.title.toLowerCase().includes(q) ||
      note.description.toLowerCase().includes(q) ||
      note.author.toLowerCase().includes(q);
    const matchesSubject = selectedSubject === "All" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-12">
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
              <p className="text-muted-foreground">Curated notes from top-performing students</p>
            </div>
            {isAdmin && (
              <Button asChild variant="warm" className="mt-4 md:mt-0">
                <Link to="/admin/notes">
                  <Upload className="w-4 h-4 mr-2" />
                  Manage Notes
                </Link>
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  aria-label="Search notes"
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

          {/* States */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          )}

          {error && !isLoading && (
            <div className="py-16 text-center space-y-3">
              <p className="text-muted-foreground">Could not load notes. Is the server running?</p>
              <Button variant="outline" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          )}

          {!isLoading && !error && filteredNotes.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              {notes.length === 0 ? "No notes have been uploaded yet. Check back soon!" : "No notes match your search."}
            </div>
          )}

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <Card
                key={note._id}
                variant="interactive"
                className="group animate-slide-up overflow-hidden"
                style={{ animationDelay: `${Math.min(index, 8) * 0.1}s` }}
              >
                {/* Preview Banner */}
                <div className={`h-32 bg-gradient-to-br ${bannerFor(note.subject)} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-white/50" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="glass" className="bg-white/20 text-white border-white/30">
                      {note.subject}
                    </Badge>
                  </div>
                  {note.pages > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="glass" className="bg-white/20 text-white border-white/30">
                        {note.pages} pages
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{note.title}</h3>

                  {note.description && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{note.description}</p>}

                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {note.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(note.uploadedAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {note.downloads.toLocaleString()} downloads
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild variant="default" className="flex-1">
                      <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon" aria-label={`Download ${note.title}`}>
                      <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" onClick={() => countDownload(note._id)}>
                        <Download className="w-4 h-4" />
                      </a>
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
