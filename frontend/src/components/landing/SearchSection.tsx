export default function SearchSection() {
  return (
    <section className="bg-white py-16 md:py-24 relative z-10 text-gray-900 overflow-hidden">
      <div className="max-w-[1216px] mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#101828] mb-4 leading-tight">
            <span className="text-[#7a5af8]">Remember</span> Every Conversation With{" "}
            <span className="text-[#7a5af8]">AI Powered Search</span>
          </h2>
          <p className="text-[#475467] text-base md:text-lg leading-relaxed">
            Fireflies gives you perfect memory after every conversation.
          </p>
        </div>

        {/* 2 Feature Cards with exact images and reverse column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Meeting Search */}
          <div className="relative flex flex-col-reverse justify-between rounded-3xl overflow-hidden pt-9 lg:pt-12 px-8 lg:px-12 pb-9 lg:pb-12 bg-[#faf5ff] min-h-[480px] lg:min-h-[520px]">
            <div className="flex flex-col items-start gap-3 mt-6">
              <h3 className="text-2xl lg:text-[28px] font-bold tracking-tight text-[#101828]">
                Meeting Search
              </h3>
              <p className="text-[#475467] text-base leading-relaxed">
                Remember what was discussed on calls several months ago down to the specific sentence and timestamp.
              </p>
            </div>
            
            <div className="w-full flex justify-center items-start">
              <img 
                src="/images/ai-powered-search-desktop.webp" 
                alt="Meeting Search" 
                className="w-full max-w-[500px] h-auto object-contain block rounded-2xl shadow-xs"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 2: AskFred */}
          <div className="relative flex flex-col-reverse justify-between rounded-3xl overflow-hidden pt-9 lg:pt-12 px-8 lg:px-12 pb-9 lg:pb-12 bg-[#f0fdf9] min-h-[480px] lg:min-h-[520px]">
            <div className="flex flex-col items-start gap-3 mt-6">
              <h3 className="text-2xl lg:text-[28px] font-bold tracking-tight text-[#101828]">
                AskFred
              </h3>
              <p className="text-[#475467] text-base leading-relaxed">
                Let Fred review your meetings and come back with answers to any question you have.
              </p>
            </div>

            <div className="w-full flex justify-center items-start">
              <img 
                src="/images/ask-fred-desktop.webp" 
                alt="AskFred" 
                className="w-full max-w-[500px] h-auto object-contain block rounded-2xl shadow-xs"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
