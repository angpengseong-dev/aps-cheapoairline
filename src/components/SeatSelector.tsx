import React from 'react';
import { Armchair, Sparkles, Check, Info } from 'lucide-react';
import { CabinClass } from '../types';

interface SeatSelectorProps {
  selectedSeatId: string;
  onSelectSeat: (seatId: string, seatFeeSGD: number) => void;
  cabinClass: CabinClass;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({
  selectedSeatId,
  onSelectSeat,
  cabinClass,
}) => {
  // Generate rows
  const seatLayout = [
    { row: 1, type: 'baggage_suite', name: 'Baggage Suite 1A (On Samsonite Suitcase)', price: 15 },
    { row: 1, type: 'baggage_suite', name: 'Baggage Suite 1B (Beside Golf Bag)', price: 15 },
    { row: 2, type: 'baggage_suite', name: 'Baggage Suite 2A (Under Cargo Net)', price: 15 },
    { row: 2, type: 'baggage_suite', name: 'Baggage Suite 2B (Near Tail Door)', price: 15 },

    { row: 3, type: 'premium_cardboard', name: 'Premium Cardboard 3A (Right Armrest Included)', price: 10 },
    { row: 3, type: 'premium_cardboard', name: 'Premium Cardboard 3B (Legroom for 1 leg)', price: 10 },
    { row: 4, type: 'premium_cardboard', name: 'Premium Cardboard 4A (Recline Pin Unlocked)', price: 10 },
    { row: 4, type: 'premium_cardboard', name: 'Premium Cardboard 4B (Near Pilot Cockpit)', price: 10 },

    { row: 5, type: 'cardboard', name: 'Cardboard 5A (Window View - $2 Extra)', price: 5 },
    { row: 5, type: 'cardboard', name: 'Cardboard 5B (Middle - Elbow Collision Hazard)', price: 3 },
    { row: 5, type: 'cardboard', name: 'Cardboard 5C (Aisle - Hit by Beverage Cart)', price: 3 },
    { row: 6, type: 'cardboard', name: 'Cardboard 6A (Bare Plastic Chair)', price: 3 },
    { row: 6, type: 'cardboard', name: 'Cardboard 6B (BYO Cushion Recommended)', price: 3 },
    { row: 6, type: 'cardboard', name: 'Cardboard 6C (Near Engine Vibration)', price: 3 },

    { row: 7, type: 'standing', name: 'Strap 7A (Overhead Handle Grip)', price: 0 },
    { row: 7, type: 'standing', name: 'Strap 7B (Middle Standing Spot)', price: 0 },
    { row: 7, type: 'standing', name: 'Strap 7C (Near Toilet Door)', price: 0 },
    { row: 8, type: 'standing', name: 'Strap 8A (Wall Leaner Position)', price: 0 },
    { row: 8, type: 'standing', name: 'Strap 8B (Shared Strap with Stranger)', price: 0 },
    { row: 8, type: 'standing', name: 'Strap 8C (Tail Standing Spot)', price: 0 },
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h4 className="font-extrabold text-[#001d4a] uppercase text-sm flex items-center space-x-2">
            <Armchair className="w-4 h-4 text-amber-600" />
            <span>Select Your Aircraft Position</span>
          </h4>
          <p className="text-xs text-gray-500">Pick your chair, standing strap, or baggage hold spot</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
            Selected: <strong className="text-[#001d4a]">{selectedSeatId || 'None'}</strong>
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold">
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 bg-blue-600 rounded" />
          <span>Baggage Suite (+S$15)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 bg-purple-600 rounded" />
          <span>Prem. Cardboard (+S$10)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 bg-amber-500 rounded" />
          <span>Std. Cardboard (+S$3)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 bg-emerald-600 rounded" />
          <span>Standing Strap (Free)</span>
        </div>
      </div>

      {/* Aircraft Fuselage Graphic */}
      <div className="max-w-md mx-auto bg-white border-2 border-gray-300 rounded-3xl p-6 shadow-inner relative">
        
        {/* Airplane Nose Cone */}
        <div className="w-24 h-12 bg-[#001d4a] rounded-t-full mx-auto mb-4 flex items-center justify-center text-amber-400 text-[10px] font-bold tracking-widest uppercase">
          COCKPIT
        </div>

        <div className="grid grid-cols-3 gap-2">
          {seatLayout.map((seat) => {
            const isSelected = selectedSeatId === seat.name;

            let colorClass = 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200';
            if (seat.type === 'baggage_suite') {
              colorClass = 'bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200';
            } else if (seat.type === 'premium_cardboard') {
              colorClass = 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200';
            } else if (seat.type === 'cardboard') {
              colorClass = 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200';
            }

            if (isSelected) {
              colorClass = 'bg-[#001d4a] text-amber-300 border-amber-400 ring-2 ring-amber-400 shadow-md font-black';
            }

            return (
              <button
                key={seat.name}
                type="button"
                onClick={() => onSelectSeat(seat.name, seat.price)}
                className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all flex flex-col items-center justify-center space-y-0.5 ${colorClass}`}
              >
                <div className="flex items-center space-x-1">
                  <span>{seat.name.split(' ')[1]}</span>
                  {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                </div>
                <span className="text-[9px] opacity-80">+S${seat.price}</span>
              </button>
            );
          })}
        </div>

        {/* Airplane Tail */}
        <div className="w-32 h-8 bg-gray-200 rounded-b-xl mx-auto mt-6 flex items-center justify-center text-gray-500 text-[9px] font-extrabold uppercase">
          TAIL & EXIT
        </div>

      </div>

    </div>
  );
};
