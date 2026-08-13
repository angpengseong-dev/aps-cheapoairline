import React, { useState } from 'react';
import { Calendar, Users, ArrowRightLeft, Search, Sparkles, ShieldCheck, Tag, Info, Armchair, HelpCircle } from 'lucide-react';
import { AIRPORTS } from '../data/mockData';
import { CabinClass } from '../types';

interface HeroSearchProps {
  onSearch: (searchParams: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    tripType: 'one-way' | 'round-trip';
    cabinClass: CabinClass;
    passengers: number;
    sharingSeat: boolean;
    promoCode: string;
  }) => void;
  currency: string;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, currency }) => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  const [origin, setOrigin] = useState('SIN');
  const [destination, setDestination] = useState('KUL');
  const [departureDate, setDepartureDate] = useState('2026-08-20');
  const [returnDate, setReturnDate] = useState('2026-08-27');
  const [cabinClass, setCabinClass] = useState<CabinClass>('cardboard');
  const [passengers, setPassengers] = useState(1);
  const [sharingSeat, setSharingSeat] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showCabinInfo, setShowCabinInfo] = useState(false);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      origin,
      destination,
      departureDate,
      returnDate,
      tripType,
      cabinClass,
      passengers,
      sharingSeat,
      promoCode,
    });
  };

  const getCurrencySymbol = () => {
    if (currency === 'MYR') return 'RM';
    if (currency === 'USD') return '$';
    return 'S$';
  };

  return (
    <div className="relative bg-gradient-to-b from-[#001d4a] via-[#002b6d] to-[#00173b] pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#d4af37]">
      {/* Background Batik-style decorative grid & plane graphic */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Hero Banner */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Singapore Airlines' Frugal Cousin</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-serif uppercase">
            World-Class Service. <span className="text-[#d4af37]">Stingy Fares.</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Fly to Asia & Beyond with zero unnecessary frills. No free water, no extra legroom, pure $10 savings!
          </p>
        </div>

        {/* SQ-Style Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-400/30 p-4 sm:p-6 text-gray-800">
          
          {/* Top Row: Trip Type & Cabin Class Selection */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-5">
            {/* Trip Type Tabs */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTripType('round-trip')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  tripType === 'round-trip'
                    ? 'bg-[#001d4a] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Return Flight
              </button>
              <button
                type="button"
                onClick={() => setTripType('one-way')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  tripType === 'one-way'
                    ? 'bg-[#001d4a] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                One Way
              </button>
            </div>

            {/* Cabin Class Selection */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Class:</span>
              <div className="relative">
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value as CabinClass)}
                  className="bg-amber-50 border-2 border-amber-400/60 text-[#001d4a] font-bold text-xs rounded-xl px-3 py-2 pr-8 focus:outline-none cursor-pointer"
                >
                  <option value="standing">🧍 Standing Class ({getCurrencySymbol()}12+ / Strap)</option>
                  <option value="cardboard">📦 Cardboard Economy ({getCurrencySymbol()}39+ / Seat)</option>
                  <option value="premium_cardboard">⭐ Premium Cardboard ({getCurrencySymbol()}79+ / 1 Armrest)</option>
                  <option value="baggage_suite">🧳 Baggage Hold Suite ({getCurrencySymbol()}119+ / Lie Flat)</option>
                </select>
                <button
                  type="button"
                  onClick={() => setShowCabinInfo(!showCabinInfo)}
                  className="ml-2 text-amber-700 hover:text-amber-900"
                  title="Cabin Class Explanations"
                >
                  <HelpCircle className="w-4 h-4 inline" />
                </button>
              </div>
            </div>
          </div>

          {/* Cabin Class Information Drawer */}
          {showCabinInfo && (
            <div className="mb-5 bg-amber-50/80 border border-amber-300 rounded-xl p-4 text-xs text-amber-900 space-y-2 animate-fadeIn">
              <p className="font-bold flex items-center space-x-1 text-sm">
                <Armchair className="w-4 h-4 text-amber-700" />
                <span>Cheapo Air Cabin Specs:</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-white p-2 rounded border border-amber-200">
                  <span className="font-bold block text-blue-900">🧍 Standing Strap Class</span>
                  Hold ceiling handle strap. Maximum 4 hours duration recommended.
                </div>
                <div className="bg-white p-2 rounded border border-amber-200">
                  <span className="font-bold block text-blue-900">📦 Cardboard Economy</span>
                  Hard plastic seat shell. Seat cushion rented separately ($6.00).
                </div>
                <div className="bg-white p-2 rounded border border-amber-200">
                  <span className="font-bold block text-blue-900">⭐ Premium Cardboard</span>
                  Includes right-side armrest lease permission for 45 minutes.
                </div>
                <div className="bg-white p-2 rounded border border-amber-200">
                  <span className="font-bold block text-blue-900">🧳 Baggage Hold Suite</span>
                  Lie flat on soft cargo duffel bags. Blankets not included ($3/newspaper).
                </div>
              </div>
            </div>
          )}

          {/* Form Fields: Origin, Destination, Dates, Passengers */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Route Selector Row */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
              
              {/* Origin */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all">
                <label className="block text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">From (Origin)</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-transparent font-bold text-gray-900 text-sm focus:outline-none cursor-pointer pt-1"
                >
                  {AIRPORTS.map((apt) => (
                    <option key={`orig-${apt.code}`} value={apt.code}>
                      {apt.city} ({apt.code}) - {apt.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-2 md:my-0">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-[#001d4a] text-amber-400 hover:bg-amber-400 hover:text-[#001d4a] transition-all flex items-center justify-center shadow-lg border border-amber-300 transform hover:rotate-180 duration-300"
                  title="Swap Origin and Destination"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all">
                <label className="block text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">To (Destination)</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent font-bold text-gray-900 text-sm focus:outline-none cursor-pointer pt-1"
                >
                  {AIRPORTS.map((apt) => (
                    <option key={`dest-${apt.code}`} value={apt.code}>
                      {apt.city} ({apt.code}) - {apt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates & Passengers Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              
              {/* Departure Date */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <label className="block text-[10px] font-extrabold uppercase text-gray-500 tracking-wider flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-amber-600" />
                  <span>Departure Date</span>
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-gray-900 text-xs pt-1 focus:outline-none"
                />
              </div>

              {/* Return Date */}
              {tripType === 'round-trip' ? (
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <label className="block text-[10px] font-extrabold uppercase text-gray-500 tracking-wider flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    <span>Return Date</span>
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent font-bold text-gray-900 text-xs pt-1 focus:outline-none"
                  />
                </div>
              ) : (
                <div className="bg-gray-100 p-3 rounded-xl border border-gray-200 opacity-60">
                  <label className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Return Date</label>
                  <span className="text-xs text-gray-500 font-semibold italic">One Way Selected</span>
                </div>
              )}

              {/* Passengers Count & Share Seat Checkbox */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <label className="block text-[10px] font-extrabold uppercase text-gray-500 tracking-wider flex items-center space-x-1">
                  <Users className="w-3 h-3 text-amber-600" />
                  <span>Passengers</span>
                </label>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-6 h-6 rounded bg-gray-200 text-gray-800 font-bold flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm">{passengers} Adult(s)</span>
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.min(6, passengers + 1))}
                      className="w-6 h-6 rounded bg-gray-200 text-gray-800 font-bold flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Frugal Options & Promo Code & Submit */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
              
              {/* Special Frugal Options */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <label className="flex items-center space-x-2 cursor-pointer bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100">
                  <input
                    type="checkbox"
                    checked={sharingSeat}
                    onChange={(e) => setSharingSeat(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-bold text-amber-900">Share 1 Seat with Lap Partner (50% Off)</span>
                </label>

                {/* Promo Code Input */}
                <div className="flex items-center space-x-1 border border-gray-300 rounded-lg px-2 py-1 bg-gray-50">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. KIAMSIAP)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-36 bg-transparent text-xs font-mono font-bold uppercase focus:outline-none text-gray-800"
                  />
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-[#d4af37] via-amber-400 to-[#b89528] text-[#001d4a] font-black text-base px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2 border border-amber-200"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>SEARCH CHEAPO FLIGHTS</span>
              </button>
            </div>

          </form>
        </div>

        {/* Value Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-white text-xs font-semibold">
          <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-3 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span>0% Flight Cancellation Refund (You fly no matter what)</span>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-3 flex items-center space-x-2">
            <Tag className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Guaranteed Lowest Base Air Fare on Planet Earth</span>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-3 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Auntie KiamSiap Approved Budget Standards</span>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-3 flex items-center space-x-2">
            <Info className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Bring Your Own Seatbelt Allowed</span>
          </div>
        </div>

      </div>
    </div>
  );
};
