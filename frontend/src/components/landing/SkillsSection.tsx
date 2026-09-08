"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

interface SkillCard {
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

interface CategorySkills {
  id: string;
  label: string;
  skills: SkillCard[];
}

const CATEGORIES: CategorySkills[] = [
  {
    id: "sales",
    label: "Sales",
    skills: [
      {
        title: "BANT App",
        description: "Extract the budget, authority, need and timeline from meetings.",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Churn Risk Analyzer",
        description: "Identify potential indicators of customer churn.",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Customer Objection Tracker",
        description: "List down objections or concerns raised by the customer.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Follow-Up Email Generator",
        description: "Generate follow up email for the deal.",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
  {
    id: "recruiting",
    label: "Recruiting",
    skills: [
      {
        title: "Performance Review",
        description: "Craft clear and concise performance review for employees.",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Conflict Detector",
        description: "Identify potential conflicts or disagreements in meetings.",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Attendee Contribution",
        description: "Highlight individual contribution in meetings.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Job Description Constructor",
        description: "Create job role based on discussed role requirements.",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    skills: [
      {
        title: "Product Launch Planning",
        description: "Create a product launch plan based on the next steps",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Content Calendar Generator",
        description: "Create content calendars based on strategy discussions",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Campaign Performance Review",
        description: "Extract key metrics from campaign review meetings.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Customer Journey Tracker",
        description: "List out how the customer first learned about your product.",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
  {
    id: "user_research",
    label: "User Research",
    skills: [
      {
        title: "User Interview",
        description: "Capture key insights from your user research conversations.",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Competition Analyzer",
        description: "Analyze market threats or competitions based on the discussion.",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Feedback Extractor",
        description: "Capture feedback shared by users inside the meeting.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Use-Case Extractor",
        description: "Extract specific use-case mentioned during the meeting",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    skills: [
      {
        title: "Daily Stand-Up",
        description: "Summarize action items and blockers in your daily standups.",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Goal Progress Tracker",
        description: "Track progress towards goals discussed in meetings.",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Issue Extractor",
        description: "Extract issues mentioned during the meeting.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Resource Needs Indentifier",
        description: "Identify resource requirements mentioned in meetings.",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    skills: [
      {
        title: "Budget Allocation Advisor",
        description: "Suggest optimal budget allocation based on dicussions.",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Customer Profile Generator",
        description: "Create a profile of the customer based on advisory call.",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Cost Benefit Analysis",
        description: "Provide detailed cost-benefit analysis for discussed projects.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Financial Data Categorizer",
        description: "Categorizes the financial data from the meeting.",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    skills: [
      {
        title: "Patient Symptom Summarizer",
        description: "Summarize patient symptoms from medical consultations.",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Diagnosis Insights Generator",
        description: "Summarizes potential diagnoses based on the consultation",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Patient History Tracker",
        description: "Creates a concise summary of a patient's medical history.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Health Data Insights",
        description: "Summarizes trends patient self-reports for health monitoring.",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
  {
    id: "media_podcasting",
    label: "Media & Podcasting",
    skills: [
      {
        title: "Ad Segment Extractor",
        description: "Identify and isolate ad segments for streamlined editing.",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Blog Converter",
        description: "Generate well-structured blog posts from podcast.",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Interview Insights Generator",
        description: "Summarize guest interviews, insights, and unique perspectives.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Podcast Growth Insights",
        description: "Analyze audience engagement trends and performance.",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
  {
    id: "venture_capital",
    label: "Venture Capital",
    skills: [
      {
        title: "Pitch Deck Evaluator",
        description: "Score founder pitches, TAM estimates, and competitive advantages.",
        iconBg: "bg-[#fdbba7]",
        iconColor: "text-white",
      },
      {
        title: "Due Diligence Checklist",
        description: "Extract key financial, legal, and technical diligence questions.",
        iconBg: "bg-[#fba8d6]",
        iconColor: "text-white",
      },
      {
        title: "Portfolio Quarterly Update",
        description: "Track portfolio company MoM growth, ARR, and hiring updates.",
        iconBg: "bg-[#a5b4fc]",
        iconColor: "text-white",
      },
      {
        title: "Term Sheet Notes",
        description: "Summarize valuation, liquidation preferences, and board seat terms.",
        iconBg: "bg-[#67e8f9]",
        iconColor: "text-white",
      },
    ],
  },
];

export default function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [key, setKey] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance tabs every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveCategoryIndex((prev) => (prev + 1) % CATEGORIES.length);
      setKey((prevKey) => prevKey + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [activeCategoryIndex, isPaused]);

  const handleTabClick = (index: number) => {
    setActiveCategoryIndex(index);
    setKey((prevKey) => prevKey + 1);
  };

  const currentCategory = CATEGORIES[activeCategoryIndex];

  return (
    <section className="bg-white py-24 md:py-32 relative z-10 text-center select-none overflow-hidden border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title & Subtitle Header */}
        <h2 className="text-4xl sm:text-5xl md:text-[54px] font-black mb-6 tracking-tight text-gray-900 leading-tight">
          Go <span className="text-[#7b52f6]">Beyond Notetaking</span> With <br />
          200+ AI Skills
        </h2>
        
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
          AI Skills help you automatically extract key details, generate follow-up emails, score candidates, and other insights from your meetings.<br />
          <span className="font-bold text-gray-900 cursor-pointer hover:text-[#7b52f6] underline underline-offset-4">Browse</span>
        </p>

        {/* Call to Action Button */}
        <div className="mb-14">
          <Link 
            href="/home"
            className="inline-flex bg-[#7b52f6] hover:bg-[#6842d1] text-white px-7 py-3.5 rounded-xl font-bold text-base transition-all duration-200 items-center gap-2.5 shadow-lg hover:shadow-xl shadow-purple-500/25 hover:scale-[1.02]"
          >
            Get Started <ArrowRight size={18} />
          </Link>
        </div>

        {/* Tab Pills with Animated Timer Bar */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14 max-w-5xl mx-auto">
          {CATEGORIES.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;

            return (
              <button 
                key={cat.id}
                onClick={() => handleTabClick(idx)}
                className={`relative px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer overflow-hidden ${
                  isActive 
                    ? "bg-[#1d1836] text-white shadow-md" 
                    : "bg-gray-100/90 text-gray-700 hover:bg-gray-200/90 hover:text-gray-900 border border-gray-100"
                }`}
              >
                <span className="relative z-10">{cat.label}</span>

                {/* Animated Timer Progress Bar under active pill */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-900/40 overflow-hidden rounded-b-xl">
                    <div
                      key={key}
                      className={`h-full bg-[#7b52f6] animate-tabs-progress ${
                        isPaused ? "paused" : ""
                      }`}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Cards Stack with Smooth Transition & Hover Pause */}
        <div 
          className="max-w-2xl mx-auto flex flex-col gap-4 text-left relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {currentCategory.skills.map((skill, idx) => (
            <div 
              key={`${currentCategory.id}-${idx}`}
              className="bg-white border border-gray-100 p-4.5 sm:p-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex items-center gap-4.5 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer animate-fadeIn"
            >
              <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-xl ${skill.iconBg} flex items-center justify-center ${skill.iconColor} shrink-0 shadow-xs`}>
                <Plus size={24} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-gray-900 text-base sm:text-lg mb-0.5 tracking-tight">
                  {skill.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-normal">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}

          {/* 5th "Create New" Card matching Fireflies screenshot */}
          <div 
            key={`${currentCategory.id}-create-new`}
            className="bg-gradient-to-b from-white via-white to-emerald-50/60 border border-gray-100 p-4.5 sm:p-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4.5 hover:shadow-md hover:border-emerald-200/80 transition-all duration-200 cursor-pointer animate-fadeIn"
          >
            <div className="flex items-center gap-4.5 flex-1 min-w-0">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-emerald-100/90 text-emerald-500 flex items-center justify-center shrink-0 shadow-xs">
                <Plus size={24} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-gray-900 text-base sm:text-lg mb-0.5 tracking-tight">
                  Create New
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-normal">
                  Add prompts to tailor meeting summaries to fit your needs.
                </p>
              </div>
            </div>

            <button className="bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 px-4.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer">
              Create
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
