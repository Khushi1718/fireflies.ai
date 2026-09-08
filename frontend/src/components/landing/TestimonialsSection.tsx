interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Lee McMahon",
    role: "Co founder @Clara",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "Fireflies cuts down on additional calls with customers, letting us focus directly on solutions."
  },
  {
    name: "Achintya Gupta",
    role: "Co founder @Phyllo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "Super impressed with how Fireflies helps us analyze what our customers actually need!"
  },
  {
    name: "Matias Rodsevich",
    role: "CEO @PR Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    quote: "Fireflies brought more structure into our meetings and more transparency within our company."
  },
  {
    name: "Sarah Jenkins",
    role: "VP Product @TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    quote: "The AI summaries save our product team over 10 hours every week. It's an indispensable assistant."
  },
  {
    name: "David Chen",
    role: "Head of Sales @GrowthScale",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    quote: "Closing deals is 30% faster because all action items and key discussion points are captured effortlessly."
  },
  {
    name: "Elena Rostova",
    role: "Director of Eng @DevMatrix",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quote: "Sprint planning and daily standups have never been more efficient. The integrations work flawlessly."
  }
];

interface G2BadgeProps {
  title: string;
  category?: string;
  season?: string;
  type?: "leader" | "performer" | "setup" | "roi";
}

function G2ShieldBadge({ title, category, season = "WINTER 2025", type = "performer" }: G2BadgeProps) {
  const isLeader = type === "leader";
  const bannerBg = isLeader ? "bg-[#FF4015]" : "bg-[#1E293B]";

  return (
    <div className="flex flex-col items-center hover:scale-[1.06] transition-transform duration-200 cursor-pointer select-none">
      <div className="w-[84px] sm:w-[90px] h-[110px] sm:h-[118px] relative drop-shadow-sm">
        <svg viewBox="0 0 100 130" className="w-full h-full">
          {/* Main Shield Outer Border & Background */}
          <path
            d="M 5 12 C 5 12 50 2 95 12 C 95 12 95 90 95 90 C 95 108 50 126 50 126 C 50 126 5 108 5 90 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="2.5"
          />
          {/* Inner Shield Accent line */}
          <path
            d="M 9 15 C 9 15 50 6 91 15 C 91 15 91 88 91 88 C 91 104 50 121 50 121 C 50 121 9 104 9 88 Z"
            fill="#FFFFFF"
          />
        </svg>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-between pt-2.5 pb-3 px-1.5 text-center">
          {/* G2 Logo Icon */}
          <div className="flex items-center justify-center">
            <span className="text-[#FF4015] font-black text-xs tracking-tighter">G2</span>
          </div>

          {/* Badge Title */}
          <div className="flex flex-col items-center my-auto px-0.5">
            <span className="text-[9px] sm:text-[9.5px] font-black text-gray-900 leading-tight uppercase tracking-tight">
              {title}
            </span>
            {category && (
              <span className="text-[7px] sm:text-[7.5px] font-bold text-gray-500 uppercase tracking-tighter mt-0.5">
                {category}
              </span>
            )}
          </div>

          {/* Bottom Banner Ribbon */}
          <div className={`w-[84%] py-0.5 rounded-xs ${bannerBg} text-white text-[6.5px] sm:text-[7px] font-extrabold uppercase tracking-wider text-center shadow-xs`}>
            {season}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  // Duplicate array for smooth infinite marquee
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-white py-24 md:py-32 relative z-10 text-gray-900 select-none overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        
        <h2 className="text-4xl sm:text-5xl md:text-[54px] font-semibold text-gray-900 tracking-tight leading-tight mb-4">
          Don't Take Our Word For It
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl font-normal max-w-2xl mx-auto">
          See why thousands of organizations are switching to Fireflies
        </p>

      </div>

      {/* Moving Reviews Marquee Container */}
      <div className="relative w-full overflow-hidden mb-24 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 sm:before:w-32 before:bg-gradient-to-r before:from-white before:to-transparent before:z-20 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 sm:after:w-32 after:bg-gradient-to-l after:from-white after:to-transparent after:z-20">
        <div className="animate-marquee py-3">
          {marqueeItems.map((item, idx) => (
            <div 
              key={idx}
              className="w-[340px] sm:w-[400px] shrink-0 bg-white border border-gray-100/90 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-gray-200 p-6 sm:p-7 rounded-2xl mx-3.5 transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-xs" 
                />
                <div>
                  <h4 className="font-extrabold text-gray-900 text-[15px] leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-xs font-semibold text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-[14.5px] sm:text-[15px] font-medium leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* G2 Badges Section matching Fireflies Image 4 */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6">
          <G2ShieldBadge title="High Performer" category="Enterprise" season="WINTER 2025" type="performer" />
          <G2ShieldBadge title="Leader" category="Small Business" season="WINTER 2025" type="leader" />
          <G2ShieldBadge title="Easiest Setup" category="Mid-Market" season="WINTER 2025" type="setup" />
          <G2ShieldBadge title="Leader" season="WINTER 2025" type="leader" />
          <G2ShieldBadge title="Momentum Leader" season="WINTER 2025" type="leader" />
          <G2ShieldBadge title="High Performer" category="Mid-Market" season="WINTER 2025" type="performer" />
          <G2ShieldBadge title="Fastest Implementation" season="WINTER 2025" type="setup" />
          <G2ShieldBadge title="Leader" category="Mid-Market" season="WINTER 2025" type="leader" />
          <G2ShieldBadge title="Best Est. ROI" category="Small Business" season="WINTER 2025" type="roi" />
        </div>
      </div>
    </section>
  );
}

