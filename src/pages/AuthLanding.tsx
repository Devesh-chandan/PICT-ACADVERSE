// // import { useState } from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { toast } from 'sonner';
// // import { BookOpen, FileText, FlaskConical, Users, MessageSquare, Bell } from 'lucide-react';
// // import Navbar from '@/components/layout/Navbar';
// // import Footer from '@/components/layout/Footer';
// // import { Plasma } from '@/components/ui/Plasma';

// // // Modified FeatureCard to include the exact glow effect from the Login Card
// // const FeatureCard = ({ icon, title, description, color }: { icon: JSX.Element, title: string, description: string, color: string }) => {

// //     // Map for internal Icon background colors
// //     const iconColorClasses: Record<string, string> = {
// //         primary: 'bg-primary/10 text-primary',
// //         accent: 'bg-accent/10 text-accent',
// //         success: 'bg-emerald-500/10 text-emerald-500',
// //         warning: 'bg-amber-500/10 text-amber-500',
// //         destructive: 'bg-destructive/10 text-destructive',
// //         secondary: 'bg-secondary/50 text-secondary-foreground'
// //     };

// //     return (
// //         <div className="relative group hover:-translate-y-1 transition-all duration-300">
// //             {/* Glow Effect Layer - Matches Login Card Exactly */}
// //             <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 dark:opacity-50 transition duration-500 group-hover:opacity-70 group-hover:blur-md"></div>

// //             {/* Main Card Content */}
// //             <div className="relative h-full p-8 rounded-2xl border border-white/50 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg hover:shadow-xl transition-all">
// //                 <div className={`w-16 h-16 rounded-xl ${iconColorClasses[color]} flex items-center justify-center mb-6`}>
// //                     {icon}
// //                 </div>
// //                 <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
// //                 <p className="text-muted-foreground leading-relaxed">{description}</p>
// //             </div>
// //         </div>
// //     );
// // };

// // const AuthLanding = () => {
// //     const [isLogin, setIsLogin] = useState(true);
// //     const [formData, setFormData] = useState({
// //         name: '',
// //         email: '',
// //         password: '',
// //         branch: '',
// //         year: 1
// //     });
// //     const [loading, setLoading] = useState(false);

// //     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //         e.preventDefault();
// //         setLoading(true);

// //         // --- PLACEHOLDER AUTH LOGIC ---
// //         try {
// //             await new Promise(resolve => setTimeout(resolve, 1500)); 

// //             if (formData.email.includes("fail")) {
// //                  throw new Error("Invalid credentials or user already exists.");
// //             }

// //             toast.success(isLogin ? 'Login successful! Redirecting to Home.' : 'Registration successful! Please log in.');

// //             if (isLogin) {
// //                  window.location.href = "/home"; 
// //             } else {
// //                 setIsLogin(true);
// //             }
// //         } catch (error: any) {
// //             toast.error(error.message || 'Authentication failed. Please try again.');
// //         } finally {
// //             setLoading(false);
// //         }
// //         // --- END PLACEHOLDER AUTH LOGIC ---
// //     };

// //     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSelectChange = (name: string, value: string) => {
// //         setFormData(prev => ({ ...prev, [name]: name === 'year' ? parseInt(value) : value }));
// //     };

// //     return (
// //         <div className="min-h-screen relative overflow-x-hidden font-sans">
// //             {/* --- FIXED BACKGROUND --- */}
// //             <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50 dark:bg-gray-950">
// //                 <div className="absolute inset-0">
// //                      <Plasma 
// //                         color="#4f46e5" 
// //                         speed={1.5}
// //                         scale={1.2}
// //                         opacity={0.6}
// //                      />
// //                 </div>
// //             </div>

// //             <Navbar /> 

// //             <section className="relative pt-16">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
// //                     <div className="grid md:grid-cols-2 gap-12 items-center">
// //                         <div className="space-y-8 animate-fade-in">

// //                             <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-tight drop-shadow-sm">
// //                                 Your Academic
// //                                 <span className="block text-primary">Universe</span>
// //                             </h1>
// //                             <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
// //                                 One-stop platform for PYQs, Notes, Lab Codes, Viva Questions, and more. Built by students, for students.
// //                             </p>
// //                         </div>

// //                         {/* --- AUTH CARD SECTION --- */}
// //                         <div className="animate-slide-in relative group">
// //                             {/* Decorative Glow Layer - Restored */}
// //                             <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 dark:opacity-50 transition duration-500 group-hover:opacity-70 group-hover:blur-md"></div>

// //                             <Card className="relative shadow-2xl border-white/50 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10">
// //                                 <CardHeader className="space-y-2 pb-6">
// //                                     <CardTitle className="text-3xl font-bold tracking-tight text-center">{isLogin ? 'Welcome Back' : 'Join PICT Hub'}</CardTitle>
// //                                     <CardDescription className="text-center text-base">
// //                                         {isLogin ? 'Sign in to access your resources' : 'Create your account to get started'}
// //                                     </CardDescription>
// //                                 </CardHeader>
// //                                 <CardContent>
// //                                     <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
// //                                         <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-gray-100/80 dark:bg-gray-800/80">
// //                                             <TabsTrigger value="login" className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Login</TabsTrigger>
// //                                             <TabsTrigger value="register" className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Register</TabsTrigger>
// //                                         </TabsList>
// //                                         <TabsContent value="login">
// //                                             <form onSubmit={handleSubmit} className="space-y-4">
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="email">Email</Label>
// //                                                     <Input
// //                                                         id="email"
// //                                                         name="email"
// //                                                         type="email"
// //                                                         placeholder="your.email@pict.edu"
// //                                                         value={formData.email}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="password">Password</Label>
// //                                                     <Input
// //                                                         id="password"
// //                                                         name="password"
// //                                                         type="password"
// //                                                         placeholder="••••••••"
// //                                                         value={formData.password}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <Button type="submit" className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all" disabled={loading} variant="default">
// //                                                     {loading ? 'Signing in...' : 'Sign In'}
// //                                                 </Button>
// //                                             </form>
// //                                         </TabsContent>
// //                                         <TabsContent value="register">
// //                                             <form onSubmit={handleSubmit} className="space-y-4">
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="name">Full Name</Label>
// //                                                     <Input
// //                                                         id="name"
// //                                                         name="name"
// //                                                         placeholder="John Doe"
// //                                                         value={formData.name}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="reg-email">Email</Label>
// //                                                     <Input
// //                                                         id="reg-email"
// //                                                         name="email"
// //                                                         type="email"
// //                                                         placeholder="your.email@pict.edu"
// //                                                         value={formData.email}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="reg-password">Password</Label>
// //                                                     <Input
// //                                                         id="reg-password"
// //                                                         name="password"
// //                                                         type="password"
// //                                                         placeholder="••••••••"
// //                                                         value={formData.password}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="grid grid-cols-2 gap-4">
// //                                                     <div className="space-y-2">
// //                                                         <Label htmlFor="branch">Branch</Label>
// //                                                         <Select name="branch" value={formData.branch} onValueChange={(v) => handleSelectChange('branch', v)}>
// //                                                             <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
// //                                                                 <SelectValue placeholder="Select" />
// //                                                             </SelectTrigger>
// //                                                             <SelectContent>
// //                                                                 <SelectItem value="CSE">CSE</SelectItem>
// //                                                                 <SelectItem value="IT">IT</SelectItem>
// //                                                                 <SelectItem value="ECE">ECE</SelectItem>
// //                                                                 <SelectItem value="MECH">MECH</SelectItem>
// //                                                                 <SelectItem value="CIVIL">CIVIL</SelectItem>
// //                                                             </SelectContent>
// //                                                         </Select>
// //                                                     </div>
// //                                                     <div className="space-y-2">
// //                                                         <Label htmlFor="year">Year</Label>
// //                                                         <Select name="year" value={String(formData.year)} onValueChange={(v) => handleSelectChange('year', v)}>
// //                                                             <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
// //                                                                 <SelectValue placeholder="Select" />
// //                                                             </SelectTrigger>
// //                                                             <SelectContent>
// //                                                                 <SelectItem value="1">1st Year</SelectItem>
// //                                                                 <SelectItem value="2">2nd Year</SelectItem>
// //                                                                 <SelectItem value="3">3rd Year</SelectItem>
// //                                                                 <SelectItem value="4">4th Year</SelectItem>
// //                                                             </SelectContent>
// //                                                         </Select>
// //                                                     </div>
// //                                                 </div>
// //                                                 <Button type="submit" className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all" disabled={loading} variant="default">
// //                                                     {loading ? 'Creating Account...' : 'Create Account'}
// //                                                 </Button>
// //                                             </form>
// //                                         </TabsContent>
// //                                     </Tabs>
// //                                 </CardContent>
// //                             </Card>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>

