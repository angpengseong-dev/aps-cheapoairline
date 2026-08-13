import React from 'react';
import { Plane, ShieldAlert, Award, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00173b] text-gray-300 border-t-4 border-[#d4af37] pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#00173b] font-black flex items-center justify-center">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="text-xl font-black text-white font-serif tracking-widest uppercase">CHEAPO AIR</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Inspired by Singapore Airlines, but operating at 1% of the budget. Providing direct point-to-point air transport with zero unnecessary luxury.
            </p>
            <div className="text-[10px] text-amber-400 font-mono">
              Winner: World's Most Frugal Airline 2025
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-gray-800 pb-1">
              Popular Routes
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              <li className="hover:text-amber-400 cursor-pointer">Singapore (SIN) to Kuala Lumpur (KUL)</li>
              <li className="hover:text-amber-400 cursor-pointer">Singapore (SIN) to Bangkok (BKK)</li>
              <li className="hover:text-amber-400 cursor-pointer">Singapore (SIN) to Bali (DPS)</li>
              <li className="hover:text-amber-400 cursor-pointer">Singapore (SIN) to Tokyo (TYO)</li>
            </ul>
          </div>

          {/* Cabin Classes */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-gray-800 pb-1">
              Frugal Travel Classes
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>🧍 Standing Strap Class</li>
              <li>📦 Cardboard Economy</li>
              <li>⭐ Premium Cardboard (1 Armrest)</li>
              <li>🧳 Baggage Hold Suite</li>
            </ul>
          </div>

          {/* Legal / Disclaimers */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-gray-800 pb-1">
              Safety & Terms
            </h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              By booking a ticket, you agree to wear your heaviest jackets, return ceiling handle straps upon landing, and assist ground staff if requested.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© 2026 Cheapo Air Ltd. All rights reserved. Parody application built for entertainment & high-flying laughs.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-amber-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-amber-400 cursor-pointer">Terms of Carriage</span>
            <span className="hover:text-amber-400 cursor-pointer">KiamSiap Rules</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
