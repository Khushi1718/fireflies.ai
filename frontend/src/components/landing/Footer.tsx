import Link from "next/link";
import { QrCode } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-12">
          
          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-2">Product</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Notetaker</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">AI Assistant</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Daily Brief</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Email Assistant</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Live Assist</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Voice Agents</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Slack Assistant</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Conversation intelligence</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Chrome Extension</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">AI Skills Store</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">API</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Security</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors leading-relaxed mt-1">Trust Center (SOC2, HIPAA, GDPR)</Link>
          </div>

          {/* Use Cases */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-2">Use Cases</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Sales</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Recruiting</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Marketing</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Product & User Research</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Collaboration</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Engineering</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Venture Capital</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Healthcare</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Podcasting</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Real Estate</Link>
          </div>

          {/* Integrations */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-2">Integrations</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">All integrations</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Video conferencing</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Audio recording</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">CRM</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Dialers</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Collaboration</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Storage</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-2">Company</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Partnership</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">HIPAA</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            
            <h4 className="font-bold text-base mt-6 mb-2">Learn</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Guide | Help center</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Fireflies Community</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Product Announcements</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Customers</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Fireflies for Startups</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Media kit</Link>
          </div>

          {/* Download */}
          <div className="flex flex-col gap-3 col-span-2 lg:col-span-3 lg:pl-12">
            <h4 className="font-bold text-base mb-2">Download</h4>
            <div className="bg-white p-2 rounded-lg w-fit mb-4">
              <QrCode size={100} className="text-black" />
            </div>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Desktop App</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">iOS App</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Android App</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Chrome Extension</Link>

            <h4 className="font-bold text-base mt-6 mb-2">Contact & Help</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Report bug</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact us</Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
