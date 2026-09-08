import Link from "next/link";

function FooterQrCode() {
  return (
    <div className="bg-white p-2 rounded-xl w-[105px] h-[105px] flex items-center justify-center shadow-md mb-4 shrink-0">
      <svg viewBox="0 0 29 29" className="w-full h-full fill-black">
        {/* Finder Pattern Top-Left */}
        <path d="M1 1h7v7H1V1zm2 2v3h3V3H3z" />
        <rect x="4" y="4" width="1" height="1" />

        {/* Finder Pattern Top-Right */}
        <path d="M21 1h7v7h-7V1zm2 2v3h3V3h-3z" />
        <rect x="24" y="4" width="1" height="1" />

        {/* Finder Pattern Bottom-Left */}
        <path d="M1 21h7v7H1v-7zm2 2v3h3v-3H3z" />
        <rect x="4" y="24" width="1" height="1" />

        {/* Dense QR Pattern Modules */}
        <rect x="9" y="1" width="2" height="2" />
        <rect x="12" y="2" width="3" height="1" />
        <rect x="16" y="1" width="2" height="2" />
        <rect x="19" y="3" width="1" height="2" />
        <rect x="9" y="4" width="1" height="3" />
        <rect x="11" y="5" width="2" height="1" />
        <rect x="14" y="4" width="2" height="2" />
        <rect x="17" y="5" width="3" height="1" />

        <rect x="1" y="9" width="2" height="1" />
        <rect x="4" y="10" width="2" height="2" />
        <rect x="7" y="9" width="1" height="3" />
        <rect x="9" y="8" width="3" height="2" />
        <rect x="13" y="9" width="2" height="1" />
        <rect x="16" y="8" width="2" height="3" />
        <rect x="19" y="9" width="2" height="1" />
        <rect x="22" y="9" width="3" height="2" />
        <rect x="26" y="8" width="2" height="2" />

        <rect x="2" y="12" width="2" height="2" />
        <rect x="5" y="13" width="2" height="1" />
        <rect x="8" y="12" width="2" height="2" />
        <rect x="11" y="11" width="3" height="3" />
        <rect x="15" y="12" width="2" height="2" />
        <rect x="18" y="13" width="2" height="1" />
        <rect x="21" y="12" width="2" height="2" />
        <rect x="24" y="12" width="3" height="2" />

        <rect x="1" y="15" width="3" height="2" />
        <rect x="5" y="16" width="2" height="2" />
        <rect x="9" y="15" width="1" height="3" />
        <rect x="11" y="15" width="3" height="1" />
        <rect x="15" y="15" width="2" height="3" />
        <rect x="18" y="16" width="3" height="1" />
        <rect x="22" y="15" width="2" height="2" />
        <rect x="25" y="16" width="3" height="2" />

        <rect x="9" y="19" width="2" height="2" />
        <rect x="12" y="19" width="2" height="1" />
        <rect x="15" y="19" width="3" height="2" />
        <rect x="19" y="19" width="2" height="2" />
        <rect x="22" y="19" width="2" height="1" />
        <rect x="25" y="19" width="3" height="2" />

        <rect x="9" y="22" width="3" height="2" />
        <rect x="13" y="22" width="2" height="3" />
        <rect x="16" y="23" width="2" height="2" />
        <rect x="19" y="22" width="3" height="2" />
        <rect x="23" y="22" width="2" height="3" />
        <rect x="26" y="22" width="2" height="2" />

        <rect x="9" y="25" width="2" height="3" />
        <rect x="12" y="26" width="3" height="2" />
        <rect x="16" y="26" width="2" height="2" />
        <rect x="19" y="25" width="3" height="3" />
        <rect x="24" y="26" width="4" height="2" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-12 text-white text-sm border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main 5 Columns Grid matching official Fireflies layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-20">
          
          {/* Column 1: Product */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-[15px] sm:text-base text-white mb-2">Product</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Features</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Notetaker</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">AI Assistant</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Daily Brief</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Email Assistant</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Live Assist</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Voice Agents</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Slack Assistant</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Conversation intelligence</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Chrome Extension</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">AI Skills Store</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">API</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Pricing</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Security</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px] leading-relaxed mt-1">Trust Center (SOC2, HIPAA, GDPR)</Link>
          </div>

          {/* Column 2: Use Cases */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-[15px] sm:text-base text-white mb-2">Use Cases</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Sales</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Recruiting</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Marketing</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Product & User Research</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Collaboration</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Engineering</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Venture Capital</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Healthcare</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Podcasting</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Real Estate</Link>
          </div>

          {/* Column 3: Integrations */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-[15px] sm:text-base text-white mb-2">Integrations</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">All integrations</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Video conferencing</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Audio recording</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">CRM</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Dialers</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Collaboration</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Storage</Link>
          </div>

          {/* Column 4: Company & Learn */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-[15px] sm:text-base text-white mb-2">Company</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">About</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Careers</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Partnership</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">HIPAA</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Terms of Service</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Privacy Policy</Link>
            
            <h4 className="font-bold text-[15px] sm:text-base text-white mt-6 mb-2">Learn</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Guide | Help center</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Fireflies Community</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Blog</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Product Announcements</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Customers</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Fireflies for Startups</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Media kit</Link>
          </div>

          {/* Column 5: Download & Contact & Help */}
          <div className="flex flex-col gap-2.5 col-span-2 md:col-span-1">
            <h4 className="font-bold text-[15px] sm:text-base text-white mb-2">Download</h4>
            <FooterQrCode />
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Desktop App</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">iOS App</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Android App</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Chrome Extension</Link>

            <h4 className="font-bold text-[15px] sm:text-base text-white mt-6 mb-2">Contact & Help</h4>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Report bug</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Help Center</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[13.5px]">Contact us</Link>
          </div>
          
        </div>

        {/* Bottom Row matching Image 1 */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-[13px] text-gray-400">
          
          {/* Left: Fireflies Logo Icon & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#f43f5e] rounded-[5px] flex items-center justify-center shrink-0 shadow-xs">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
              </svg>
            </div>
            <span className="text-gray-400 font-medium">© 2026 Fireflies.ai Corp. All rights reserved.</span>
          </div>

          {/* Center: Languages */}
          <div className="flex items-center gap-2 flex-wrap justify-center text-xs sm:text-[13px]">
            <span className="font-bold text-white cursor-pointer">English</span>
            <span className="text-gray-600">·</span>
            <span className="hover:text-white cursor-pointer transition-colors text-gray-400">Español</span>
            <span className="text-gray-600">·</span>
            <span className="hover:text-white cursor-pointer transition-colors text-gray-400">Deutsch</span>
            <span className="text-gray-600">·</span>
            <span className="hover:text-white cursor-pointer transition-colors text-gray-400">Français</span>
            <span className="text-gray-600">·</span>
            <span className="hover:text-white cursor-pointer transition-colors text-gray-400">Português (BR)</span>
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-4 text-gray-400">
            {/* LinkedIn */}
            <Link href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
              </svg>
            </Link>
            {/* Twitter / X */}
            <Link href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            {/* YouTube */}
            <Link href="#" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
            {/* Instagram */}
            <Link href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
