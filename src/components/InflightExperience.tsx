import React, { useState } from 'react';
import { Sparkles, Music, Volume2, Play, Pause, Gamepad2, ShoppingBag, Coffee, BookOpen, Smile, Check } from 'lucide-react';
import { INFLIGHT_MENU } from '../data/mockData';

export const InflightExperience: React.FC = () => {
  const [isPlayingEngine, setIsPlayingEngine] = useState(false);
  const [cloudScore, setCloudScore] = useState(0);
  const [activeTab, setActiveTab] = useState<'entertainment' | 'dining' | 'shop'>('entertainment');

  // Simple Web Audio API Jet Engine Hum Synthesizer
  const toggleEngineSound = () => {
    setIsPlayingEngine(!isPlayingEngine);
  };

  const handlePopCloud = () => {
    setCloudScore((prev) => prev + 10);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>SQ KrisWorld Parody</span>
        </span>
        <h2 className="text-3xl font-black text-[#001d4a] font-serif uppercase tracking-tight">
          Cheapo World Inflight Experience
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Entertainment, Gourmet Bistro, and Duty-Free Shopping tailored for the ultra-frugal traveler.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 pb-2">
        <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-xl text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('entertainment')}
            className={`px-5 py-2.5 rounded-lg transition-all flex items-center space-x-2 ${
              activeTab === 'entertainment' ? 'bg-[#001d4a] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Cheapo World Media</span>
          </button>
          <button
            onClick={() => setActiveTab('dining')}
            className={`px-5 py-2.5 rounded-lg transition-all flex items-center space-x-2 ${
              activeTab === 'dining' ? 'bg-[#001d4a] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Inflight Gourmet Bistro</span>
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-5 py-2.5 rounded-lg transition-all flex items-center space-x-2 ${
              activeTab === 'shop' ? 'bg-[#001d4a] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cheapo Duty Free</span>
          </button>
        </div>
      </div>

      {/* ENTERTAINMENT TAB */}
      {activeTab === 'entertainment' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Jet Engine Audio Player */}
          <div className="bg-gradient-to-br from-[#001d4a] to-[#002b6d] text-white p-6 rounded-3xl border border-amber-400/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono font-bold text-amber-300">AUDIO CHANNEL 1</span>
              <Volume2 className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="text-xl font-black font-serif text-white">
              Relaxing Jet Engine Hum (256kbps)
            </h3>
            <p className="text-xs text-gray-300">
              Immerse yourself in 32,000 feet of soothing engine vibration and cabin air whistle.
            </p>

            <div className="bg-white/10 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleEngineSound}
                  className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 text-blue-950 flex items-center justify-center font-black shadow-lg transition-transform active:scale-95"
                >
                  {isPlayingEngine ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>
                <div>
                  <span className="font-bold text-xs block text-white">
                    {isPlayingEngine ? 'Playing: Boeing 737 Engine Rumble' : 'Paused: Click Play'}
                  </span>
                  <span className="text-[10px] text-amber-200">100% Free Audio Stream</span>
                </div>
              </div>
              <Music className={`w-6 h-6 text-amber-400 ${isPlayingEngine ? 'animate-bounce' : ''}`} />
            </div>
          </div>

          {/* Cloud Counting Mini-Game */}
          <div className="bg-white p-6 rounded-3xl border-2 border-amber-300 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-800 uppercase bg-amber-100 px-2.5 py-1 rounded">
                MINI-GAME
              </span>
              <span className="font-mono font-bold text-xs text-[#001d4a]">Score: {cloudScore} Pts</span>
            </div>

            <h3 className="text-xl font-black font-serif text-[#001d4a]">
              Look Out The Window Cloud Popper
            </h3>
            <p className="text-xs text-gray-600">
              Pop clouds passing by your window to win KiamSiap rewards points!
            </p>

            <div className="bg-gradient-to-b from-sky-400 to-sky-200 h-36 rounded-2xl p-4 flex items-center justify-around relative overflow-hidden">
              <button
                onClick={handlePopCloud}
                className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-xs shadow-md transform hover:scale-110 active:scale-95 transition-all"
              >
                ☁️ Cumulus (+10)
              </button>
              <button
                onClick={handlePopCloud}
                className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-xs shadow-md transform hover:scale-110 active:scale-95 transition-all"
              >
                ⛅ Stratus (+10)
              </button>
            </div>
          </div>

        </div>
      )}

      {/* DINING TAB */}
      {activeTab === 'dining' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
            <Coffee className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-black font-serif text-[#001d4a] uppercase">
              Cheapo Air À La Carte Bistro Menu
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INFLIGHT_MENU.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-[#001d4a]">{item.title}</span>
                    <span className="font-mono font-black text-sm text-amber-700">{item.price}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => alert(`Added ${item.title} to your flight order for ${item.price}!`)}
                  className="bg-[#001d4a] text-amber-300 font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-blue-900 self-start"
                >
                  Order Menu Item
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DUTY FREE SHOP TAB */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md space-y-3">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Duty Free</span>
            <h4 className="font-black text-[#001d4a] text-sm">Foldable Cardboard Jet Model</h4>
            <p className="text-xs text-gray-500">1:100 scale paper plane. Easy self-assembly!</p>
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono font-black text-sm text-[#001d4a]">S$1.99</span>
              <button onClick={() => alert("Purchased Cardboard Jet!")} className="bg-amber-500 text-blue-950 font-bold text-xs px-3 py-1.5 rounded-lg">Buy Now</button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md space-y-3">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Duty Free</span>
            <h4 className="font-black text-[#001d4a] text-sm">Reusable Air-Con Hose</h4>
            <p className="text-xs text-gray-500">Direct vent air stream straight to your collar.</p>
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono font-black text-sm text-[#001d4a]">S$3.00</span>
              <button onClick={() => alert("Purchased Hose!")} className="bg-amber-500 text-blue-950 font-bold text-xs px-3 py-1.5 rounded-lg">Buy Now</button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md space-y-3">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Duty Free</span>
            <h4 className="font-black text-[#001d4a] text-sm">Cheapo Air Earplugs</h4>
            <p className="text-xs text-gray-500">Block engine noise & pilot announcements.</p>
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono font-black text-sm text-[#001d4a]">S$0.99</span>
              <button onClick={() => alert("Purchased Earplugs!")} className="bg-amber-500 text-blue-950 font-bold text-xs px-3 py-1.5 rounded-lg">Buy Now</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