// //             <section className="py-20 relative z-10">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //                     <div className="text-center mb-16">
// //                         <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
// //                         <p className="text-xl text-muted-foreground">All academic resources in one place</p>
// //                     </div>
// //                     <div className="grid md:grid-cols-3 gap-8">
// //                         <FeatureCard
// //                             icon={<BookOpen className="w-8 h-8" />}
// //                             title="PYQ Repository"
// //                             description="Browse thousands of previous year questions filtered by subject, module, and year"
// //                             color="primary"
// //                         />
// //                         <FeatureCard
// //                             icon={<FileText className="w-8 h-8" />}
// //                             title="Notes Vault"
// //                             description="Access student-uploaded notes with ratings and easy download options"
// //                             color="accent"
// //                         />
// //                         <FeatureCard
// //                             icon={<FlaskConical className="w-8 h-8" />}
// //                             title="Lab Bank"
// //                             description="Complete lab experiments with code, output, and explanations"
// //                             color="success"
// //                         />
// //                         <FeatureCard
// //                             icon={<MessageSquare className="w-8 h-8" />}
// //                             title="Discussion Forum"
// //                             description="Ask questions, share knowledge, and connect with peers anonymously"
// //                             color="warning"
// //                         />
// //                         <FeatureCard
// //                             icon={<Users className="w-8 h-8" />}
// //                             title="Viva Bank"
// //                             description="Prepare for vivas with curated questions and detailed answers"
// //                             color="secondary"
// //                         />
// //                         <FeatureCard
// //                             icon={<Bell className="w-8 h-8" />}
// //                             title="Circulars"
// //                             description="Stay updated with latest exam schedules and important announcements"
// //                             color="destructive"
// //                         />
// //                     </div>
// //                 </div>
// //             </section>
// //             <Footer />
// //         </div>
// //     );
// // };

// // export default AuthLanding;




// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
// import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// const AuthLanding = () => {
//     const navigate = useNavigate();
//     const [isExiting, setIsExiting] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [screenState, setScreenState] = useState<'locked' | 'unlocked'>('locked');

//     // Function to handle the scroll-and-enter sequence
//     const triggerEntrySequence = () => {
//         // 1. Scroll down to straighten the screen
//         window.scrollTo({
//             top: window.innerHeight * 1.5, // Scroll past the viewport to fully un-tilt
//             behavior: "smooth"
//         });

//         // 2. Unlock screen (visual change) after scroll starts
//         setTimeout(() => {
//             setScreenState('unlocked');
//         }, 500);

//         // 3. Trigger Zoom In (Exit) animation
//         setTimeout(() => {
//             setIsExiting(true);
//         }, 1200);

//         // 4. Navigate
//         setTimeout(() => {
//             navigate("/home");
//         }, 3500); // Delayed to match slower animation (1200ms start + ~2300ms)
//     };

//     const handleGuestLogin = () => {
//         setIsLoading(true); // Show loading state on button immediately
//         setTimeout(() => {
//             triggerEntrySequence();
//         }, 800); // Slightly longer pause before start
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         await new Promise(resolve => setTimeout(resolve, 1500)); // Longer fake loading

//         toast.success("Identity Verified", { description: "Accessing Secure Vault..." });
//         triggerEntrySequence();
//     };

//     return (
//         <div className="relative bg-[#030303] flex flex-col items-center justify-center font-sans selection:bg-indigo-500/30 overflow-x-hidden">

//             {/* Background Effects */}
//             <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.05),transparent_70%)] pointer-events-none" />
//             <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

//             <motion.div
//                 className="w-full"
//                 initial={{ y: "100%" }}
//                 animate={isExiting ? { scale: 15, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
//                 transition={{ duration: 2.5, ease: "easeInOut" }} // Slower duration
//                 style={{ transformOrigin: "center 75%" }} // Focus zoom on the laptop screen (lower part of container)
//             >
//                 <ContainerScroll
//                     titleComponent={
//                         <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20">
//                             {/* Header Text */}
//                             <div className="mb-12">
//                                 <div className="inline-flex items-center gap-2 mb-6">
//                                     <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
//                                     <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase">System Online</span>
//                                 </div>
//                                 <h1 className="text-4xl md:text-8xl font-medium text-white tracking-tight mb-6 leading-[1.1]">
//                                     Academic <br />
//                                     <span className="text-neutral-500 font-serif italic">Intelligence.</span>
//                                 </h1>
//                             </div>

//                             {/* Auth Forms - Now placed ABOVE the screen */}
//                             <div className="w-full max-w-sm relative z-20">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
//                                     <Card className="bg-[#0A0A0A]/80 border-white/[0.08] shadow-2xl relative backdrop-blur-3xl">
//                                         <CardHeader className="pt-6 pb-4 text-center border-b border-white/[0.03]">
//                                             <CardTitle className="text-white text-sm font-medium tracking-wide">Identity Verification</CardTitle>
//                                             <CardDescription className="text-neutral-600 text-[10px] uppercase tracking-wider">Secure Access Protocol</CardDescription>
//                                         </CardHeader>
//                                         <CardContent className="pt-6 space-y-4">
//                                             <Tabs defaultValue="login" className="w-full">
//                                                 <TabsList className="grid w-full grid-cols-2 h-8 bg-white/[0.03] p-1 border border-white/[0.05] rounded-lg">
//                                                     <TabsTrigger value="login" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">LOGIN</TabsTrigger>
//                                                     <TabsTrigger value="register" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">REGISTER</TabsTrigger>
//                                                 </TabsList>
//                                                 <TabsContent value="login">
//                                                     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//                                                         <div className="space-y-2">
//                                                             <Input placeholder="user@pict.edu" className="h-10 bg-white/[0.02] border-white/[0.08] text-white text-xs placeholder:text-neutral-700 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all rounded-lg" />
//                                                             <Input type="password" placeholder="••••••••" className="h-10 bg-white/[0.02] border-white/[0.08] text-white text-xs placeholder:text-neutral-700 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all rounded-lg" />
//                                                         </div>
//                                                         <Button disabled={isLoading} className="w-full h-10 bg-white text-black hover:bg-neutral-200 text-xs font-bold tracking-wide rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
//                                                             {isLoading ? (
//                                                                 <span className="animate-pulse">PROCESSING...</span>
//                                                             ) : "AUTHORIZE"}
//                                                         </Button>
//                                                     </form>
//                                                 </TabsContent>
//                                                 <TabsContent value="register">
//                                                     <div className="mt-6 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-center">
//                                                         <p className="text-[10px] text-indigo-300">New user registration is currently restricted to admin approval.</p>
//                                                     </div>
//                                                 </TabsContent>
//                                             </Tabs>

