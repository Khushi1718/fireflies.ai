import { MessageCircle } from "lucide-react";

export default function FloatingChat() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button className="bg-brand-purple text-white p-4 rounded-full shadow-2xl hover:bg-brand-purple-hover hover:scale-105 transition-all cursor-pointer flex items-center justify-center">
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
