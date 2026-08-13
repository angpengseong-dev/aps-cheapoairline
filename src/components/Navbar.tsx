import React, { useState } from 'react';
import { Plane, Luggage, ShieldAlert, Award, Compass, ShoppingBag, Sparkles, UserCheck, Search, Menu, X, DollarSign } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: string;
  setCurrency: (c: string) => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  onOpenConcierge,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'book', label: 'Book Flight', icon: Plane },
    { id: 'manage', label: 'Manage / Check-in', icon: UserCheck },
    { id: 'status', label: 'Flight Status', icon: Compass },
    { id: 'loyalty', label: 'KiamSiap Club', icon: Award },
    { id: 'inflight', label: 'Cheapo World', icon: Sparkles },
    { id: 'shop', label: 'Cheapo Shop', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#001d4a] text-white shadow-xl border-b border-[#d4af37]/30">
      {/* Ticker Announcement */}
      <div className="bg-[#d4af37] text-[#001d4a] text-xs py-1.5 px-4 font-semibold overflow-hidden whitespace-nowrap flex items-center justify-between">
        <div className="flex items-center space-x-2 animate-pulse">
          <ShieldAlert className="w-4 h-4 text-[#001d4a] shrink-0" />
          <span>
            <strong>IMPORTANT ANNOUNCEMENT:</strong> Wear all 10 jackets to airport to avoid $45 baggage fee! | Tap Water now $3.00/cup | Standing Class handle-straps disinfected weekly!
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-xs font-bold">
          <span className="bg-[#001d4a] text-[#d4af37] px-2 py-0.5 rounded text-[10px]">VERIFIED CHEAPO</span>
          <span>Hotline: 1800-KIAM-SIAP</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('book')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a701e] flex items-center justify-center shadow-lg border border-white/20 transform group-hover:scale-105 transition-transform">
              <Plane className="w-7 h-7 text-[#001d4a] transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-black tracking-wider text-white uppercase font-serif">CHEAPO</span>
                <span className="text-2xl font-light text-[#d4af37] tracking-widest uppercase">AIR</span>
              </div>
              <p className="text-[10px] text-amber-200/80 tracking-widest uppercase -mt-1 font-mono">A Great Way To Save $5</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#d4af37] text-[#001d4a] shadow-md font-bold'
                      : 'text-gray-200 hover:bg-white/10 hover:text-amber-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Currency & AI Assistant */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Currency Picker */}
            <div className="flex items-center bg-blue-950/80 border border-amber-500/30 rounded-lg p-1 text-xs">
              <DollarSign className="w-3.5 h-3.5 text-amber-400 ml-1" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-amber-200 font-semibold focus:outline-none cursor-pointer pr-1 text-xs"
              >
                <option value="SGD" className="bg-[#001d4a] text-white">SGD ($)</option>
                <option value="MYR" className="bg-[#001d4a] text-white">MYR (RM)</option>
                <option value="USD" className="bg-[#001d4a] text-white">USD ($)</option>
              </select>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenConcierge}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-bold px-3.5 py-2 rounded-lg text-xs shadow-md border border-amber-300/40 transform active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 animate-spin text-blue-950" />
              <span>Auntie AI Concierge</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenConcierge}
              className="p-2 bg-amber-500 text-blue-950 rounded-lg font-bold text-xs flex items-center"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#00173b] border-t border-amber-500/20 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#d4af37] text-[#001d4a]'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-300">Select Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#002868] text-amber-300 border border-amber-400/40 rounded px-2 py-1 text-xs"
            >
              <option value="SGD">SGD ($)</option>
              <option value="MYR">MYR (RM)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