//                                             <div className="relative py-2">
//                                                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
//                                                 <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-[#0A0A0A] px-2 text-neutral-600">Alternative</span></div>
//                                             </div>

//                                             <Button variant="ghost" onClick={handleGuestLogin} disabled={isLoading} className="w-full h-9 border border-white/[0.05] bg-transparent hover:bg-white/[0.03] text-neutral-500 hover:text-white text-[10px] font-medium tracking-wider rounded-lg uppercase">
//                                                 Guest Session
//                                             </Button>
//                                         </CardContent>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     }
//                 >
//                     <div className="w-full h-full bg-[#0A0A0A] relative overflow-hidden flex flex-col">
//                         {/* Top Bar of the 'MacBook' */}
//                         <div className="h-6 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5">
//                             <div className="w-2 h-2 rounded-full bg-red-500/20" />
//                             <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
//                             <div className="w-2 h-2 rounded-full bg-green-500/20" />
//                         </div>

//                         {/* Main Screen Content - Dashboard Preview */}
//                         <div className="flex-1 relative bg-black flex items-center justify-center">

//                             {/* Locked State */}
//                             {screenState === 'locked' && (
//                                 <div className="absolute inset-0 flex items-center justify-center flex-col">
//                                     <div className="w-16 h-16 mb-4 rounded-full border border-white/10 flex items-center justify-center">
//                                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
//                                     </div>
//                                     <div className="text-neutral-500 font-mono text-xs tracking-[0.2em]">SYSTEM LOCKED</div>
//                                 </div>
//                             )}

//                             {/* Validated/Unlocked State */}
//                             {screenState === 'unlocked' && (
//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     className="absolute inset-0 z-20 bg-cover bg-center"
//                                     style={{
//                                         backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)' // Placeholder for dashboard
//                                     }}
//                                 >
//                                     {/* Mock Dashboard UI */}
//                                     <div className="p-8">
//                                         <div className="h-20 w-3/4 bg-white/5 rounded-xl mb-4 animate-pulse" />
//                                         <div className="grid grid-cols-3 gap-4">
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-75" />
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-100" />
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-150" />
//                                         </div>
//                                     </div>
//                                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//                                         <div className="text-center">
//                                             <div className="text-4xl font-bold text-white mb-2 tracking-tighter">PICT ExamOrbit</div>
//                                             <div className="text-sm text-green-500 font-mono">ACCESS GRANTED</div>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             )}

//                             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
//                         </div>
//                     </div>
//                 </ContainerScroll>
//             </motion.div>
//         </div>
//     );
// };

// export default AuthLanding;




// import { useState, useEffect, useLayoutEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
// import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// const AuthLanding = () => {
//     const navigate = useNavigate();
//     const [isExiting, setIsExiting] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [screenState, setScreenState] = useState<'locked' | 'unlocked'>('locked');

//     // ✅ 1. Force top scroll on mount to ensure AuthLanding starts clean
//     useLayoutEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // ✅ 2. Manage Scroll Restoration to prevent browser from remembering the scroll position
//     useEffect(() => {
//         if ('scrollRestoration' in history) {
//             history.scrollRestoration = 'manual';
//         }

//         const timer = setTimeout(() => {
//             window.scrollTo(0, 0);
//         }, 10);

//         return () => {
//             if ('scrollRestoration' in history) {
//                 history.scrollRestoration = 'auto';
//             }
//             clearTimeout(timer);
//         };
//     }, []);

//     // Function to handle the scroll-and-enter sequence
//     const triggerEntrySequence = () => {
//         // 1. Scroll down to straighten the screen (Animation)
//         window.scrollTo({
//             top: window.innerHeight * 1.2,
//             behavior: "smooth"
//         });

//         // 2. Unlock screen (visual change)
//         setTimeout(() => {
//             setScreenState('unlocked');
//         }, 600);

//         // 3. Trigger Zoom In (Exit) animation
//         setTimeout(() => {
//             setIsExiting(true);
//         }, 1300);

//         // 4. Navigate & RESET SCROLL
//         setTimeout(() => {
//             // ❗ CRITICAL FIX: Instantly jump to top before route change
//             // This ensures /home loads at the Hero section, not scrolled down.
//             window.scrollTo({ top: 0, left: 0, behavior: "auto" }); 

//             navigate("/home");
//         }, 3600);
//     };

//     const handleGuestLogin = () => {
//         setIsLoading(true);
//         setTimeout(() => {
//             triggerEntrySequence();
//         }, 800);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         await new Promise(resolve => setTimeout(resolve, 1500));

//         toast.success("Identity Verified", { description: "Accessing Secure Vault..." });
//         triggerEntrySequence();
//     };

//     return (
//         <div className="relative bg-[#030303] flex flex-col items-center justify-center font-sans selection:bg-indigo-500/30 overflow-x-hidden min-h-screen">

//             {/* Background Effects */}
//             <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.05),transparent_70%)] pointer-events-none" />
//             <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

//             <motion.div
//                 className="w-full"
//                 initial={{ y: "100%" }}
//                 animate={isExiting ? { scale: 15, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
//                 transition={{ duration: 2.5, ease: "easeInOut" }}
//                 style={{ transformOrigin: "center 75%" }}
//             >
//                 <ContainerScroll
//                     titleComponent={
//                         <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20">
//                             {/* Header Text */}
//                             <div className="mb-12">
//                                 <div className="inline-flex items-center gap-2 mb-6">
//                                     <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
//                                     <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase">System Online</span>
//                                 </div>
//                                 <h1 className="text-4xl md:text-8xl font-medium text-white tracking-tight mb-6 leading-[1.1]">
//                                     Academic <br />
//                                     <span className="text-neutral-500 font-serif italic">Intelligence.</span>
//                                 </h1>
//                             </div>

//                             {/* Auth Forms */}
//                             <div className="w-full max-w-sm relative z-20">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
//                                     <Card className="bg-[#0A0A0A]/80 border-white/[0.08] shadow-2xl relative backdrop-blur-3xl">
//                                         <CardHeader className="pt-6 pb-4 text-center border-b border-white/[0.03]">
//                                             <CardTitle className="text-white text-sm font-medium tracking-wide">Identity Verification</CardTitle>
//                                             <CardDescription className="text-neutral-600 text-[10px] uppercase tracking-wider">Secure Access Protocol</CardDescription>
//                                         </CardHeader>
//                                         <CardContent className="pt-6 space-y-4">
//                                             <Tabs defaultValue="login" className="w-full">
//                                                 <TabsList className="grid w-full grid-cols-2 h-8 bg-white/[0.03] p-1 border border-white/[0.05] rounded-lg">
//                                                     <TabsTrigger value="login" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">LOGIN</TabsTrigger>
//                                                     <TabsTrigger value="register" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">REGISTER</TabsTrigger>
//                                                 </TabsList>
//                                                 <TabsContent value="login">
//                                                     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//                                                         <div className="space-y-2">
//                                                             <Input placeholder="user@pict.edu" className="h-10 bg-white/[0.02] border-white/[0.08] text-white text-xs placeholder:text-neutral-700 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all rounded-lg" />
//                                                             <Input type="password" placeholder="••••••••" className="h-10 bg-white/[0.02] border-white/[0.08] text-white text-xs placeholder:text-neutral-700 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all rounded-lg" />
//                                                         </div>
//                                                         <Button disabled={isLoading} className="w-full h-10 bg-white text-black hover:bg-neutral-200 text-xs font-bold tracking-wide rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
//                                                             {isLoading ? (
//                                                                 <span className="animate-pulse">PROCESSING...</span>
//                                                             ) : "AUTHORIZE"}
//                                                         </Button>
//                                                     </form>
//                                                 </TabsContent>
//                                                 <TabsContent value="register">
//                                                     <div className="mt-6 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-center">
//                                                         <p className="text-[10px] text-indigo-300">New user registration is currently restricted to admin approval.</p>
//                                                     </div>
//                                                 </TabsContent>
//                                             </Tabs>

