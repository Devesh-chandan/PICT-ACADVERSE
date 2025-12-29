import { Link } from "react-router-dom";

const YearQuickLinks = () => {
  const years = ["First", "Second", "Third", "Final"];

  return (
    <div className="animate-slide-up w-full mt-12 px-4" style={{ animationDelay: "0.5s" }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold tracking-tight text-white uppercase italic">Quick Access</h3>
          
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {years.map((year, index) => (
            <Link key={year} to={`/pyqs?year=${year}`} className="block">
              <button
                /* 'cursor-target' triggers your GSAP TargetCursor.tsx logic */
                className="cursor-target group relative px-8 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-300 rounded-lg overflow-hidden
                           /* Neon Border & Text */
                           border-2 border-[#1BFD9C] text-[#1BFD9C] 
                           /* Background Gradient & Glow */
                           bg-[linear-gradient(to_right,rgba(27,253,156,0.1)_1%,transparent_40%,transparent_60%,rgba(27,253,156,0.1)_100%)]
                           shadow-[inset_0_0_10px_rgba(27,253,156,0.4),0_0_9px_3px_rgba(27,253,156,0.1)]
                           /* Hover State */
                           hover:text-[#82ffc9] hover:shadow-[inset_0_0_10px_rgba(27,253,156,0.6),0_0_9px_3px_rgba(27,253,156,0.2)]"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                {/* Glare Sweep Effect (The :before element) */}
                <span className="absolute inset-0 top-0 -left-[4em] w-[4em] h-full 
                                 bg-[linear-gradient(to_right,transparent_1%,rgba(27,253,156,0.1)_40%,rgba(27,253,156,0.1)_60%,transparent_100%)]
                                 transition-transform duration-500 ease-in-out group-hover:translate-x-[15em]" 
                />

                {/* The Button Content */}
                <span className="relative z-10 flex items-center gap-2">
                   {year} <span className="text-[10px] opacity-70"></span>
                </span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearQuickLinks;