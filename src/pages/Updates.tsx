




import React, { useState, useEffect, useRef, useMemo, forwardRef, MutableRefObject, CSSProperties, HTMLAttributes } from "react";
import styled from 'styled-components';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Download,
  ExternalLink,
  AlertTriangle,
  FileText,
  Calendar as CalendarIcon,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShootingStars } from "@/components/ui/shooting-stars";

// ==========================================
// STYLED COMPONENT (Updated for White Theme)
// ==========================================
const StyledBtnWrapper = styled.div<{ $isActive: boolean }>`
  display: flex; 
  flex: 1;

  button {
   width: 100%; 
   border: none;
   
   /* COLOR LOGIC: Active = Black Text, Inactive = White Text */
   color: ${props => props.$isActive ? '#000000' : '#ffffff'};
   
   /* BACKGROUND LOGIC: Active = White, Inactive = Zinc Gradient */
   background: ${props => props.$isActive 
     ? '#ffffff' 
     : 'linear-gradient(30deg, #52525b, #71717a)'};
     
   border-radius: 12px;
   background-size: 100% auto;
   font-family: inherit;
   font-size: 11px; 
   font-weight: 700; /* Made slightly bolder for black text legibility */
   padding: 0.6em 0; 
   
   display: flex;
   justify-content: center;
   align-items: center;

   cursor: pointer;
   transition: all 0.3s ease;
   white-space: nowrap;
   opacity: ${props => props.$isActive ? '1' : '0.8'};
   
   /* Shadow: White glow for active, None for inactive */
   box-shadow: ${props => props.$isActive ? '0 0 15px rgba(255, 255, 255, 0.4)' : 'none'};
  }

  button:hover {
   background-position: right center;
   opacity: 1;
   transform: translateY(-1px);
   
   /* Hover is always White if Active, or lighter Gray if Inactive */
   background: ${props => props.$isActive ? '#ffffff' : 'linear-gradient(30deg, #71717a, #a1a1aa)'};
   
   /* Trigger Pulse Animation */
   animation: pulseWhite 1.5s infinite;
  }

  @keyframes pulseWhite {
   0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
   70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
   100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
  }
`;

