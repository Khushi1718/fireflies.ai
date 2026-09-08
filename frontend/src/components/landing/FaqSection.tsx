"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    { q: "What is Fireflies AI Assistant?", a: "Fireflies is an AI meeting assistant that records, transcribes, and searches your voice conversations." },
    { q: "How is Fireflies different from a regular AI notetaker?", a: "Fireflies integrates deeply with your CRM, slack, and provides extensive AI skills beyond simple summarization." },
    { q: "What are AI Skills?", a: "AI Skills are custom prompts and extractions that run automatically on your meetings." },
    { q: "What are Voice Agents?", a: "Voice agents are upcoming features to help navigate and act upon your conversations." },
    { q: "Does Fireflies work with the tools I already use?", a: "Yes, Fireflies integrates with dozens of tools including Slack, Salesforce, HubSpot, and Asana." },
    { q: "Does Fireflies connect with Claude or other AI tools?", a: "Yes, via our new MCP server you can integrate meeting data directly into Claude and ChatGPT." },
    { q: "Is my data safe with Fireflies?", a: "Absolutely. We are SOC 2 Type II, GDPR, and HIPAA compliant with zero data retention for training." },
    { q: "Does Fireflies record without people knowing?", a: "No, Fireflies announces itself or requests permission depending on your platform settings." },
    { q: "What languages does Fireflies support?", a: "We support over 100 languages for transcription." },
    { q: "Can I use Fireflies for free?", a: "Yes, we offer a generous free tier for individuals." },
    { q: "How does Fireflies handle enterprise teams?", a: "We offer dedicated workspaces, SSO, and advanced admin controls for enterprises." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 relative z-10 text-gray-900">
      <div className="max-w-3xl mx-auto px-6">
        
        <h2 className="text-4xl sm:text-5xl md:text-[54px] font-black mb-16 tracking-tight text-center text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-100 pb-4">
              <button 
                className="w-full flex items-center justify-between text-left font-semibold text-gray-800 hover:text-brand-purple transition-colors py-4"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                {openIndex === idx ? <Minus size={20} className="text-gray-400" /> : <Plus size={20} className="text-gray-400" />}
              </button>
              {openIndex === idx && (
                <div className="text-gray-600 text-sm leading-relaxed pb-4 pr-8">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm">
          Still have more questions? Please write to <a href="mailto:support@fireflies.ai" className="underline font-medium text-gray-600 hover:text-brand-purple">support@fireflies.ai</a> and we will respond as quickly as we can.
        </p>

      </div>
    </section>
  );
}
