import React from 'react';
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import ChromaGrid, { ChromaItem } from './ChromaGrid';
import SocialButtons from './SocialButtons'; // Import the new buttons

const Footer = () => {
  
  // Configuration for the 4 Creator Cards
  const creators: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=12', // Replace with real photo
      title: 'Dev One',
      subtitle: 'Full Stack Lead',
      handle: '@dev_one',
      borderColor: '#4F46E5', // Indigo
      gradient: 'linear-gradient(145deg, #312e81, #000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=33', // Replace with real photo
      title: 'Dev Two',
      subtitle: 'Frontend Architect',
      handle: '@dev_two',
      borderColor: '#10B981', // Emerald
      gradient: 'linear-gradient(145deg, #064e3b, #000)',
      url: 'https://linkedin.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=59', // Replace with real photo
      title: 'Dev Three',
      subtitle: 'Backend & Database',
      handle: '@dev_three',
      borderColor: '#F59E0B', // Amber
      gradient: 'linear-gradient(145deg, #78350f, #000)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=8', // Replace with real photo
      title: 'Dev Four',
      subtitle: 'UI/UX Designer',
      handle: '@dev_four',
      borderColor: '#EC4899', // Pink
      gradient: 'linear-gradient(145deg, #831843, #000)',
      url: 'https://twitter.com/'
    }
  ];

  return (
    <footer className="border-t border-border bg-card/50 relative z-10">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section: Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">
                PICT-ACADVERSE
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your one-stop academic universe for PICT Autonomous. Access PYQs, notes, and more.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pyqs" className="hover:text-primary transition-colors">PYQ Repository</Link></li>
              <li><Link to="/notes" className="hover:text-primary transition-colors">Notes Vault</Link></li>
              <li><Link to="/predict" className="hover:text-primary transition-colors">AI Predictions</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/forum" className="hover:text-primary transition-colors">Discussion Forum</Link></li>
              <li><Link to="/updates" className="hover:text-primary transition-colors">Exam Updates</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contribute</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Guidelines</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            {/* The new Social Buttons Component */}
            <SocialButtons />
          </div>
        </div>

        {/* Middle Section: Creators ChromaGrid
        <div className="border-t border-border/50 py-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2">Architects of the Verse</h3>
            <p className="text-muted-foreground text-sm">The minds behind PICT-ACADVERSE</p>
          </div>
          
          <div className="w-full flex justify-center">
            <ChromaGrid 
              items={creators} 
              radius={200} 
              className="justify-center"
            />
          </div>
        </div> */}

        {/* Bottom Section: Copyright */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 PICT ACADVERSE. Made with ❤️ for students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;