//                                             <div className="relative py-2">
//                                                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
//                                                 <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-[#0A0A0A] px-2 text-neutral-600">Alternative</span></div>
//                                             </div>

//                                             <Button variant="ghost" onClick={handleGuestLogin} disabled={isLoading} className="w-full h-9 border border-white/[0.05] bg-transparent hover:bg-white/[0.03] text-neutral-500 hover:text-white text-[10px] font-medium tracking-wider rounded-lg uppercase">
//                                                 Guest Session
//                                             </Button>
//                                         </CardContent>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     }
//                 >
//                     <div className="w-full h-full bg-[#0A0A0A] relative overflow-hidden flex flex-col">
//                         {/* Top Bar of the 'MacBook' */}
//                         <div className="h-6 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5">
//                             <div className="w-2 h-2 rounded-full bg-red-500/20" />
//                             <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
//                             <div className="w-2 h-2 rounded-full bg-green-500/20" />
//                         </div>

//                         {/* Main Screen Content - Dashboard Preview */}
//                         <div className="flex-1 relative bg-black flex items-center justify-center">

//                             {/* Locked State */}
//                             {screenState === 'locked' && (
//                                 <div className="absolute inset-0 flex items-center justify-center flex-col">
//                                     <div className="w-16 h-16 mb-4 rounded-full border border-white/10 flex items-center justify-center">
//                                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
//                                     </div>
//                                     <div className="text-neutral-500 font-mono text-xs tracking-[0.2em]">SYSTEM LOCKED</div>
//                                 </div>
//                             )}

//                             {/* Validated/Unlocked State */}
//                             {screenState === 'unlocked' && (
//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     className="absolute inset-0 z-20 bg-cover bg-center"
//                                     style={{
//                                         backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)'
//                                     }}
//                                 >
//                                     {/* Mock Dashboard UI */}
//                                     <div className="p-8">
//                                         <div className="h-20 w-3/4 bg-white/5 rounded-xl mb-4 animate-pulse" />
//                                         <div className="grid grid-cols-3 gap-4">
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-75" />
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-100" />
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-150" />
//                                         </div>
//                                     </div>
//                                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//                                         <div className="text-center">
//                                             <div className="text-4xl font-bold text-white mb-2 tracking-tighter">PICT ExamOrbit</div>
//                                             <div className="text-sm text-green-500 font-mono">ACCESS GRANTED</div>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             )}

//                             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
//                         </div>
//                     </div>
//                 </ContainerScroll>
//             </motion.div>
//         </div>
//     );
// };

// export default AuthLanding;




// // import { useState } from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { toast } from 'sonner';
// // import { BookOpen, FileText, FlaskConical, Users, MessageSquare, Bell } from 'lucide-react';
// // import Navbar from '@/components/layout/Navbar';
// // import Footer from '@/components/layout/Footer';
// // import { Plasma } from '@/components/ui/Plasma';

// // // Modified FeatureCard to include the exact glow effect from the Login Card
// // const FeatureCard = ({ icon, title, description, color }: { icon: JSX.Element, title: string, description: string, color: string }) => {

// //     // Map for internal Icon background colors
// //     const iconColorClasses: Record<string, string> = {
// //         primary: 'bg-primary/10 text-primary',
// //         accent: 'bg-accent/10 text-accent',
// //         success: 'bg-emerald-500/10 text-emerald-500',
// //         warning: 'bg-amber-500/10 text-amber-500',
// //         destructive: 'bg-destructive/10 text-destructive',
// //         secondary: 'bg-secondary/50 text-secondary-foreground'
// //     };

// //     return (
// //         <div className="relative group hover:-translate-y-1 transition-all duration-300">
// //             {/* Glow Effect Layer - Matches Login Card Exactly */}
// //             <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 dark:opacity-50 transition duration-500 group-hover:opacity-70 group-hover:blur-md"></div>

// //             {/* Main Card Content */}
// //             <div className="relative h-full p-8 rounded-2xl border border-white/50 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg hover:shadow-xl transition-all">
// //                 <div className={`w-16 h-16 rounded-xl ${iconColorClasses[color]} flex items-center justify-center mb-6`}>
// //                     {icon}
// //                 </div>
// //                 <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
// //                 <p className="text-muted-foreground leading-relaxed">{description}</p>
// //             </div>
// //         </div>
// //     );
// // };

// // const AuthLanding = () => {
// //     const [isLogin, setIsLogin] = useState(true);
// //     const [formData, setFormData] = useState({
// //         name: '',
// //         email: '',
// //         password: '',
// //         branch: '',
// //         year: 1
// //     });
// //     const [loading, setLoading] = useState(false);

// //     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //         e.preventDefault();
// //         setLoading(true);

// //         // --- PLACEHOLDER AUTH LOGIC ---
// //         try {
// //             await new Promise(resolve => setTimeout(resolve, 1500)); 

// //             if (formData.email.includes("fail")) {
// //                  throw new Error("Invalid credentials or user already exists.");
// //             }

// //             toast.success(isLogin ? 'Login successful! Redirecting to Home.' : 'Registration successful! Please log in.');

// //             if (isLogin) {
// //                  window.location.href = "/home"; 
// //             } else {
// //                 setIsLogin(true);
// //             }
// //         } catch (error: any) {
// //             toast.error(error.message || 'Authentication failed. Please try again.');
// //         } finally {
// //             setLoading(false);
// //         }
// //         // --- END PLACEHOLDER AUTH LOGIC ---
// //     };

// //     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSelectChange = (name: string, value: string) => {
// //         setFormData(prev => ({ ...prev, [name]: name === 'year' ? parseInt(value) : value }));
// //     };

// //     return (
// //         <div className="min-h-screen relative overflow-x-hidden font-sans">
// //             {/* --- FIXED BACKGROUND --- */}
// //             <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50 dark:bg-gray-950">
// //                 <div className="absolute inset-0">
// //                      <Plasma 
// //                         color="#4f46e5" 
// //                         speed={1.5}
// //                         scale={1.2}
// //                         opacity={0.6}
// //                      />
// //                 </div>
// //             </div>

// //             <Navbar /> 

// //             <section className="relative pt-16">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
// //                     <div className="grid md:grid-cols-2 gap-12 items-center">
// //                         <div className="space-y-8 animate-fade-in">

// //                             <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-tight drop-shadow-sm">
// //                                 Your Academic
// //                                 <span className="block text-primary">Universe</span>
// //                             </h1>
// //                             <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
// //                                 One-stop platform for PYQs, Notes, Lab Codes, Viva Questions, and more. Built by students, for students.
// //                             </p>
// //                         </div>

