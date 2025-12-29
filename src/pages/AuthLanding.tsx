import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { BookOpen, FileText, FlaskConical, Users, MessageSquare, Bell } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Plasma } from '@/components/ui/Plasma';

// Modified FeatureCard to include the exact glow effect from the Login Card
const FeatureCard = ({ icon, title, description, color }: { icon: JSX.Element, title: string, description: string, color: string }) => {
    
    // Map for internal Icon background colors
    const iconColorClasses: Record<string, string> = {
        primary: 'bg-primary/10 text-primary',
        accent: 'bg-accent/10 text-accent',
        success: 'bg-emerald-500/10 text-emerald-500',
        warning: 'bg-amber-500/10 text-amber-500',
        destructive: 'bg-destructive/10 text-destructive',
        secondary: 'bg-secondary/50 text-secondary-foreground'
    };

    return (
        <div className="relative group hover:-translate-y-1 transition-all duration-300">
            {/* Glow Effect Layer - Matches Login Card Exactly */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 dark:opacity-50 transition duration-500 group-hover:opacity-70 group-hover:blur-md"></div>
            
            {/* Main Card Content */}
            <div className="relative h-full p-8 rounded-2xl border border-white/50 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg hover:shadow-xl transition-all">
                <div className={`w-16 h-16 rounded-xl ${iconColorClasses[color]} flex items-center justify-center mb-6`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

const AuthLanding = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        branch: '',
        year: 1
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // --- PLACEHOLDER AUTH LOGIC ---
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            if (formData.email.includes("fail")) {
                 throw new Error("Invalid credentials or user already exists.");
            }

            toast.success(isLogin ? 'Login successful! Redirecting to Home.' : 'Registration successful! Please log in.');
            
            if (isLogin) {
                 window.location.href = "/home"; 
            } else {
                setIsLogin(true);
            }
        } catch (error: any) {
            toast.error(error.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
        // --- END PLACEHOLDER AUTH LOGIC ---
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: name === 'year' ? parseInt(value) : value }));
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden font-sans">
            {/* --- FIXED BACKGROUND --- */}
            <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50 dark:bg-gray-950">
                <div className="absolute inset-0">
                     <Plasma 
                        color="#4f46e5" 
                        speed={1.5}
                        scale={1.2}
                        opacity={0.6}
                     />
                </div>
            </div>
            
            <Navbar /> 
            
            <section className="relative pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-fade-in">
                            
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-tight drop-shadow-sm">
                                Your Academic
                                <span className="block text-primary">Universe</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                                One-stop platform for PYQs, Notes, Lab Codes, Viva Questions, and more. Built by students, for students.
                            </p>
                        </div>

                        {/* --- AUTH CARD SECTION --- */}
                        <div className="animate-slide-in relative group">
                            {/* Decorative Glow Layer - Restored */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 dark:opacity-50 transition duration-500 group-hover:opacity-70 group-hover:blur-md"></div>
                            
                            <Card className="relative shadow-2xl border-white/50 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10">
                                <CardHeader className="space-y-2 pb-6">
                                    <CardTitle className="text-3xl font-bold tracking-tight text-center">{isLogin ? 'Welcome Back' : 'Join PICT Hub'}</CardTitle>
                                    <CardDescription className="text-center text-base">
                                        {isLogin ? 'Sign in to access your resources' : 'Create your account to get started'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
                                        <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-gray-100/80 dark:bg-gray-800/80">
                                            <TabsTrigger value="login" className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Login</TabsTrigger>
                                            <TabsTrigger value="register" className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Register</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="login">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="your.email@pict.edu"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                <Button type="submit" className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all" disabled={loading} variant="default">
                                                    {loading ? 'Signing in...' : 'Sign In'}
                                                </Button>
                                            </form>
                                        </TabsContent>
                                        <TabsContent value="register">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        placeholder="John Doe"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="reg-email">Email</Label>
                                                    <Input
                                                        id="reg-email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="your.email@pict.edu"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="reg-password">Password</Label>
                                                    <Input
                                                        id="reg-password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="branch">Branch</Label>
                                                        <Select name="branch" value={formData.branch} onValueChange={(v) => handleSelectChange('branch', v)}>
                                                            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="CSE">CSE</SelectItem>
                                                                <SelectItem value="IT">IT</SelectItem>
                                                                <SelectItem value="ECE">ECE</SelectItem>
                                                                <SelectItem value="MECH">MECH</SelectItem>
                                                                <SelectItem value="CIVIL">CIVIL</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="year">Year</Label>
                                                        <Select name="year" value={String(formData.year)} onValueChange={(v) => handleSelectChange('year', v)}>
                                                            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1">1st Year</SelectItem>
                                                                <SelectItem value="2">2nd Year</SelectItem>
                                                                <SelectItem value="3">3rd Year</SelectItem>
                                                                <SelectItem value="4">4th Year</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <Button type="submit" className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all" disabled={loading} variant="default">
                                                    {loading ? 'Creating Account...' : 'Create Account'}
                                                </Button>
                                            </form>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
                        <p className="text-xl text-muted-foreground">All academic resources in one place</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BookOpen className="w-8 h-8" />}
                            title="PYQ Repository"
                            description="Browse thousands of previous year questions filtered by subject, module, and year"
                            color="primary"
                        />
                        <FeatureCard
                            icon={<FileText className="w-8 h-8" />}
                            title="Notes Vault"
                            description="Access student-uploaded notes with ratings and easy download options"
                            color="accent"
                        />
                        <FeatureCard
                            icon={<FlaskConical className="w-8 h-8" />}
                            title="Lab Bank"
                            description="Complete lab experiments with code, output, and explanations"
                            color="success"
                        />
                        <FeatureCard
                            icon={<MessageSquare className="w-8 h-8" />}
                            title="Discussion Forum"
                            description="Ask questions, share knowledge, and connect with peers anonymously"
                            color="warning"
                        />
                        <FeatureCard
                            icon={<Users className="w-8 h-8" />}
                            title="Viva Bank"
                            description="Prepare for vivas with curated questions and detailed answers"
                            color="secondary"
                        />
                        <FeatureCard
                            icon={<Bell className="w-8 h-8" />}
                            title="Circulars"
                            description="Stay updated with latest exam schedules and important announcements"
                            color="destructive"
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AuthLanding;