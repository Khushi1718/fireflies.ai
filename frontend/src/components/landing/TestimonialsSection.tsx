export default function TestimonialsSection() {
  return (
    <section className="bg-white py-24 relative z-10 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Don't Take Our Word For It
        </h2>
        <p className="text-gray-600 text-lg mb-16">
          See why thousands of organizations are switching to Fireflies
        </p>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 text-left">
           
           <div className="bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                 <img src="https://i.pravatar.cc/150?img=11" alt="Lee McMahon" className="w-12 h-12 rounded-full" />
                 <div>
                    <h4 className="font-bold text-gray-900">Lee McMahon</h4>
                    <p className="text-sm text-gray-500">Co founder @Clara</p>
                 </div>
              </div>
              <p className="text-gray-600 text-[15px] font-medium leading-relaxed italic">
                 "Fireflies cuts down on additional calls with customers, letting us focus directly on solutions."
              </p>
           </div>

           <div className="bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                 <img src="https://i.pravatar.cc/150?img=12" alt="Achintya Gupta" className="w-12 h-12 rounded-full" />
                 <div>
                    <h4 className="font-bold text-gray-900">Achintya Gupta</h4>
                    <p className="text-sm text-gray-500">Co founder @Phyllo</p>
                 </div>
              </div>
              <p className="text-gray-600 text-[15px] font-medium leading-relaxed italic">
                 "Super impressed with how Fireflies helps us analyze what our customers actually need!"
              </p>
           </div>

           <div className="bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                 <img src="https://i.pravatar.cc/150?img=13" alt="Matias Rodsevich" className="w-12 h-12 rounded-full" />
                 <div>
                    <h4 className="font-bold text-gray-900">Matias Rodsevich</h4>
                    <p className="text-sm text-gray-500">CEO @PR Labs</p>
                 </div>
              </div>
              <p className="text-gray-600 text-[15px] font-medium leading-relaxed italic">
                 "Fireflies brought more structure into our meetings and more transparency within our company."
              </p>
           </div>

        </div>

        {/* G2 Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 opacity-90">
           {/* Mock G2 Badges - utilizing colored divs to replicate the visual weight */}
           {[
             { title: "High Performer", sub: "Enterprise 2025" },
             { title: "Leader", sub: "Small Business 2025", isLeader: true },
             { title: "Easiest Setup", sub: "Mid-Market 2025" },
             { title: "Leader", sub: "WINTER 2025", isLeader: true },
             { title: "Momentum Leader", sub: "WINTER 2025", isLeader: true },
             { title: "High Performer", sub: "Mid-Market 2025" },
             { title: "Fastest Implementation", sub: "WINTER 2025" },
             { title: "Leader", sub: "Mid-Market 2025" },
             { title: "Best Est. ROI", sub: "Small Business 2025" },
           ].map((badge, idx) => (
             <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-20 relative">
                   {/* Shield shape approximation */}
                   <div className="absolute inset-0 bg-white border border-gray-200 rounded-t-sm shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)' }}>
                      <div className="flex flex-col items-center justify-start pt-2 h-full text-center px-1">
                         <span className="text-[#f97316] font-bold text-[10px] mb-1">G</span>
                         <span className={`text-[8px] font-bold leading-tight ${badge.isLeader ? 'text-gray-900' : 'text-gray-600'}`}>
                           {badge.title}
                         </span>
                         <div className={`mt-auto mb-2 w-full py-0.5 ${badge.isLeader ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'} text-[6px] font-bold`}>
                           {badge.sub.split(' ')[0]}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
