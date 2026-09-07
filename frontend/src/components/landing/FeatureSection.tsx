import Link from "next/link";
import { ArrowRight, Target, Globe, Users, Zap, Search } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="bg-white py-24 relative z-10 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
            High Quality Meeting <br />
            <span className="text-brand-purple">Transcription</span> & <span className="text-brand-purple">Recording</span>
          </h2>
          <div className="mt-8 mb-16">
            <Link 
              href="/home"
              className="inline-flex bg-brand-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-purple-hover transition-colors items-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <Target className="text-gray-800 mb-3" size={24} />
              <h3 className="font-bold text-lg mb-2">95% Accurate</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fireflies is the industry leader in transcription accuracy.
              </p>
            </div>
            <div>
              <Globe className="text-gray-800 mb-3" size={24} />
              <h3 className="font-bold text-lg mb-2">100+ Languages</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Transcribe meetings in English, Spanish, French, & several others.
              </p>
            </div>
            <div>
              <Users className="text-gray-800 mb-3" size={24} />
              <h3 className="font-bold text-lg mb-2">Speaker Recognition</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fireflies identifies different speakers in meetings and audio files.
              </p>
            </div>
            <div>
              <Zap className="text-gray-800 mb-3" size={24} />
              <h3 className="font-bold text-lg mb-2">Auto-Language Detection</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Automatically switch languages from meeting to meeting with ease.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: UI Mockup */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden h-[500px] flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">Transcript</h3>
          </div>
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="flex gap-4">
              <img src="https://i.pravatar.cc/150?img=47" className="w-8 h-8 rounded-full" />
              <div>
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="font-semibold text-gray-900">Cate</span>
                  <span className="text-brand-purple">00:53</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  There's some concern about onboarding. Clients feel it's not intuitive enough.
                </p>
                <div className="text-cyan-500">🔖</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">R</div>
              <div>
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="font-semibold text-gray-900">Rohan</span>
                  <span className="text-brand-purple">01:24</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Noted. We'll pass that to product. On the seating front, how are we doing with capacity?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">T</div>
              <div>
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="font-semibold text-gray-900">Tom</span>
                  <span className="text-brand-purple">01:47</span>
                </div>
                <div className="h-4 bg-gray-100 rounded w-48 mt-1"></div>
              </div>
            </div>
            
            <div className="flex gap-4 opacity-50">
              <img src="https://i.pravatar.cc/150?img=47" className="w-8 h-8 rounded-full" />
              <div>
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="font-semibold text-gray-900">Cate</span>
                  <span className="text-brand-purple">02:19</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