// //                         {/* --- AUTH CARD SECTION --- */}
// //                         <div className="animate-slide-in relative group">
// //                             {/* Decorative Glow Layer - Restored */}
// //                             <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 dark:opacity-50 transition duration-500 group-hover:opacity-70 group-hover:blur-md"></div>

// //                             <Card className="relative shadow-2xl border-white/50 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10">
// //                                 <CardHeader className="space-y-2 pb-6">
// //                                     <CardTitle className="text-3xl font-bold tracking-tight text-center">{isLogin ? 'Welcome Back' : 'Join PICT Hub'}</CardTitle>
// //                                     <CardDescription className="text-center text-base">
// //                                         {isLogin ? 'Sign in to access your resources' : 'Create your account to get started'}
// //                                     </CardDescription>
// //                                 </CardHeader>
// //                                 <CardContent>
// //                                     <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
// //                                         <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-gray-100/80 dark:bg-gray-800/80">
// //                                             <TabsTrigger value="login" className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Login</TabsTrigger>
// //                                             <TabsTrigger value="register" className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Register</TabsTrigger>
// //                                         </TabsList>
// //                                         <TabsContent value="login">
// //                                             <form onSubmit={handleSubmit} className="space-y-4">
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="email">Email</Label>
// //                                                     <Input
// //                                                         id="email"
// //                                                         name="email"
// //                                                         type="email"
// //                                                         placeholder="your.email@pict.edu"
// //                                                         value={formData.email}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="password">Password</Label>
// //                                                     <Input
// //                                                         id="password"
// //                                                         name="password"
// //                                                         type="password"
// //                                                         placeholder="••••••••"
// //                                                         value={formData.password}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <Button type="submit" className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all" disabled={loading} variant="default">
// //                                                     {loading ? 'Signing in...' : 'Sign In'}
// //                                                 </Button>
// //                                             </form>
// //                                         </TabsContent>
// //                                         <TabsContent value="register">
// //                                             <form onSubmit={handleSubmit} className="space-y-4">
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="name">Full Name</Label>
// //                                                     <Input
// //                                                         id="name"
// //                                                         name="name"
// //                                                         placeholder="John Doe"
// //                                                         value={formData.name}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="reg-email">Email</Label>
// //                                                     <Input
// //                                                         id="reg-email"
// //                                                         name="email"
// //                                                         type="email"
// //                                                         placeholder="your.email@pict.edu"
// //                                                         value={formData.email}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="space-y-2">
// //                                                     <Label htmlFor="reg-password">Password</Label>
// //                                                     <Input
// //                                                         id="reg-password"
// //                                                         name="password"
// //                                                         type="password"
// //                                                         placeholder="••••••••"
// //                                                         value={formData.password}
// //                                                         onChange={handleChange}
// //                                                         required
// //                                                         className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="grid grid-cols-2 gap-4">
// //                                                     <div className="space-y-2">
// //                                                         <Label htmlFor="branch">Branch</Label>
// //                                                         <Select name="branch" value={formData.branch} onValueChange={(v) => handleSelectChange('branch', v)}>
// //                                                             <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
// //                                                                 <SelectValue placeholder="Select" />
// //                                                             </SelectTrigger>
// //                                                             <SelectContent>
// //                                                                 <SelectItem value="CSE">CSE</SelectItem>
// //                                                                 <SelectItem value="IT">IT</SelectItem>
// //                                                                 <SelectItem value="ECE">ECE</SelectItem>
// //                                                                 <SelectItem value="MECH">MECH</SelectItem>
// //                                                                 <SelectItem value="CIVIL">CIVIL</SelectItem>
// //                                                             </SelectContent>
// //                                                         </Select>
// //                                                     </div>
// //                                                     <div className="space-y-2">
// //                                                         <Label htmlFor="year">Year</Label>
// //                                                         <Select name="year" value={String(formData.year)} onValueChange={(v) => handleSelectChange('year', v)}>
// //                                                             <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
// //                                                                 <SelectValue placeholder="Select" />
// //                                                             </SelectTrigger>
// //                                                             <SelectContent>
// //                                                                 <SelectItem value="1">1st Year</SelectItem>
// //                                                                 <SelectItem value="2">2nd Year</SelectItem>
// //                                                                 <SelectItem value="3">3rd Year</SelectItem>
// //                                                                 <SelectItem value="4">4th Year</SelectItem>
// //                                                             </SelectContent>
// //                                                         </Select>
// //                                                     </div>
// //                                                 </div>
// //                                                 <Button type="submit" className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all" disabled={loading} variant="default">
// //                                                     {loading ? 'Creating Account...' : 'Create Account'}
// //                                                 </Button>
// //                                             </form>
// //                                         </TabsContent>
// //                                     </Tabs>
// //                                 </CardContent>
// //                             </Card>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>

// //             <section className="py-20 relative z-10">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //                     <div className="text-center mb-16">
// //                         <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
// //                         <p className="text-xl text-muted-foreground">All academic resources in one place</p>
// //                     </div>
// //                     <div className="grid md:grid-cols-3 gap-8">
// //                         <FeatureCard
// //                             icon={<BookOpen className="w-8 h-8" />}
// //                             title="PYQ Repository"
// //                             description="Browse thousands of previous year questions filtered by subject, module, and year"
// //                             color="primary"
// //                         />
// //                         <FeatureCard
// //                             icon={<FileText className="w-8 h-8" />}
// //                             title="Notes Vault"
// //                             description="Access student-uploaded notes with ratings and easy download options"
// //                             color="accent"
// //                         />
// //                         <FeatureCard
// //                             icon={<FlaskConical className="w-8 h-8" />}
// //                             title="Lab Bank"
// //                             description="Complete lab experiments with code, output, and explanations"
// //                             color="success"
// //                         />
// //                         <FeatureCard
// //                             icon={<MessageSquare className="w-8 h-8" />}
// //                             title="Discussion Forum"
// //                             description="Ask questions, share knowledge, and connect with peers anonymously"
// //                             color="warning"
// //                         />
// //                         <FeatureCard
// //                             icon={<Users className="w-8 h-8" />}
// //                             title="Viva Bank"
// //                             description="Prepare for vivas with curated questions and detailed answers"
// //                             color="secondary"
// //                         />
// //                         <FeatureCard
// //                             icon={<Bell className="w-8 h-8" />}
// //                             title="Circulars"
// //                             description="Stay updated with latest exam schedules and important announcements"
// //                             color="destructive"
// //                         />
// //                     </div>
// //                 </div>
// //             </section>
// //             <Footer />
// //         </div>
// //     );
// // };

// // export default AuthLanding;




// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
// import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// const AuthLanding = () => {
//     const navigate = useNavigate();
//     const [isExiting, setIsExiting] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [screenState, setScreenState] = useState<'locked' | 'unlocked'>('locked');

//     // Function to handle the scroll-and-enter sequence
//     const triggerEntrySequence = () => {
//         // 1. Scroll down to straighten the screen
//         window.scrollTo({
//             top: window.innerHeight * 1.5, // Scroll past the viewport to fully un-tilt
//             behavior: "smooth"
//         });

//         // 2. Unlock screen (visual change) after scroll starts
//         setTimeout(() => {
//             setScreenState('unlocked');
//         }, 500);

//         // 3. Trigger Zoom In (Exit) animation
//         setTimeout(() => {
//             setIsExiting(true);
//         }, 1200);

//         // 4. Navigate
//         setTimeout(() => {
//             navigate("/home");
//         }, 3500); // Delayed to match slower animation (1200ms start + ~2300ms)
//     };

