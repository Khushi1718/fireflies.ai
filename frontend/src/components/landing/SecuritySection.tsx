import Link from "next/link";
import { ArrowRight, Lock, EyeOff, Database, Shield } from "lucide-react";

export default function SecuritySection() {
  return (
    <section className="bg-white py-24 relative z-10 text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
           <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight flex items-center gap-3">
                 Enterprise-Grade <span className="text-brand-purple">Security</span>
                 <Lock className="text-[#10b981]" size={32} />
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                 Fireflies is the preferred platform for CIOs across the Fortune 500, offering robust admin controls and stringent security protocols.
              </p>
           </div>
           
           <Link 
             href="/home"
             className="bg-brand-purple text-white px-6 py-3 rounded font-medium hover:bg-brand-purple-hover transition-colors flex items-center gap-2 shrink-0 shadow-sm"
           >
             Get Started <ArrowRight size={18} />
           </Link>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 mb-20">
           
           <div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px] text-center leading-tight mb-4 shadow-sm">
                 AICPA<br/>SOC 2
              </div>
              <h4 className="font-bold text-[17px] mb-2 text-gray-900">SOC 2 Type II</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Fireflies follows industry standards for data security, privacy, and confidentiality.
              </p>
           </div>

           <div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs mb-4 shadow-sm relative overflow-hidden">
                 <div className="absolute inset-1 border border-dotted border-white/50 rounded-full flex items-center justify-center text-[8px] font-bold">GDPR</div>
              </div>
              <h4 className="font-bold text-[17px] mb-2 text-gray-900">GDPR</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Rigorous data protection and privacy standards in line with European regulations.
              </p>
           </div>

           <div>
              <div className="w-12 h-12 bg-[#3b4c8a] rounded-lg flex items-center justify-center text-white font-bold text-[10px] text-center leading-tight mb-4 shadow-sm">
                 HIPAA
              </div>
              <h4 className="font-bold text-[17px] mb-2 text-gray-900">HIPAA Compliant</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Complete protection for healthcare and educational organizations.
              </p>
           </div>

           <div>
              <div className="w-12 h-12 bg-[#d1fae5] rounded-lg flex items-center justify-center text-gray-700 mb-4 shadow-sm">
                 <EyeOff size={20} />
              </div>
              <h4 className="font-bold text-[17px] mb-2 text-gray-900">Zero Data Retention</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Your data is never used for AI training or any purpose outside your direct business needs.
              </p>
           </div>

           <div>
              <div className="w-12 h-12 bg-[#fce7f3] rounded-lg flex items-center justify-center text-gray-700 mb-4 shadow-sm">
                 <Database size={20} />
              </div>
              <h4 className="font-bold text-[17px] mb-2 text-gray-900">Private Storage</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Secure, dedicated cloud storage exclusively for your organization's data.
              </p>
           </div>

           <div>
              <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center text-gray-700 mb-4 shadow-sm">
                 <Shield size={20} />
              </div>
              <h4 className="font-bold text-[17px] mb-2 text-gray-900">Customer Own Their Data</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 You maintain full control and ownership of your data, explicitly stated in our Term of Service.
              </p>
           </div>

        </div>

        <div className="text-center text-gray-500 text-sm font-medium">
           ...and many more capabilities
        </div>

      </div>
    </section>
  );
}
