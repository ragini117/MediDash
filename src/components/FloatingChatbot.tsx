
import { useState } from "react";
import Chatbot from "@/pages/Chatbot";
import { MessageCircle } from "lucide-react";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[360px] h-[500px] bg-white shadow-2xl rounded-xl overflow-hidden z-50">
          <Chatbot />
        </div>
      )}
    </>
  );
}