//     const handleGuestLogin = () => {
//         setIsLoading(true); // Show loading state on button immediately
//         setTimeout(() => {
//             triggerEntrySequence();
//         }, 800); // Slightly longer pause before start
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         await new Promise(resolve => setTimeout(resolve, 1500)); // Longer fake loading

//         toast.success("Identity Verified", { description: "Accessing Secure Vault..." });
//         triggerEntrySequence();
//     };

//     return (
//         <div className="relative bg-[#030303] flex flex-col items-center justify-center font-sans selection:bg-indigo-500/30 overflow-x-hidden">

//             {/* Background Effects */}
//             <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.05),transparent_70%)] pointer-events-none" />
//             <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

//             <motion.div
//                 className="w-full"
//                 initial={{ y: "100%" }}
//                 animate={isExiting ? { scale: 15, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
//                 transition={{ duration: 2.5, ease: "easeInOut" }} // Slower duration
//                 style={{ transformOrigin: "center 75%" }} // Focus zoom on the laptop screen (lower part of container)
//             >
//                 <ContainerScroll
//                     titleComponent={
//                         <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20">
//                             {/* Header Text */}
//                             <div className="mb-12">
//                                 <div className="inline-flex items-center gap-2 mb-6">
//                                     <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
//                                     <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase">System Online</span>
//                                 </div>
//                                 <h1 className="text-4xl md:text-8xl font-medium text-white tracking-tight mb-6 leading-[1.1]">
//                                     Academic <br />
//                                     <span className="text-neutral-500 font-serif italic">Intelligence.</span>
//                                 </h1>
//                             </div>

//                             {/* Auth Forms - Now placed ABOVE the screen */}
//                             <div className="w-full max-w-sm relative z-20">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
//                                     <Card className="bg-[#0A0A0A]/80 border-white/[0.08] shadow-2xl relative backdrop-blur-3xl">
//                                         <CardHeader className="pt-6 pb-4 text-center border-b border-white/[0.03]">
//                                             <CardTitle className="text-white text-sm font-medium tracking-wide">Identity Verification</CardTitle>
//                                             <CardDescription className="text-neutral-600 text-[10px] uppercase tracking-wider">Secure Access Protocol</CardDescription>
//                                         </CardHeader>
//                                         <CardContent className="pt-6 space-y-4">
//                                             <Tabs defaultValue="login" className="w-full">
//                                                 <TabsList className="grid w-full grid-cols-2 h-8 bg-white/[0.03] p-1 border border-white/[0.05] rounded-lg">
//                                                     <TabsTrigger value="login" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">LOGIN</TabsTrigger>
//                                                     <TabsTrigger value="register" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">REGISTER</TabsTrigger>
//                                                 </TabsList>
//                                                 <TabsContent value="login">
//                                                     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//                                                         <div className="space-y-2">
//                                                             <Input placeholder="user@pict.edu" className="h-10 bg-white/[0.02] border-white/[0.08] text-white text-xs placeholder:text-neutral-700 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all rounded-lg" />
//                                                             <Input type="password" placeholder="••••••••" className="h-10 bg-white/[0.02] border-white/[0.08] text-white text-xs placeholder:text-neutral-700 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all rounded-lg" />
//                                                         </div>
//                                                         <Button disabled={isLoading} className="w-full h-10 bg-white text-black hover:bg-neutral-200 text-xs font-bold tracking-wide rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
//                                                             {isLoading ? (
//                                                                 <span className="animate-pulse">PROCESSING...</span>
//                                                             ) : "AUTHORIZE"}
//                                                         </Button>
//                                                     </form>
//                                                 </TabsContent>
//                                                 <TabsContent value="register">
//                                                     <div className="mt-6 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-center">
//                                                         <p className="text-[10px] text-indigo-300">New user registration is currently restricted to admin approval.</p>
//                                                     </div>
//                                                 </TabsContent>
//                                             </Tabs>

//                                             <div className="relative py-2">
//                                                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
//                                                 <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-[#0A0A0A] px-2 text-neutral-600">Alternative</span></div>
//                                             </div>

//                                             <Button variant="ghost" onClick={handleGuestLogin} disabled={isLoading} className="w-full h-9 border border-white/[0.05] bg-transparent hover:bg-white/[0.03] text-neutral-500 hover:text-white text-[10px] font-medium tracking-wider rounded-lg uppercase">
//                                                 Guest Session
//                                             </Button>
//                                         </CardContent>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     }
//                 >
//                     <div className="w-full h-full bg-[#0A0A0A] relative overflow-hidden flex flex-col">
//                         {/* Top Bar of the 'MacBook' */}
//                         <div className="h-6 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5">
//                             <div className="w-2 h-2 rounded-full bg-red-500/20" />
//                             <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
//                             <div className="w-2 h-2 rounded-full bg-green-500/20" />
//                         </div>

//                         {/* Main Screen Content - Dashboard Preview */}
//                         <div className="flex-1 relative bg-black flex items-center justify-center">

//                             {/* Locked State */}
//                             {screenState === 'locked' && (
//                                 <div className="absolute inset-0 flex items-center justify-center flex-col">
//                                     <div className="w-16 h-16 mb-4 rounded-full border border-white/10 flex items-center justify-center">
//                                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
//                                     </div>
//                                     <div className="text-neutral-500 font-mono text-xs tracking-[0.2em]">SYSTEM LOCKED</div>
//                                 </div>
//                             )}

//                             {/* Validated/Unlocked State */}
//                             {screenState === 'unlocked' && (
//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     className="absolute inset-0 z-20 bg-cover bg-center"
//                                     style={{
//                                         backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)' // Placeholder for dashboard
//                                     }}
//                                 >
//                                     {/* Mock Dashboard UI */}
//                                     <div className="p-8">
//                                         <div className="h-20 w-3/4 bg-white/5 rounded-xl mb-4 animate-pulse" />
//                                         <div className="grid grid-cols-3 gap-4">
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-75" />
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-100" />
//                                             <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-150" />
//                                         </div>
//                                     </div>
//                                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//                                         <div className="text-center">
//                                             <div className="text-4xl font-bold text-white mb-2 tracking-tighter">PICT ExamOrbit</div>
//                                             <div className="text-sm text-green-500 font-mono">ACCESS GRANTED</div>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             )}

//                             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
//                         </div>
//                     </div>
//                 </ContainerScroll>
//             </motion.div>
//         </div>
//     );
// };

// export default AuthLanding;




// import { useState, useEffect, useLayoutEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
// import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// const AuthLanding = () => {
//     const navigate = useNavigate();
//     const [isExiting, setIsExiting] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [screenState, setScreenState] = useState<'locked' | 'unlocked'>('locked');
//     const [activeTab, setActiveTab] = useState("login");

//     // ✅ 1. Force top scroll on mount
//     useLayoutEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // ✅ 2. Manage Scroll Restoration
//     useEffect(() => {
//         if ('scrollRestoration' in history) {
//             history.scrollRestoration = 'manual';
//         }

//         const timer = setTimeout(() => {
//             window.scrollTo(0, 0);
//         }, 10);

//         return () => {
//             if ('scrollRestoration' in history) {
//                 history.scrollRestoration = 'auto';
//             }
//             clearTimeout(timer);
//         };
//     }, []);

//     const triggerEntrySequence = () => {
//         window.scrollTo({
//             top: window.innerHeight * 1.2,
//             behavior: "smooth"
//         });

