import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, X, RefreshCw, HelpCircle, ShieldAlert } from 'lucide-react';
import { ConciergeMessage } from '../types';

interface CheapoConciergeAIProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheapoConciergeAI: React.FC<CheapoConciergeAIProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Halo! I am Auntie KiamSiap, lead Cheapo Air AI Concierge! Ask me how to travel super cheapo, how to pack 10 layers of clothes, or how to claim free tap water!",
      timestamp: 'Just now',
      suggestedPrompts: [
        'How to pack 15kg without paying baggage fees?',
        'Is Standing Class safe for a 3 hour flight?',
        'How to get free water on Cheapo Air?',
        'Find me a flight route under $30'
      ],
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || loading) return;

    const userMsg: ConciergeMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          userBudget: 50,
          userWeight: 68,
          origin: 'SIN',
          destination: 'KUL',
        }),
      });

      const data = await response.json();

      const botMsg: ConciergeMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: data.reply || "Wah, server high traffic! Quick tip: Always wear your heaviest winter coat onto the plane!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ConciergeMessage = {
        id: 'bot-err-' + Date.now(),
        sender: 'bot',
        text: "Aiyo, network error! But remember: Always hold overhead straps tightly in Standing Class!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-400 w-full max-w-xl h-[80vh] flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-[#001d4a] text-white p-4 border-b-2 border-amber-400 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-blue-950 shadow">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-black font-serif text-sm uppercase text-amber-300">
                Auntie KiamSiap AI Concierge
              </h3>
              <p className="text-[10px] text-gray-300 font-mono">
                Powered by Gemini 3.6 Flash • AI Frugal Expert
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                {msg.sender === 'bot' ? (
                  <>
                    <Bot className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-bold text-[#001d4a]">Auntie KiamSiap AI</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-bold text-gray-700">You</span>
                  </>
                )}
                <span className="text-[9px] text-gray-400">{msg.timestamp}</span>
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#001d4a] text-white rounded-tr-none'
                    : 'bg-white border border-amber-300 text-gray-800 rounded-tl-none font-medium'
                }`}
              >
                {msg.text}
              </div>

              {/* Suggested Prompts buttons */}
              {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                  {msg.suggestedPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(p)}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg px-2.5 py-1 text-[10px] font-bold text-left transition-colors"
                    >
                      💡 {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-amber-800 font-bold bg-amber-50 p-3 rounded-xl border border-amber-200">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>Auntie AI calculating maximum budget savings...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask Auntie AI how to save money on your flight..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !inputPrompt.trim()}
            className="bg-[#001d4a] hover:bg-blue-900 text-amber-400 disabled:opacity-50 font-bold p-2.5 rounded-xl shadow transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
