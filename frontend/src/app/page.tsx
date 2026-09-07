import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProductPreview from "@/components/landing/ProductPreview";
import LogosSection from "@/components/landing/LogosSection";
import FeatureSection from "@/components/landing/FeatureSection";
import SummariesSection from "@/components/landing/SummariesSection";
import CaptureSection from "@/components/landing/CaptureSection";
import SearchSection from "@/components/landing/SearchSection";
import LiveAssistSection from "@/components/landing/LiveAssistSection";
import InsightsSection from "@/components/landing/InsightsSection";
import KnowledgeSection from "@/components/landing/KnowledgeSection";
import McpSection from "@/components/landing/McpSection";
import SkillsSection from "@/components/landing/SkillsSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import SecuritySection from "@/components/landing/SecuritySection";
import CapabilitiesSection from "@/components/landing/CapabilitiesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import CookieBanner from "@/components/landing/CookieBanner";
import FloatingChat from "@/components/landing/FloatingChat";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-brand-darker font-sans selection:bg-brand-purple selection:text-white pb-24">
      <Header />

      {/* Hero Section with starry background */}
      <div className="pt-[140px] starry-bg min-h-screen relative overflow-hidden flex flex-col">
        {/* Subtle purple gradient glow at the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <Hero />
        
        {/* Negative margin to pull the preview up into the hero space slightly */}
        <div className="-mt-10 md:-mt-16 z-20">
          <ProductPreview />
        </div>
        
        {/* Logos section acts as the bridge between dark hero and white feature sections */}
        <div className="mt-auto">
          <LogosSection />
        </div>
      </div>

      {/* White Feature Sections */}
      <div className="bg-white">
        <FeatureSection />
      </div>
      
      {/* AI Summaries Section */}
      <SummariesSection />

      {/* Capture Section */}
      <CaptureSection />

      {/* AI Search Section */}
      <SearchSection />

      {/* Live Assist Section */}
      <LiveAssistSection />

      {/* Conversation Intelligence Insights */}
      <InsightsSection />

      {/* Knowledge Base Section */}
      <KnowledgeSection />

      {/* MCP Section */}
      <McpSection />

      {/* AI Skills Section */}
      <SkillsSection />

      {/* Integrations Section */}
      <IntegrationsSection />

      {/* Security Section */}
      <SecuritySection />

      {/* Capabilities Section */}
      <CapabilitiesSection />

      {/* Testimonials & G2 Badges */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final CTA / Footer Top */}
      <FinalCtaSection />

      {/* Footer */}
      <Footer />

      <FloatingChat />
      <CookieBanner />
    </main>
  );
}