// ==========================================
// HELPER: Custom RAF Loop for VariableProximity
// ==========================================
function useRafLoop(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

// ==========================================
// COMPONENT: VariableProximity
// ==========================================
interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const interpolatedSettingsRef = useRef<string[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)] as [string, number];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  useRafLoop(() => {
    if (!containerRef?.current) return;
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };
    const containerRect = containerRef.current.getBoundingClientRect();

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = calculateDistance(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        letterCenterX,
        letterCenterY
      );

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(', ');

      interpolatedSettingsRef.current[index] = newSettings;
      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      onClick={onClick}
      style={{
        display: 'inline',
        fontFamily: '"Roboto Flex", sans-serif',
        ...style
      }}
      className={className}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';


// ==========================================
// MOCK DATA
// ==========================================
const updates = [
  // --- EXAMS ---
  {
    id: 1,
    title: "End-Sem Exam Schedule",
    description: "Final timetable for Dec 2024.",
    type: "exam",
    date: "Dec 10",
    years: ["SE", "TE", "BE"],
    isNew: true,
    hasAttachment: true,
  },
  {
    id: 2,
    title: "In-Sem Remedial",
    description: "For medical cases only.",
    type: "exam",
    date: "Nov 25",
    years: ["FE"],
    isNew: false,
    hasAttachment: true,
  },
  
  // --- EVENTS ---
  {
    id: 3,
    title: "TCS Digital Drive",
    description: "Registration ends tomorrow.",
    type: "event",
    date: "Dec 05",
    years: ["BE"],
    isNew: true,
    hasAttachment: false,
  },
  {
    id: 4,
    title: "Tech Symposium '25",
    description: "Submit project abstracts.",
    type: "event",
    date: "Jan 15",
    years: ["SE", "TE", "BE"],
    isNew: false,
    hasAttachment: true,
  },
  {
    id: 5,
    title: "FE Induction",
    description: "Welcome ceremony @ Audi.",
    type: "event",
    date: "Nov 20",
    years: ["FE"],
    isNew: false,
    hasAttachment: true,
  },

  // --- UPLOADS ---
  {
    id: 6,
    title: "CN: Unit 4 Notes",
    description: "Data Link Layer handwritten.",
    type: "upload",
    date: "Today",
    years: ["TE"],
    isNew: true,
    hasAttachment: true,
  },
  {
    id: 7,
    title: "M3: 5 Years PYQs",
    description: "Fourier Series Solved.",
    type: "upload",
    date: "Yesterday",
    years: ["SE"],
    isNew: true,
    hasAttachment: true,
  },
  {
    id: 8,
    title: "BEE: Unit 2 PPT",
    description: "Kirchhoff's Laws slides.",
    type: "upload",
    date: "Nov 18",
    years: ["FE"],
    isNew: false,
    hasAttachment: true,
  }
];

// ==========================================
// COMPONENT: Column Header
// ==========================================
const ColumnHeader = ({ icon: Icon, title, colorClass, count }: any) => (
  <div className={`flex items-center justify-between p-4 rounded-t-xl bg-white/[0.03] border-x border-t border-white/10 border-b-2 ${colorClass.border}`}>
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded-md ${colorClass.bg} border ${colorClass.borderInner}`}>
        <Icon className={`w-4 h-4 ${colorClass.text}`} />
      </div>
      <h3 className="font-semibold text-white tracking-tight">{title}</h3>
    </div>
    <Badge variant="secondary" className="bg-black/40 text-white/50 border-white/10">
      {count}
    </Badge>
  </div>
);

// ==========================================
// COMPONENT: Compact Table
// ==========================================
const CompactUpdateTable = ({ data, colorClass }: { data: any[], colorClass: any }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 rounded-b-xl border-x border-b border-white/10 bg-white/[0.01] p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
          <Maximize2 className="w-5 h-5 text-white/20" />
        </div>
        <p className="text-white/30 text-xs">No updates here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-b-xl border-x border-b border-white/10 bg-white/[0.01] overflow-hidden">
      <Table>
        <TableHeader className="bg-white/[0.02]">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="w-[80px] text-white/40 text-[10px] uppercase tracking-wider font-semibold">Date</TableHead>
            <TableHead className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Details</TableHead>
            <TableHead className="text-right w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.04] transition-colors group">
              <TableCell className="align-top py-3">
                <div className={`text-xs font-mono font-medium ${colorClass.text}`}>
                  {item.date}
                </div>
              </TableCell>
              
              <TableCell className="align-top py-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white/90 leading-tight group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                    {item.isNew && (
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    )}
                  </div>
                  <span className="text-[11px] text-white/50 leading-snug line-clamp-2">
                    {item.description}
                  </span>
                </div>
              </TableCell>

              <TableCell className="align-top text-right py-3 pr-3">
                {item.hasAttachment ? (
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-white/30 hover:text-white hover:bg-white/10">
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-white/30 hover:text-white hover:bg-white/10">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// ==========================================
// MAIN PAGE
// ==========================================
const UpdatesPage = () => {
  const [selectedYear, setSelectedYear] = useState("TE");
  const containerRef = useRef<HTMLDivElement>(null);

  const getUpdates = (type: string) => {
    return updates.filter(u => 
      u.type === type && (u.years.includes(selectedYear) || u.years.includes("All"))
    );
  };

  const examData = getUpdates('exam');
  const eventData = getUpdates('event');
  const uploadData = getUpdates('upload');

  // Theme Config for Columns
  const themes = {
    exam: {
      text: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/50",
      borderInner: "border-amber-400/20"
    },
    event: {
      text: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/50",
      borderInner: "border-purple-400/20"
    },
    upload: {
      text: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/50",
      borderInner: "border-cyan-400/20"
    }
  };

  // Year mapping for buttons
  const yearOptions = [
    { id: "FE", label: "FIRST" },
    { id: "SE", label: "SECOND" },
    { id: "TE", label: "THIRD" },
    { id: "BE", label: "FOURTH" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[#00ddeb]/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND STYLES */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');

        .stars-static {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s ease-in-out infinite;
          opacity: 0.3;
        }

        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        `}
      </style>

      {/* FIXED BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
         {/* Deep space radial gradient base */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_80%)]" />
         
         {/* Static twinkling stars */}
         <div className="stars-static absolute inset-0" />
         
         {/* Moving Shooting Stars - Layer 1 (Cyan Theme) */}
         <ShootingStars
           starColor="#00ddeb"
           trailColor="#2EB9DF"
           minSpeed={15}
           maxSpeed={35}
           minDelay={1000}
           maxDelay={3000}
         />
         
         {/* Moving Shooting Stars - Layer 2 (Purple Theme) */}
         <ShootingStars
           starColor="#af40ff"
           trailColor="#5b42f3"
           minSpeed={10}
           maxSpeed={25}
           minDelay={2000}
           maxDelay={4000}
         />
         
         {/* Moving Shooting Stars - Layer 3 (White/Blue Theme) */}
         <ShootingStars
           starColor="#ffffff"
           trailColor="#00ddeb"
           minSpeed={20}
           maxSpeed={40}
           minDelay={1500}
           maxDelay={3500}
         />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header with Variable Proximity Effect */}
          <div className="text-center mb-10 space-y-2">
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center max-w-5xl mx-auto cursor-default"
              style={{ lineHeight: 1.1 }}
            >
              <VariableProximity
                label="Academic Board"
                className="text-white drop-shadow-md"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />
            </h1>
            <p className="text-white/50">Real-time updates for your academic year.</p>
          </div>

          {/* Styled Year Tabs (White Buttons) */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 w-full max-w-2xl bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
              {yearOptions.map((year) => (
                <StyledBtnWrapper 
                  key={year.id} 
                  $isActive={selectedYear === year.id}
                  onClick={() => setSelectedYear(year.id)}
                >
                  <button>
                    {year.label}
                  </button>
                </StyledBtnWrapper>
              ))}
            </div>
          </div>

          {/* 3-COLUMN GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* COLUMN 1: EXAMS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <ColumnHeader 
                icon={AlertTriangle} 
                title="Upcoming Exams" 
                colorClass={themes.exam} 
                count={examData.length}
              />
              <CompactUpdateTable data={examData} colorClass={themes.exam} />
            </motion.div>

            {/* COLUMN 2: EVENTS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <ColumnHeader 
                icon={CalendarIcon} 
                title="Events & Notices" 
                colorClass={themes.event} 
                count={eventData.length}
              />
              <CompactUpdateTable data={eventData} colorClass={themes.event} />
            </motion.div>

            {/* COLUMN 3: UPLOADS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col"
            >
              <ColumnHeader 
                icon={FileText} 
                title="Recent Uploads" 
                colorClass={themes.upload} 
                count={uploadData.length}
              />
              <CompactUpdateTable data={uploadData} colorClass={themes.upload} />
            </motion.div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpdatesPage;