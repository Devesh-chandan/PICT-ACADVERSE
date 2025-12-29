import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BookOpen, 
  Sparkles, 
  FlaskConical, 
  MessageSquare, 
  Bell,
  Download,
  Brain,
  Code,
  Users
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "PYQ Repository",
    description: "Access 2500+ previous year questions organized by subject, module, and difficulty level.",
    badge: "Most Popular",
    badgeVariant: "gradient" as const,
    highlights: ["Filter by year & module", "Difficulty ratings", "Download PDFs"],
  },
  {
    icon: BookOpen,
    title: "Notes Vault",
    description: "Curated study notes uploaded by top-performing students with peer ratings.",
    badge: "Student Rated",
    badgeVariant: "accent" as const,
    highlights: ["PDF previews", "Rating system", "Bookmarks"],
  },
  {
    icon: Sparkles,
    title: "AI Predictions",
    description: "Smart question predictions based on pattern analysis and previous exam trends.",
    badge: "AI Powered",
    badgeVariant: "info" as const,
    highlights: ["98% accuracy", "Confidence scores", "Topic analysis"],
  },
  // {
  //   icon: FlaskConical,
  //   title: "Lab & Viva Bank",
  //   description: "Complete lab experiment codes with expected viva questions and model answers.",
  //   badge: "Practical Ready",
  //   badgeVariant: "success" as const,
  //   highlights: ["Code snippets", "Output screenshots", "Viva prep"],
  // },
  {
    icon: MessageSquare,
    title: "Discussion Forum",
    description: "Connect with peers, ask doubts, and share knowledge in topic-specific threads.",
    badge: "Community",
    badgeVariant: "warning" as const,
    highlights: ["Anonymous mode", "Upvoting", "Expert answers"],
  },
  {
    icon: Bell,
    title: "Exam Updates",
    description: "Real-time notifications for circulars, exam schedules, and important announcements.",
    badge: "Stay Updated",
    badgeVariant: "secondary" as const,
    highlights: ["Push notifications", "Calendar sync", "Download circulars"],
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="gradient-text"> Ace Your Exams</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From previous year questions to AI predictions, we've got all the tools to help you succeed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="interactive"
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
