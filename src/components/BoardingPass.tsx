import React from 'react';
import { Plane, QrCode, Printer, Download, Sparkles, CheckCircle, ShieldAlert, Award } from 'lucide-react';
import { Booking } from '../types';

interface BoardingPassProps {
  booking: Booking;
  currency: string;
  onClose?: () => void;
}

export const BoardingPass: React.FC<BoardingPassProps> = ({ booking, currency, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto my-6 bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden text-gray-800">
      
      {/* Top Pass Header - SQ Style Batik Gold Navy */}
      <div className="bg-[#001d4a] text-white p-5 sm:p-6 border-b-4 border-[#d4af37] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a701e] flex items-center justify-center text-[#001d4a] font-black">
            <Plane className="w-6 h-6 transform -rotate-45" />
          </div>
          <div>
            <h2 className="text-xl font-black font-serif uppercase tracking-widest text-[#d4af37]">CHEAPO AIR</h2>
            <p className="text-[10px] text-amber-200 tracking-wider font-mono">OFFICIAL BOARDING PASS • PASS REF: {booking.bookingRef}</p>
          </div>
        </div>

        <div className="bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-lg text-xs font-bold font-mono">
          BOARDING ZONE 9 (LAST TO BOARD)
        </div>
      </div>

      {/* Main Boarding Pass Body */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Passenger & Flight Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="text-[10px] uppercase font-extrabold text-gray-400 block tracking-wider">Passenger Name</span>
            <span className="text-sm font-black text-[#001d4a] uppercase">{booking.passenger.fullName || 'Tan Ah Kow'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold text-gray-400 block tracking-wider">Flight No.</span>
            <span className="text-sm font-black text-amber-700 font-mono">{booking.flight.flightNumber}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold text-gray-400 block tracking-wider">Assigned Seat / Spot</span>
            <span className="text-sm font-black text-blue-900 font-mono">{booking.seatNumber || 'Strap 14-B'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold text-gray-400 block tracking-wider">Weight Declared</span>
            <span className="text-sm font-black text-emerald-700 font-mono">{booking.passenger.weightKg || 65} kg</span>
          </div>
        </div>

        {/* Flight Route Big Display */}
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 flex items-center justify-between">
          <div className="text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-black text-[#001d4a] block">{booking.flight.originCode}</span>
            <span className="text-xs text-gray-600 font-bold">{booking.flight.origin}</span>
            <span className="text-[10px] text-gray-400 block mt-1">Terminal 5 Sub-Basement</span>
          </div>

          <div className="flex flex-col items-center px-4">
            <span className="text-xs font-mono font-bold text-amber-700 bg-white px-2 py-0.5 rounded border border-amber-300">
              {booking.flight.duration}
            </span>
            <div className="w-24 sm:w-36 h-[2px] bg-amber-400 my-2 relative">
              <Plane className="w-4 h-4 text-[#001d4a] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" />
            </div>
            <span className="text-[9px] text-amber-900 font-bold">Engine Gliding Mode</span>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-3xl sm:text-4xl font-black text-[#001d4a] block">{booking.flight.destinationCode}</span>
            <span className="text-xs text-gray-600 font-bold">{booking.flight.destination}</span>
            <span className="text-[10px] text-gray-400 block mt-1">Outer Runway Apron</span>
          </div>
        </div>

        {/* Gate & Time Detail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Gate Number</span>
            <span className="text-sm font-extrabold text-gray-900">Gate 99 (1.5km Walk)</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Departure Time</span>
            <span className="text-sm font-extrabold text-gray-900">{booking.flight.departureTime}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Boarding Starts</span>
            <span className="text-sm font-extrabold text-amber-700">45 Mins Before</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Luggage Allowance</span>
            <span className="text-sm font-extrabold text-green-700">Pockets Only (Max 500g)</span>
          </div>
        </div>

        {/* Barcode & QR Code Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-dashed border-gray-300">
          
          {/* Barcode graphic */}
          <div className="flex-1 space-y-1">
            <div className="h-12 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 rounded flex items-center justify-center p-2">
              <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#000_0px,#000_2px,#fff_2px,#fff_4px)]" />
            </div>
            <p className="text-[10px] font-mono text-center text-gray-400 tracking-widest uppercase">
              CHEAPO-BP-{booking.bookingRef}-2026
            </p>
          </div>

          {/* QR code graphic */}
          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-xl border border-gray-300 shrink-0">
            <QrCode className="w-16 h-16 text-[#001d4a]" />
            <div className="text-[10px] space-y-0.5 text-gray-600">
              <p className="font-bold text-[#001d4a]">Scan At Gate</p>
              <p>Self-weight verification</p>
              <p className="text-amber-700 font-bold">KiamSiap Certified</p>
            </div>
          </div>

        </div>

        {/* Frugal Terms Box */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-[10px] text-amber-900 space-y-1">
          <p className="font-bold flex items-center space-x-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            <span>MANDATORY BOARDING CONDITIONS:</span>
          </p>
          <ul className="list-disc list-inside space-y-0.5 text-amber-800">
            <li>Passengers in Standing Class must return handle-straps to flight attendants upon landing.</li>
            <li>In-flight breathing oxygen is billed per minute unless ambient cabin vent is purchased.</li>
            <li>If aircraft battery is low, passengers weighing above 70kg may be asked to help push runway cart.</li>
          </ul>
        </div>

        {/* Actions Button Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200">
          {onClose && (
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100"
            >
              Back To Search
            </button>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 bg-[#001d4a] text-amber-400 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-blue-900 transition-colors shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Boarding Pass</span>
            </button>
            <button
              onClick={() => alert("Boarding pass saved to your Cheapo Air Digital Wallet!")}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-blue-950 font-black text-xs px-5 py-2.5 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Save Pass To Phone</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
