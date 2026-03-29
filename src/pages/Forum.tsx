import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  ThumbsUp, 
  MessageCircle,
  Clock,
  User,
  Plus,
  TrendingUp,
  Filter
} from "lucide-react";

const categories = ["All", "DSA", "DBMS", "OS", "CN", "Placements", "General"];

const threads = [
  {
    id: 1,
    title: "How to approach Dynamic Programming problems?",
    content: "I'm struggling with DP. Can someone share their approach to identify and solve DP problems efficiently?",
    author: "Anonymous",
    category: "DSA",
    upvotes: 124,
    replies: 23,
    time: "2 hours ago",
    isHot: true,
  },
  {
    id: 2,
    title: "Best resources for DBMS normalization?",
    content: "Need good resources to understand normalization concepts. Any recommendations?",
    author: "Rahul M.",
    category: "DBMS",
    upvotes: 89,
    replies: 15,
    time: "5 hours ago",
    isHot: false,
  },
  {
    id: 3,
    title: "OS Lab viva questions compilation",
    content: "Sharing my compiled list of OS lab viva questions that were asked in recent batches.",
    author: "Priya S.",
    category: "OS",
    upvotes: 156,
    replies: 31,
    time: "1 day ago",
    isHot: true,
  },
  {
    id: 4,
    title: "Placement preparation roadmap for 2025",
    content: "Can seniors share their placement prep strategy? Which topics to focus on?",
    author: "Anonymous",
    category: "Placements",
    upvotes: 234,
    replies: 45,
    time: "2 days ago",
    isHot: true,
  },
  {
    id: 5,
    title: "Doubt in CN subnetting problem",
    content: "Can someone explain how to solve VLSM problems? Attached screenshot of question.",
    author: "Amit K.",
    category: "CN",
    upvotes: 45,
    replies: 12,
    time: "3 days ago",
    isHot: false,
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    DSA: "bg-blue-500",
    DBMS: "bg-emerald-500",
    OS: "bg-orange-500",
    CN: "bg-purple-500",
    Placements: "bg-amber-500",
    General: "bg-gray-500",
  };
  return colors[category] || "bg-gray-500";
};

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredThreads = threads.filter(
    (thread) => selectedCategory === "All" || thread.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <Badge variant="glass" className="mb-4">
                <MessageSquare className="w-3 h-3 mr-1" />
                Community
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Discussion <span className="gradient-text">Forum</span>
              </h1>
              <p className="text-muted-foreground">
                Ask questions, share knowledge, help others
              </p>
            </div>
            <Button variant="gradient" className="mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              New Thread
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-medium">{filteredThreads.length} threads</span>
              </span>
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Sort by
            </Button>
          </div>

          {/* Threads List */}
          <div className="space-y-4">
            {filteredThreads.map((thread, index) => (
              <Card 
                key={thread.id} 
                variant="interactive"
                className="animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    {/* Upvotes */}
                    <div className="flex flex-col items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold text-sm">{thread.upvotes}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge className={`${getCategoryColor(thread.category)} text-white`}>
                          {thread.category}
                        </Badge>
                        {thread.isHot && (
                          <Badge variant="destructive">🔥 Hot</Badge>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer">
                        {thread.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {thread.content}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {thread.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {thread.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {thread.replies} replies
                        </span>
                      </div>
                    </div>
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

export default Forum;