//         setTimeout(() => {
//             setScreenState('unlocked');
//         }, 600);

//         setTimeout(() => {
//             setIsExiting(true);
//         }, 1300);

//         setTimeout(() => {
//             window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//             navigate("/home");
//         }, 3600);
//     };

//     const handleGuestLogin = () => {
//         setIsLoading(true);
//         setTimeout(() => {
//             triggerEntrySequence();
//         }, 800);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         toast.success("Identity Verified", { description: "Accessing Secure Vault..." });
//         triggerEntrySequence();
//     };

//     return (
//         <div className="relative bg-[#030303] flex flex-col items-center justify-center font-sans selection:bg-[#00f0ff]/30 overflow-x-hidden min-h-screen">

//             {/* Cinematic Background */}
//                 <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,30,40,1)_0%,rgba(3,3,3,1)_100%)] pointer-events-none" />
//                 <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

//             {/* Ambient Glows */}
//             <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none mix-blend-screen" />
//             <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none mix-blend-screen" />

//             <motion.div
//                 className="w-full relative z-10"
//                 initial={{ y: "100%" }}
//                 animate={isExiting ? { scale: 15, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
//                 transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
//                 style={{ transformOrigin: "center 75%" }}
//             >
//                 <ContainerScroll
//                     titleComponent={
//                         <div className="flex flex-col items-center justify-center min-h-[70vh] pb-20 pt-10">
//                             {/* Brand Header */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.5, duration: 0.8 }}
//                                 className="mb-16 text-center"
//                             >
//                                 <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
//                                     <div className="relative flex h-2 w-2">
//                                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
//                                         <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
//                                     </div>
//                                     <span className="text-[11px] font-mono text-[#00f0ff] tracking-[0.2em] uppercase">System Operational</span>
//                                 </div>

//                                 <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4 leading-none select-none">
//                                     ACADVERSE
//                                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7000ff] text-2xl md:text-3xl font-serif italic ml-4 align-top">
//                                         Beta
//                                     </span>
//                                 </h1>
//                                 <p className="text-white/40 text-sm md:text-base font-light tracking-wide max-w-md mx-auto">
//                                     The ultimate academic intelligence platform.
//                                 </p>
//                             </motion.div>

//                             {/* Ultra-Premium Auth Card */}
//                             <div className="relative w-full max-w-[420px] mx-auto perspective-1000">
//                                 {/* Prism Glow Effect */}
//                                 <div className="absolute -inset-[2px] bg-gradient-to-br from-[#00f0ff] via-[#7000ff] to-[#00f0ff] rounded-[24px] opacity-30 blur-xl animate-gradient-xy transition-opacity duration-500 group-hover:opacity-50" />

//                                 <div className="relative bg-[#050505]/90 backdrop-blur-2xl rounded-[22px] border border-white/10 p-1 shadow-2xl ring-1 ring-white/5 overflow-hidden">
//                                     {/* Inner Noise Texture */}
//                                     <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

//                                     <div className="relative p-7">
//                                         {/* Tab Switcher */}
//                                         <div className="flex p-1 mb-8 bg-black/40 rounded-xl border border-white/5 relative">
//                                             <div
//                                                 className="absolute inset-y-1 w-[calc(50%-4px)] bg-[#1a1a1a] rounded-lg shadow-sm transition-all duration-300 ease-out border border-white/5"
//                                                 style={{ left: activeTab === 'login' ? '4px' : 'calc(50%)' }}
//                                             />
//                                             <button
//                                                 onClick={() => setActiveTab('login')}
//                                                 className={`flex-1 relative z-10 text-xs font-medium py-2.5 text-center transition-colors duration-300 ${activeTab === 'login' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
//                                             >
//                                                 LOGIN
//                                             </button>
//                                             <button
//                                                 onClick={() => setActiveTab('register')}
//                                                 className={`flex-1 relative z-10 text-xs font-medium py-2.5 text-center transition-colors duration-300 ${activeTab === 'register' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
//                                             >
//                                                 REGISTER
//                                             </button>
//                                         </div>

//                                         <form onSubmit={handleSubmit} className="space-y-5">
//                                             <div className="space-y-4">
//                                                 <div className="group relative">
//                                                     <label className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-1.5 block group-focus-within:text-[#00f0ff] transition-colors">Email Address</label>
//                                                     <div className="relative">
//                                                         <Input
//                                                             placeholder="student@pict.edu"
//                                                             className="h-12 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/10 focus:border-[#00f0ff]/50 focus:bg-[#00f0ff]/5 focus:ring-0 transition-all rounded-xl pl-4"
//                                                         />
//                                                         <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] opacity-0 group-focus-within:opacity-100 transition-opacity" />
//                                                     </div>
//                                                 </div>

//                                                 <div className="group relative">
//                                                     <label className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-1.5 block group-focus-within:text-[#00f0ff] transition-colors">Password</label>
//                                                     <div className="relative">
//                                                         <Input
//                                                             type="password"
//                                                             placeholder="••••••••••••"
//                                                             className="h-12 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/10 focus:border-[#00f0ff]/50 focus:bg-[#00f0ff]/5 focus:ring-0 transition-all rounded-xl pl-4"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <Button
//                                                 disabled={isLoading}
//                                                 className="w-full h-12 bg-white text-black hover:bg-[#00f0ff] hover:text-black text-sm font-bold tracking-wide rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] relative overflow-hidden group"
//                                             >
//                                                 <span className="relative z-10 flex items-center justify-center gap-2">
//                                                     {isLoading ? (
//                                                         <>
//                                                             <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
//                                                             VERIFYING...
//                                                         </>
//                                                     ) : (
//                                                         <>
//                                                             {activeTab === 'login' ? 'INITIALIZE SESSION' : 'REQUEST ACCESS'}
//                                                         </>
//                                                     )}
//                                                 </span>
//                                             </Button>

//                                             <div className="relative py-2">
//                                                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
//                                                 <div className="relative flex justify-center text-[9px] uppercase tracking-widest"><span className="bg-[#050505] px-3 text-white/20">Or Access via</span></div>
//                                             </div>

//                                             <Button
//                                                 type="button"
//                                                 variant="outline"
//                                                 onClick={handleGuestLogin}
//                                                 disabled={isLoading}
//                                                 className="w-full h-11 border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white/60 hover:text-white text-xs font-medium tracking-wider rounded-xl transition-all hover:border-white/20"
//                                             >
//                                                 GUEST TERMINAL
//                                             </Button>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     }
//                 >
//                     <div className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col">
//                         {/* MacBook Camera & Bezel */}
//                         <div className="h-8 bg-black flex items-center justify-center border-b border-white/5 relative z-20">
//                             <div className="w-20 h-4 bg-neutral-900 rounded-b-xl flex items-center justify-center">
//                                 <div className="w-1.5 h-1.5 rounded-full bg-blue-900/50 ring-1 ring-white/10" />
//                             </div>
//                         </div>

//                         {/* Screen Content */}
//                         <div className="flex-1 relative flex items-center justify-center bg-[#0a0a0a] overflow-hidden">


//                             <div className="absolute inset-0 flex items-center justify-center z-20">
//                                 {screenState === 'unlocked' && (
//                                     <motion.div
//                                         initial={{ scale: 0.5, opacity: 0 }}
//                                         animate={{ scale: 1, opacity: 1 }}
//                                         className="text-center"
//                                     >
//                                         <motion.div
//                                             initial={{ scale: 0 }}
//                                             animate={{ scale: 1 }}
//                                             className="w-20 h-20 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center mx-auto mb-6"
//                                         >
//                                             <div className="w-8 h-8 text-emerald-500">
//                                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
//                                             </div>
//                                         </motion.div>
//                                         <div className="text-3xl font-bold text-white tracking-tight">Access Granted</div>
//                                         <div className="text-emerald-400 font-mono text-sm mt-2">Redirecting to Vault...</div>
//                                     </motion.div>
//                                 )}
//                             </div>

