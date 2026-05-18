
import { useState } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");

    try {
      const apiUrl = import.meta.env.VITE_CHATBOT_API || "http://localhost:5004/ask"
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      const botMessage: Message = {
        text: data.answer,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Server error. Try again.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">

      {/* Header */}
      <div className="p-4 text-lg font-semibold border-b border-gray-700">
        Medical AI Chatbot
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

      </div>

      {/* Input */}
      <div className="flex border-t border-gray-700">

        <input
          className="flex-1 p-3 bg-gray-800 text-white outline-none"
          placeholder="Ask a medical question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-5"
        >
          Send
        </button>

      </div>

    </div>
  );
}

