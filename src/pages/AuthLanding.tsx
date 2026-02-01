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


// import { useState, useEffect, useLayoutEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
// import { ContainerScroll } from "@/components/ui/container-scroll-animation";
// import { Mail, Lock } from "lucide-react";

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

//                                                 {/* MODIFIED LOGIN SECTION START */}
//                                                 <TabsContent value="login">
//                                                     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//                                                         <div className="space-y-4">

//                                                             {/* Email Input Field */}
//                                                             <div className="relative group">
//                                                                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
//                                                                     <Mail className="w-4 h-4" />
//                                                                 </div>
//                                                                 <Input 
//                                                                     placeholder="user@pict.edu" 
//                                                                     className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl" 
//                                                                 />
//                                                             </div>

//                                                             {/* Password Input Field */}
//                                                             <div className="relative group">
//                                                                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
//                                                                     <Lock className="w-4 h-4" />
//                                                                 </div>
//                                                                 <Input 
//                                                                     type="password" 
//                                                                     placeholder="••••••••" 
//                                                                     className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl" 
//                                                                 />
//                                                             </div>

//                                                         </div>

//                                                         <Button disabled={isLoading} className="w-full h-11 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-500/30">
//                                                             {isLoading ? (
//                                                                 <span className="animate-pulse flex items-center gap-2">
//                                                                     VERIFYING <span className="w-1 h-1 bg-white rounded-full animate-bounce"/>
//                                                                 </span>
//                                                             ) : "ACCESS TERMINAL"}
//                                                         </Button>
//                                                     </form>
//                                                 </TabsContent>
//                                                 {/* MODIFIED LOGIN SECTION END */}

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

import { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const AuthLanding = () => {
    const navigate = useNavigate();
    const { login, register, googleLogin, isAuthenticated } = useAuth();
    const [isExiting, setIsExiting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [screenState, setScreenState] = useState<'locked' | 'unlocked'>('locked');

    // Login form state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register form state
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    // ✅ 1. Force top scroll on mount to ensure AuthLanding starts clean
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ✅ 2. Manage Scroll Restoration to prevent browser from remembering the scroll position
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

    // Function to handle the scroll-and-enter sequence
    const triggerEntrySequence = () => {
        // 1. Scroll down to straighten the screen (Animation)
        window.scrollTo({
            top: window.innerHeight * 1.2,
            behavior: "smooth"
        });

        // 2. Unlock screen (visual change)
        setTimeout(() => {
            setScreenState('unlocked');
        }, 600);

        // 3. Trigger Zoom In (Exit) animation
        setTimeout(() => {
            setIsExiting(true);
        }, 1300);

        // 4. Navigate & RESET SCROLL
        setTimeout(() => {
            // ❗ CRITICAL FIX: Instantly jump to top before route change
            // This ensures /home loads at the Hero section, not scrolled down.
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });

            navigate("/home");
        }, 3600);
    };

    const handleGuestLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            triggerEntrySequence();
        }, 800);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loginEmail || !loginPassword) {
            toast.error("Validation Error", { description: "Please fill in all fields" });
            return;
        }

        setIsLoading(true);
        try {
            await login(loginEmail, loginPassword);
            // Success toast is handled in AuthContext
            triggerEntrySequence();
        } catch (error) {
            // Error toast is handled in AuthContext
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            toast.error("Google Sign-In Failed", { description: "No credential received" });
            return;
        }

        setIsLoading(true);
        try {
            await googleLogin(credentialResponse.credential);
            triggerEntrySequence();
        } catch (error) {
            toast.error("Google Sign-In Failed", {
                description: error instanceof Error ? error.message : "Please try again"
            });
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!registerName || !registerEmail || !registerPassword) {
            toast.error("Validation Error", { description: "Please fill in all fields" });
            return;
        }

        if (registerPassword.length < 6) {
            toast.error("Validation Error", { description: "Password must be at least 6 characters" });
            return;
        }

        setIsLoading(true);
        try {
            await register(registerName, registerEmail, registerPassword);
            // Success toast is handled in AuthContext
            triggerEntrySequence();
        } catch (error) {
            // Error toast is handled in AuthContext
            setIsLoading(false);
        }
    };

    return (
        <div className="relative bg-[#030303] flex flex-col items-center justify-center font-sans selection:bg-indigo-500/30 overflow-x-hidden min-h-screen">

            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.05),transparent_70%)] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

            <motion.div
                className="w-full"
                initial={{ y: "100%" }}
                animate={isExiting ? { scale: 15, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                style={{ transformOrigin: "center 75%" }}
            >
                <ContainerScroll
                    titleComponent={
                        <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20">
                            {/* Header Text */}
                            <div className="mb-12">
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                                    <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase">System Online</span>
                                </div>
                                <h1 className="text-4xl md:text-8xl font-medium text-white tracking-tight mb-6 leading-[1.1]">
                                    Academic <br />
                                    <span className="text-neutral-500 font-serif italic">Intelligence.</span>
                                </h1>
                            </div>

                            {/* Auth Forms */}
                            <div className="w-full max-w-sm relative z-20">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
                                    <Card className="bg-[#0A0A0A]/80 border-white/[0.08] shadow-2xl relative backdrop-blur-3xl">
                                        <CardHeader className="pt-6 pb-4 text-center border-b border-white/[0.03]">
                                            <CardTitle className="text-white text-sm font-medium tracking-wide">Identity Verification</CardTitle>
                                            <CardDescription className="text-neutral-600 text-[10px] uppercase tracking-wider">Secure Access Protocol</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-6 space-y-4">
                                            <Tabs defaultValue="login" className="w-full">
                                                <TabsList className="grid w-full grid-cols-2 h-8 bg-white/[0.03] p-1 border border-white/[0.05] rounded-lg">
                                                    <TabsTrigger value="login" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">LOGIN</TabsTrigger>
                                                    <TabsTrigger value="register" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">REGISTER</TabsTrigger>
                                                </TabsList>

                                                {/* MODIFIED LOGIN SECTION START */}
                                                <TabsContent value="login">
                                                    <form onSubmit={handleLogin} className="space-y-4 mt-6">
                                                        <div className="space-y-4">

                                                            {/* Email Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <Mail className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="user@pict.edu"
                                                                    value={loginEmail}
                                                                    onChange={(e) => setLoginEmail(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                            {/* Password Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <Lock className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                    value={loginPassword}
                                                                    onChange={(e) => setLoginPassword(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                        </div>

                                                        <Button disabled={isLoading} className="w-full h-11 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-500/30">
                                                            {isLoading ? (
                                                                <span className="animate-pulse flex items-center gap-2">
                                                                    VERIFYING <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
                                                                </span>
                                                            ) : "ACCESS TERMINAL"}
                                                        </Button>
                                                    </form>
                                                </TabsContent>
                                                {/* MODIFIED LOGIN SECTION END */}

                                                <TabsContent value="register">
                                                    <form onSubmit={handleRegister} className="space-y-4 mt-6">
                                                        <div className="space-y-4">

                                                            {/* Name Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <User className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    placeholder="Full Name"
                                                                    value={registerName}
                                                                    onChange={(e) => setRegisterName(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                            {/* Email Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <Mail className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="user@pict.edu"
                                                                    value={registerEmail}
                                                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                            {/* Password Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <Lock className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                    value={registerPassword}
                                                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                        </div>

                                                        <Button disabled={isLoading} className="w-full h-11 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-500/30">
                                                            {isLoading ? (
                                                                <span className="animate-pulse flex items-center gap-2">
                                                                    CREATING ACCOUNT <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
                                                                </span>
                                                            ) : "CREATE ACCOUNT"}
                                                        </Button>
                                                    </form>
                                                </TabsContent>
                                            </Tabs>

                                            <div className="relative py-2">
                                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
                                                <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-[#0A0A0A] px-2 text-neutral-600">Or Continue With</span></div>
                                            </div>

                                            {/* Google Sign-In Button */}
                                            <div className="flex justify-center w-full">
                                                <GoogleLogin
                                                    onSuccess={handleGoogleLogin}
                                                    onError={() => {
                                                        toast.error("Google Sign-In Failed", { description: "Please try again" });
                                                    }}
                                                    theme="filled_black"
                                                    size="large"
                                                    text="continue_with"
                                                    shape="rectangular"
                                                    width="100%"
                                                />
                                            </div>

                                            <div className="relative py-2">
                                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
                                                <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-[#0A0A0A] px-2 text-neutral-600">Guest Access</span></div>
                                            </div>

                                            <Button variant="ghost" onClick={handleGuestLogin} disabled={isLoading} className="w-full h-9 border border-white/[0.05] bg-transparent hover:bg-white/[0.03] text-neutral-500 hover:text-white text-[10px] font-medium tracking-wider rounded-lg uppercase">
                                                Guest Session
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="w-full h-full bg-[#0A0A0A] relative overflow-hidden flex flex-col">
                        {/* Top Bar of the 'MacBook' */}
                        <div className="h-6 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5">
                            <div className="w-2 h-2 rounded-full bg-red-500/20" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                            <div className="w-2 h-2 rounded-full bg-green-500/20" />
                        </div>

                        {/* Main Screen Content - Dashboard Preview */}
                        <div className="flex-1 relative bg-black flex items-center justify-center">

                            {/* Locked State */}
                            {screenState === 'locked' && (
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <div className="w-16 h-16 mb-4 rounded-full border border-white/10 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                    </div>
                                    <div className="text-neutral-500 font-mono text-xs tracking-[0.2em]">SYSTEM LOCKED</div>
                                </div>
                            )}

                            {/* Validated/Unlocked State */}
                            {screenState === 'unlocked' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-20 bg-cover bg-center"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)'
                                    }}
                                >
                                    {/* Mock Dashboard UI */}
                                    <div className="p-8">
                                        <div className="h-20 w-3/4 bg-white/5 rounded-xl mb-4 animate-pulse" />
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-75" />
                                            <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-100" />
                                            <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-150" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-white mb-2 tracking-tighter">PICT ExamOrbit</div>
                                            <div className="text-sm text-green-500 font-mono">ACCESS GRANTED</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                        </div>
                    </div>
                </ContainerScroll>
            </motion.div>
        </div>
    );
};

export default AuthLanding;