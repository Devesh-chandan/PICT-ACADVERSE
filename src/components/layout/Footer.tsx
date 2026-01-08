import React from 'react';
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Twitter,
  Github,
  Linkedin,
  MessageSquare,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#020617]/95 backdrop-blur-2xl pt-12 pb-6 overflow-hidden z-50">
      {/* --- Aesthetic Elements --- */}

      {/* 1. Top Gradient Line */}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

     

      {/* 2. Ambient Purple Glow (New Vibe) */}

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />



      <div className="container relative mx-auto px-6 md:px-12 z-10">

       

        {/* Main Grid: Compacted spacing (gap-8, mb-10) */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 mb-10 items-start">



          {/* 1. BRAND SECTION (Span 4) */}

          <div className="lg:col-span-4 flex flex-col items-start space-y-4">

            <Link to="/home" onClick={scrollToTop} className="flex items-center gap-3 group">

              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-600/10 border border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300">

                 <GraduationCap className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />

              </div>

              <span className="text-xl font-bold tracking-wide text-white">

                ACADVERSE<span className="text-purple-500">-UPDATES</span>

              </span>

            </Link>

           

            <p className="text-slate-400 text-sm leading-snug max-w-sm">

              Master your engineering exams with AI-driven predictions.

              The all-in-one platform tailored for PICT students.

            </p>



            <div className="flex items-center gap-2 pt-2">

               {[Twitter, Github, Linkedin].map((Icon, i) => (

                 <a key={i} href="#" className="p-2 rounded-full bg-white/5 border border-white/5 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400 text-slate-400 transition-all duration-300">

                   <Icon className="h-4 w-4" />

                 </a>

               ))}

            </div>

          </div>



          {/* 2. NAVIGATION LINKS (Span 4) */}

          <div className="lg:col-span-4 flex flex-col lg:items-center space-y-4">

            <div className="flex flex-col space-y-4 w-full max-w-[140px]">

              <h4 className="font-semibold text-white tracking-wide text-sm relative inline-block">

                Platform

                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>

              </h4>

              <ul className="space-y-3 text-sm text-slate-400">

                {['Home', 'PYQ Repository', 'Exam Updates', 'Dashboard'].map((item) => (

                  <li key={item}>

                    <Link

                      to={`/${item.toLowerCase().replace(' ', '')}`}

                      onClick={scrollToTop}

                      className="hover:text-purple-400 hover:translate-x-1 transition-all inline-block"

                    >

                      {item}

                    </Link>

                  </li>

                ))}

              </ul>

            </div>

          </div>



          {/* 3. FEEDBACK FORM (Span 4) */}

          <div className="lg:col-span-4 flex flex-col space-y-4">

            <div className="flex items-center gap-2 text-white">

              <MessageSquare className="h-4 w-4 text-purple-400" />

              <h4 className="font-semibold tracking-wide text-sm">Have a Query?</h4>

            </div>

           

            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>

              <Input

                placeholder="Your email"

                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all h-9 text-xs rounded-lg"

              />

             

              <textarea

                placeholder="Type your feedback here..."

                className="flex h-20 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 resize-none transition-all"

              />

             

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium h-9 text-xs rounded-lg shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]">

                Send Message <Send className="ml-2 h-3 w-3" />

              </Button>

            </form>

          </div>



        </div>



        {/* Bottom Bar */}

        <div className="pt-6 border-t border-white/5 flex justify-center items-center text-xs text-slate-500">

          <p>© 2026 Acadverse. Made for Engineers.</p>

        </div>

      </div>

    </footer>

  );

};
export default Footer;


