import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export default function SkillsSection() {
  const tabs = [
    "Sales", "Recruiting", "Marketing", "User Research", 
    "Engineering", "Finance", "Healthcare", "Media & Podcasting", "Venture Capital"
  ];

  return (
    <section className="bg-white py-24 relative z-10 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-[44px] font-bold mb-6 tracking-tight text-gray-900">
          Go <span className="text-brand-purple">Beyond Notetaking</span> With <br />
          200+ AI Skills
        </h2>
        
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          AI Skills help you automatically extract key details, generate follow-up emails, score candidates, and other insights from your meetings.<br/>
          <span className="font-medium text-gray-700 cursor-pointer hover:text-brand-purple">Browse</span>
        </p>

        <div className="mb-16">
          <Link 
            href="/home"
            className="inline-flex bg-brand-purple text-white px-8 py-3 rounded-md font-medium hover:bg-brand-purple-hover transition-colors items-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tabs.map((tab) => (
            <button 
              key={tab}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === "Marketing" 
                  ? "bg-brand-dark text-white shadow-md" 
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Stack */}
        <div className="max-w-2xl mx-auto flex flex-col gap-4 text-left">
           <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-[#fdbba7] flex items-center justify-center text-white shrink-0">
                 <Plus size={24} />
              </div>
              <div>
                 <h4 className="font-semibold text-gray-900 text-[15px]">Product Launch Planning</h4>
                 <p className="text-sm text-gray-500">Create a product launch plan based on the next steps</p>
              </div>
           </div>

           <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-[#fba8d6] flex items-center justify-center text-white shrink-0">
                 <Plus size={24} />
              </div>
              <div>
                 <h4 className="font-semibold text-gray-900 text-[15px]">Content Calendar Generator</h4>
                 <p className="text-sm text-gray-500">Create content calendars based on strategy discussions</p>
              </div>
           </div>

           <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer opacity-50 translate-y-2 scale-95 origin-top">
              <div className="w-12 h-12 rounded-lg bg-blue-300 flex items-center justify-center text-white shrink-0"></div>
              <div>
                 <h4 className="font-semibold text-gray-900 text-[15px]">Campaign Performance Review</h4>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
