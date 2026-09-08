import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import AnimatedStarField from "@/components/landing/AnimatedStarField";
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
      <div className="pt-[105px] starry-bg relative overflow-hidden">
        {/* Animated subtle star field with soft firefly glows */}
        <AnimatedStarField />

        {/* Very soft ambient purple glow behind hero text */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none z-0"></div>
        
        <Hero />
        
        {/* Product preview */}
        <div className="z-20">
          <ProductPreview />
        </div>
        
        {/* Logos section */}
        <LogosSection />
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

      {/* AI Skills Section */}
      <SkillsSection />

      {/* MCP Section */}
      <McpSection />

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