//                             {/* Grid Overlay */}
//                             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
//                         </div>
//                     </div>
//                 </ContainerScroll>
//             </motion.div>
//         </div>
//     );
// };

// export default AuthLanding;



import { useState, useLayoutEffect, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const AuthLanding = () => {
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [screenState, setScreenState] = useState<'locked' | 'unlocked'>('locked');
    const [activeTab, setActiveTab] = useState("login");

    // Form State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // API Base URL
    const API_URL = "http://localhost:5000/api/auth";

    // ✅ 1. Force top scroll on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ✅ 2. Manage Scroll Restoration
    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);

        return () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
            clearTimeout(timer);
        };
    }, []);

    const triggerEntrySequence = () => {
        window.scrollTo({
            top: window.innerHeight * 1.2,
            behavior: "smooth"
        });

        setTimeout(() => {
            setScreenState('unlocked');
        }, 600);

        setTimeout(() => {
            setIsExiting(true);
        }, 1300);

        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            navigate("/home");
        }, 3600);
    };

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let res;
            if (activeTab === "login") {
                // LOGIN
                res = await axios.post(`${API_URL}/login`, { email, password });
            } else {
                // REGISTER
                res = await axios.post(`${API_URL}/register`, { name, email, password });
            }

            // Success
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Identity Verified", { description: "Accessing Secure Vault..." });
            triggerEntrySequence();

        } catch (error: any) {
            console.error("Auth Error:", error);
            const errMsg = error.response?.data?.error || "Authentication failed";
            toast.error("Access Denied", { description: errMsg });
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${API_URL}/google`, {
                token: credentialResponse.credential
            });

            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Google Identity Verified", { description: "Redirecting..." });
            triggerEntrySequence();
        } catch (error: any) {
            console.error("Google Auth Error:", error);
            toast.error("Google Auth Failed", { description: "Could not verify identity." });
            setIsLoading(false);
        }
    };

    return (
        <div className="relative bg-[#050505] flex flex-col items-center justify-center font-sans selection:bg-indigo-500/30 overflow-x-hidden min-h-screen">

            {/* High-End Background - Subtle & Deep */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111_0%,#050505_100%)] pointer-events-none" />

            {/* Minimalist Grid - Barely Visible */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <motion.div
                className="w-full relative z-10"
                initial={{ y: "100%" }}
                animate={isExiting ? { scale: 15, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "center 75%" }}
            >
                <ContainerScroll
                    titleComponent={
                        <div className="flex flex-col items-center justify-center min-h-[70vh] pb-20 pt-16">

                            {/* Brand Header - Refined & Professional */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="mb-12 text-center relative z-20"
                            >
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">System Online</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                </div>

                                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-3">
                                    ACAD<span className="font-light text-neutral-400">VERSE</span>
                                </h1>

                                <p className="text-neutral-500 text-xs md:text-sm tracking-[0.1em] font-medium max-w-md mx-auto leading-relaxed">
                                    NEXT GEN INTELLIGENCE VAULT
                                </p>
                            </motion.div>

                            {/* Ultra-Premium Auth Card */}
                            <div className="relative w-full max-w-[380px] mx-auto group perspective-1000">

                                {/* Card Container */}
                                <div className="relative bg-[#0A0A0A] rounded-[20px] border border-white/[0.08] shadow-2xl overflow-hidden ring-1 ring-white/[0.02]">

                                    {/* Subtle Top Highlight */}
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50" />

                                    <div className="p-8">
                                        {/* Tab Switcher - Minimalist */}
                                        <div className="flex w-full mb-8 border-b border-white/[0.06] pb-1">
                                            {['login', 'register'].map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTab(tab)}
                                                    className={`flex-1 pb-3 text-xs font-medium tracking-wide transition-all duration-300 relative ${activeTab === tab ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'
                                                        }`}
                                                >
                                                    {tab === 'login' ? 'LOGIN' : 'REGISTER'}
                                                    {activeTab === tab && (
                                                        <motion.div
                                                            layoutId="activeTabLine"
                                                            className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-indigo-500"
                                                        />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <form onSubmit={handleAuthAction} className="space-y-4">
                                            {activeTab === 'register' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <Input
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Full Name"
                                                        required
                                                        className="h-12 bg-neutral-900/50 border-white/[0.05] text-white placeholder:text-neutral-600 rounded-lg text-sm px-4 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-neutral-900 transition-all font-light"
                                                    />
                                                </motion.div>
                                            )}

                                            <div className="space-y-4">
                                                <Input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Email Address"
                                                    type="email"
                                                    required
                                                    className="h-12 bg-neutral-900/50 border-white/[0.05] text-white placeholder:text-neutral-600 rounded-lg text-sm px-4 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-neutral-900 transition-all font-light"
                                                />
                                                <Input
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    type="password"
                                                    placeholder="Password"
                                                    required
                                                    className="h-12 bg-neutral-900/50 border-white/[0.05] text-white placeholder:text-neutral-600 rounded-lg text-sm px-4 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-neutral-900 transition-all font-light"
                                                />
                                            </div>

                                            <div className="pt-4 space-y-3">
                                                <Button
                                                    disabled={isLoading}
                                                    className="w-full h-12 bg-white text-black hover:bg-neutral-200 text-xs font-semibold tracking-wide rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                                                >
                                                    {isLoading ? (
                                                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                    ) : (
                                                        activeTab === 'login' ? 'ENTER VAULT' : 'CREATE ACCOUNT'
                                                    )}
                                                </Button>

                                                <div className="flex items-center gap-3 my-4">
                                                    <div className="h-px bg-white/[0.05] flex-1" />
                                                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Or</span>
                                                    <div className="h-px bg-white/[0.05] flex-1" />
                                                </div>

                                                <div className="w-full flex justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                                    <GoogleLogin
                                                        onSuccess={handleGoogleSuccess}
                                                        onError={() => toast.error("Google Auth Failed")}
                                                        theme="filled_black"
                                                        shape="rectangular"
                                                        size="large"
                                                        width="100%"
                                                        text="continue_with"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="px-8 pb-6 text-center">
                                        <p className="text-[10px] text-neutral-600">
                                            Everything you need, <span className="text-neutral-500">in one place.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col">
                        {/* MacBook Camera & Bezel */}
                        <div className="h-8 bg-black flex items-center justify-center border-b border-white/5 relative z-20">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/30 ring-1 ring-white/10" />
                        </div>

                        {/* Screen Content */}
                        <div className="flex-1 relative flex items-center justify-center bg-[#0a0a0a] overflow-hidden">

                            {/* Access Granted Overlay - Only on Unlock */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                {screenState === 'unlocked' && (
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center mx-auto mb-6"
                                        >
                                            <div className="w-8 h-8 text-emerald-500">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                        </motion.div>
                                        <div className="text-3xl font-bold text-white tracking-tight">Access Granted</div>
                                        <div className="text-emerald-400 font-mono text-sm mt-2">Redirecting to Vault...</div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Grid Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                        </div>
                    </div>
                </ContainerScroll>
            </motion.div>
        </div>
    );
};

export default AuthLanding;