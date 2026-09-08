import Link from "next/link";

export default function CaptureSection() {
  return (
    <section className="bg-[#fcfcfd] py-16 md:py-24 relative z-10 text-gray-900 overflow-hidden">
      <div className="max-w-[1216px] mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#101828]">
            <span className="text-[#7a5af8]">Capture</span> Meetings <span className="text-[#7a5af8]">Anywhere</span> &amp; Anytime
          </h2>
        </div>

        {/* 2 Main Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.42fr_1fr] gap-8 md:gap-10 mb-14 md:mb-18">
          
          {/* Card 1: AI Note Taker Bot */}
          <div className="relative flex flex-col justify-between rounded-3xl overflow-hidden pt-9 lg:pt-12 px-8 lg:px-12 pb-0 min-h-[480px] lg:min-h-[520px] bg-[#f4f3ff]">
            <div className="flex flex-col items-start gap-3 lg:gap-4 mb-8">
              <h3 className="text-2xl lg:text-[28px] font-bold tracking-tight text-[#101828]">
                AI Note Taker Bot
              </h3>
              <p className="text-[#475467] text-base leading-relaxed max-w-[480px]">
                Invite fred@fireflies.ai to a live meeting or have it autojoin your calendar meetings to record, transcribe, and summarize.
              </p>
            </div>
            
            <div className="w-full flex justify-center items-end mt-auto">
              <img 
                src="/images/capture-meeting-notetaker.webp" 
                alt="AI Note Taker Bot" 
                className="w-full max-w-[620px] h-auto object-contain block"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 2: Chrome Extension */}
          <div className="relative flex flex-col justify-between rounded-3xl overflow-hidden pt-9 lg:pt-12 px-8 lg:px-12 pb-0 min-h-[480px] lg:min-h-[520px] bg-[#fffaeb]">
            <div className="flex flex-col items-start gap-3 lg:gap-4 mb-8">
              <h3 className="text-2xl lg:text-[28px] font-bold tracking-tight text-[#101828]">
                Chrome Extension
              </h3>
              <p className="text-[#475467] text-base leading-relaxed">
                Automatically record your Google Meet calls and{" "}
                <Link 
                  href="https://fireflies.ai/product/chrome-extension"
                  className="text-[#101828] font-medium underline underline-offset-4 hover:text-[#7a5af8] transition-colors"
                >
                  get real-time transcripts
                </Link>
                .
              </p>
            </div>

            <div className="w-full flex justify-center items-end mt-auto">
              <img 
                src="/images/capture-meeting-extension.webp" 
                alt="Chrome Extension" 
                className="w-full max-w-[420px] h-auto object-contain block"
                loading="lazy"
              />
            </div>
          </div>

        </div>

        {/* 4 Feature Tiles: 3 in Row 1, 1 centered in Row 2 */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 max-w-5xl mx-auto">
          
          {/* Tile 1: Mobile App */}
          <div className="w-full sm:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/app-store.svg" alt="App Store" className="w-6 h-6 object-contain" />
              <img src="/images/google-play.svg" alt="Google Play" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="text-base font-semibold text-[#101828]">Mobile App</h4>
              <p className="text-sm text-[#475467] leading-relaxed">
                Transcribe and summarize in-person conversation with the{" "}
                <Link href="/mobile" className="text-[#101828] font-medium underline underline-offset-4 hover:text-[#7a5af8] transition-colors">
                  Fireflies mobile app.
                </Link>
              </p>
            </div>
          </div>

          {/* Tile 2: Desktop App */}
          <div className="w-full sm:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/fireflies-logo.svg" alt="Fireflies.ai" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="text-base font-semibold text-[#101828]">Desktop App</h4>
              <p className="text-sm text-[#475467] leading-relaxed">
                Transcribe and summarize your calls with the{" "}
                <Link href="/desktop" className="text-[#101828] font-medium underline underline-offset-4 hover:text-[#7a5af8] transition-colors">
                  Fireflies desktop app.
                </Link>
              </p>
            </div>
          </div>

          {/* Tile 3: Dialers & API */}
          <div className="w-full sm:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/aircall.svg" alt="Aircall" className="w-6 h-6 object-contain" />
              <img src="/images/ringcentral.png" alt="RingCentral" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="text-base font-semibold text-[#101828]">Dialers &amp; API</h4>
              <p className="text-sm text-[#475467] leading-relaxed">
                Transcribe calls from Aircall, Ringcentral and other dialers or use our{" "}
                <Link href="/api" className="text-[#101828] font-medium underline underline-offset-4 hover:text-[#7a5af8] transition-colors">
                  API
                </Link>{" "}
                to process audio files.
              </p>
            </div>
          </div>

          {/* Tile 4: Audio & Video Files (wraps to row 2 and centers directly under Desktop App) */}
          <div className="w-full sm:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/upload.svg" alt="Audio & Video Files" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="text-base font-semibold text-[#101828]">Audio &amp; Video Files</h4>
              <p className="text-sm text-[#475467] leading-relaxed">
                Transcribe audio and video files with AI meeting summaries. (MP3, MP4, WAV, M4A)
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
