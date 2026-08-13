import React, { useState } from 'react';
import { Plane, Clock, ShieldAlert, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Info, Sparkles } from 'lucide-react';
import { Flight, CabinClass } from '../types';

interface FlightSearchResultsProps {
  flights: Flight[];
  origin: string;
  destination: string;
  currency: string;
  cabinClass: CabinClass;
  passengers: number;
  sharingSeat: boolean;
  onSelectFlight: (flight: Flight) => void;
}

export const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({
  flights,
  origin,
  destination,
  currency,
  cabinClass,
  passengers,
  sharingSeat,
  onSelectFlight,
}) => {
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);

  const getCurrencySymbol = () => {
    if (currency === 'MYR') return 'RM';
    if (currency === 'USD') return '$';
    return 'S$';
  };

  const convertPrice = (basePriceSGD: number) => {
    let rate = 1;
    if (currency === 'MYR') rate = 3.5;
    if (currency === 'USD') rate = 0.75;
    
    // Class multiplier
    let multiplier = 1;
    if (cabinClass === 'standing') multiplier = 0.4; // 60% off standing
    if (cabinClass === 'premium_cardboard') multiplier = 1.8;
    if (cabinClass === 'baggage_suite') multiplier = 2.5;

    // Sharing seat discount
    if (sharingSeat) multiplier *= 0.6;

    return Math.round(basePriceSGD * rate * multiplier * passengers);
  };

  const getCabinLabel = () => {
    switch (cabinClass) {
      case 'standing': return '🧍 Standing Strap Zone';
      case 'cardboard': return '📦 Cardboard Economy';
      case 'premium_cardboard': return '⭐ Premium Cardboard (1 Armrest)';
      case 'baggage_suite': return '🧳 Baggage Hold Suite';
    }
  };

  if (flights.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl p-8 border border-gray-200 text-center shadow-lg">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-900 font-serif">No Direct Cheapo Flights Found</h3>
        <p className="text-gray-600 text-sm mt-1">
          Try searching for popular routes like Singapore (SIN) to Kuala Lumpur (KUL) or Bangkok (BKK)!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-extrabold uppercase text-amber-700 tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Search Results • {getCabinLabel()}</span>
          </div>
          <h2 className="text-2xl font-black text-[#001d4a] font-serif uppercase tracking-tight">
            Flights from <span className="text-amber-600">{origin}</span> to <span className="text-amber-600">{destination}</span>
          </h2>
        </div>
        <div className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5">
          <Info className="w-4 h-4 text-amber-700" />
          <span>Fares exclude mandatory breathing tax & seat pad lease</span>
        </div>
      </div>

      {/* Flight Cards List */}
      <div className="space-y-4">
        {flights.map((flight) => {
          const finalPrice = convertPrice(flight.basePriceSGD);
          const isExpanded = expandedFlightId === flight.id;

          return (
            <div
              key={flight.id}
              className="bg-white rounded-2xl border-2 border-gray-100 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Main Card Content */}
              <div className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                {/* Flight Info Left */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-[#001d4a] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">
                      {flight.flightNumber}
                    </span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                      {flight.aircraft}
                    </span>
                    {flight.stops === 0 ? (
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                        Direct (100% Non-Stop)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {flight.stops} Stop(s) for Pilot Sleep
                      </span>
                    )}
                  </div>

                  {/* Route & Timing Display */}
                  <div className="flex items-center space-x-4 sm:space-x-8">
                    <div>
                      <div className="text-xl font-black text-gray-900">{flight.departureTime}</div>
                      <div className="text-xs font-bold text-gray-500">{flight.originCode}</div>
                    </div>

                    <div className="flex-1 flex flex-col items-center max-w-[140px]">
                      <span className="text-[10px] font-bold text-gray-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{flight.duration}</span>
                      </span>
                      <div className="w-full flex items-center my-1">
                        <div className="h-[2px] bg-gray-300 flex-1 relative">
                          <Plane className="w-3.5 h-3.5 text-amber-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" />
                        </div>
                      </div>
                      <span className="text-[9px] text-amber-700 font-medium">Engine Gliding Mode</span>
                    </div>

                    <div>
                      <div className="text-xl font-black text-gray-900">{flight.arrivalTime}</div>
                      <div className="text-xs font-bold text-gray-500">{flight.destinationCode}</div>
                    </div>
                  </div>

                  {/* Frugal Warning / Note */}
                  <p className="text-xs text-amber-900/80 bg-amber-50 p-2 rounded-lg border border-amber-200/60 font-medium italic">
                    ⚠️ Note: {flight.notes}
                  </p>
                </div>

                {/* Right Price & Select Section */}
                <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-extrabold text-gray-400 block tracking-wider">
                      Total for {passengers} Pax
                    </span>
                    <div className="text-3xl font-black text-[#001d4a]">
                      {getCurrencySymbol()}{finalPrice.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-green-600 font-bold block">
                      Lowest Rate Guaranteed
                    </span>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => onSelectFlight(flight)}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-black text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center space-x-2"
                    >
                      <span>SELECT FLIGHT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedFlightId(isExpanded ? null : flight.id)}
                      className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center space-x-1 underline"
                    >
                      <span>{isExpanded ? 'Hide Fee Breakdown' : 'View Mandatory Taxes'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Fee Breakdown Accordion */}
              {isExpanded && (
                <div className="bg-gray-50 p-5 border-t border-gray-200 text-xs space-y-3 animate-fadeIn">
                  <h4 className="font-extrabold text-[#001d4a] uppercase tracking-wider flex items-center space-x-1 text-xs">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>Mandatory Cheapo Air Fee Breakdown:</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                      <span className="text-gray-500 block">Base Air Passage:</span>
                      <span className="font-bold text-gray-900">{getCurrencySymbol()}{Math.round(finalPrice * 0.3)}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                      <span className="text-gray-500 block">Breathing Oxygen Tax:</span>
                      <span className="font-bold text-gray-900">{getCurrencySymbol()}{Math.round(finalPrice * 0.4)}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                      <span className="text-gray-500 block">Runway Landing Shock:</span>
                      <span className="font-bold text-gray-900">{getCurrencySymbol()}{Math.round(finalPrice * 0.2)}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-gray-200">
                      <span className="text-gray-500 block">Seat belt Clasp Fuel:</span>
                      <span className="font-bold text-gray-900">{getCurrencySymbol()}{Math.round(finalPrice * 0.1)}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
