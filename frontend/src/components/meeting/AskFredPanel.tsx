"use client";

import { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp, Loader2, Plus, Layers, Mic } from 'lucide-react';
import { meetingApi, AskFredMessage } from '../../services/meetingApi';

interface Message {
  role: 'user' | 'fred';
  content: string;
}

const DEFAULT_QUESTIONS = [
  "Who was responsible for attendance?",
  "What caused the communication confusion?",
  "What was the intended agenda?",
];

export function AskFredPanel({ meetingId }: { meetingId: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
    setInput('');
  }, [meetingId]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const history: AskFredMessage[] = messages.map(message => ({
        role: message.role === 'fred' ? 'assistant' : 'user',
        content: message.content,
      }));
      const answer = await meetingApi.askFred(meetingId, userMsg, history);
      setMessages(prev => [...prev, { role: 'fred', content: answer }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "AskFred could not answer right now.";
      setMessages(prev => [...prev, { 
        role: 'fred', 
        content: errorMessage.includes('429') || errorMessage.toLowerCase().includes('quota')
          ? "Gemini is currently out of quota for this request. Add quota or configure another Gemini model, then try again."
          : errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">

      {/* Main Chat / Greeting Area */}
      <div className="flex-1 p-5 flex flex-col overflow-y-auto [scrollbar-width:thin]" ref={scrollRef}>
        
        {/* Slack and Gmail Promo Card (Matches Screenshot 2) */}
        {showPromo && (
          <div className="bg-[#f8f9fe] border border-gray-100/90 rounded-2xl p-3.5 mb-5 shadow-sm relative">
             <button 
               onClick={() => setShowPromo(false)}
               className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 text-xs p-1 cursor-pointer"
             >
               ✕
             </button>
             <div className="flex items-start gap-2.5 mb-2">
                <div className="flex -space-x-1.5 mt-0.5">
                   <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center border border-gray-200 shadow-sm z-10 p-0.5">
                     <svg width="14" height="14" viewBox="0 0 122.8 122.8">
                       <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#E01E5A"/>
                       <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36C5F0"/>
                       <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C77.6 5.8 83.4 0 90.5 0s12.9 5.8 12.9 12.9v32.3z" fill="#2EB67D"/>
                       <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ECB22E"/>
                     </svg>
                   </div>
                   <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center border border-gray-200 shadow-sm p-0.5">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                       <path d="M22 6.5C22 5.12 20.88 4 19.5 4H4.5C3.12 4 2 5.12 2 6.5V17.5C2 18.88 3.12 20 4.5 20H19.5C20.88 20 22 18.88 22 17.5V6.5Z" fill="white"/>
                       <path d="M2 6.5L12 13L22 6.5V6.5C22 5.12 20.88 4 19.5 4H4.5C3.12 4 2 5.12 2 6.5Z" fill="#EA4335"/>
                       <path d="M2 17.5V6.5L12 13L2 17.5Z" fill="#FBBC05"/>
                       <path d="M22 17.5V6.5L12 13L22 17.5Z" fill="#34A853"/>
                       <path d="M22 17.5L12 13L2 17.5H19.5C20.88 17.5 22 16.38 22 15V17.5Z" fill="#4285F4"/>
                     </svg>
                   </div>
                </div>
                <div className="flex-1">
                   <p className="text-[12px] text-gray-800 leading-snug pr-4">
                      <span className="font-bold">Connect Slack and Gmail</span> — get answers with full context.
                   </p>
                </div>
             </div>
             <div className="flex justify-end">
                <button className="text-[#7b52f6] text-[12px] font-semibold hover:underline cursor-pointer">
                  Connect
                </button>
             </div>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex flex-col">
            {/* 3 Green Sparkles Cluster (Matches Screenshot 2) */}
            <div className="flex items-center gap-1 text-[#34d399] mb-4 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#34d399">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
              </svg>
              <div className="flex flex-col gap-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#34d399">
                  <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
                </svg>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#6ee7b7">
                  <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
                </svg>
              </div>
            </div>

            <h3 className="text-[18px] font-bold text-gray-900 mb-0.5">Hi Khushi!</h3>
            <p className="text-[15px] font-semibold text-gray-800 mb-6">Ask anything about this meeting</p>

            {/* Suggested Questions Pills */}
            <div className="flex flex-col gap-2.5">
              {DEFAULT_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-left px-4 py-3 rounded-xl border border-gray-100 bg-[#f9fafb] hover:bg-gray-100/90 text-[13px] font-medium text-gray-700 transition-all group cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <span className="group-hover:text-gray-900">{q}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.role === 'fred' && (
                  <div className="flex items-center gap-1.5 mb-1 text-[#7b52f6]">
                    <div className="w-4 h-4 rounded bg-purple-50 flex items-center justify-center">
                      <Sparkles size={10} />
                    </div>
                    <span className="text-[11px] font-bold">AskFred</span>
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[90%] text-[13px] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#7b52f6] text-white rounded-br-none'
                    : 'bg-[#f4effa] text-gray-800 rounded-bl-none border border-purple-100/60 whitespace-pre-line'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs py-2">
                <Loader2 size={13} className="animate-spin text-[#7b52f6]" />
                <span>AskFred is analyzing meeting context...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Box Area (Matches Screenshot 2) */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="relative border border-gray-200/90 rounded-xl overflow-hidden focus-within:border-[#7b52f6] focus-within:ring-1 focus-within:ring-[#7b52f6] transition-all bg-white shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(input);
              }
            }}
            placeholder="Ask anything. Type / to run AI Skills"
            className="w-full h-16 p-3 pb-8 text-[13px] resize-none focus:outline-none text-gray-800 placeholder-gray-400"
          />

          <div className="absolute bottom-2 right-2 flex items-center justify-end pointer-events-auto">
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              className="w-6 h-6 rounded-md bg-[#ede8f7] text-[#7b52f6] flex items-center justify-center hover:bg-[#7b52f6] hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-[#ede8f7] disabled:hover:text-[#7b52f6] cursor-pointer"
              title="Send"
            >
              <ArrowUp size={13} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
