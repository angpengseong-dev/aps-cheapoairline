import React, { useState } from 'react';
import { Search, UserCheck, Scale, QrCode, ShieldAlert, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Booking } from '../types';
import { BoardingPass } from './BoardingPass';
import { SAMPLE_FLIGHTS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface ManageBookingProps {
  userBookings: Booking[];
  currency: string;
}

export const ManageBooking: React.FC<ManageBookingProps> = ({ userBookings, currency }) => {
  const { classes } = useTheme();
  const [searchRef, setSearchRef] = useState('CHP8888');
  const [lastName, setLastName] = useState('Tan');
  const [foundBooking, setFoundBooking] = useState<Booking | null>({
    bookingRef: 'CHP8888',
    flight: SAMPLE_FLIGHTS[0],
    passenger: {
      fullName: 'Tan Ah Kow',
      passportNumber: 'K88888888',
      weightKg: 68,
      jacketLayers: 5,
      cabinClass: 'standing',
      selectedSeatId: 'Strap 7A (Overhead Handle Grip)',
      addons: ['add-air', 'add-pad'],
    },
    tripType: 'one-way',
    totalPriceSGD: 38.50,
    bookingDate: '2026-08-12',
    checkedIn: true,
    seatNumber: 'Strap 7A (Overhead Handle Grip)',
    feeBreakdown: {
      baseFare: 12,
      breathingTax: 18.5,
      runwayLandingFee: 12,
      armrestTax: 0,
      addonsTotal: 10.5,
    },
  });

  const [scaleStepped, setScaleStepped] = useState(false);
  const [simulatedWeight, setSimulatedWeight] = useState(68);
  const [showPassModal, setShowPassModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const match = userBookings.find(
      (b) => b.bookingRef.toUpperCase() === searchRef.trim().toUpperCase()
    );

    if (match) {
      setFoundBooking(match);
    } else if (searchRef.toUpperCase() === 'CHP8888') {
      setFoundBooking({
        bookingRef: 'CHP8888',
        flight: SAMPLE_FLIGHTS[0],
        passenger: {
          fullName: 'Tan Ah Kow',
          passportNumber: 'K88888888',
          weightKg: 68,
          jacketLayers: 5,
          cabinClass: 'standing',
          selectedSeatId: 'Strap 7A (Overhead Handle Grip)',
          addons: ['add-air', 'add-pad'],
        },
        tripType: 'one-way',
        totalPriceSGD: 38.50,
        bookingDate: '2026-08-12',
        checkedIn: true,
        seatNumber: 'Strap 7A (Overhead Handle Grip)',
        feeBreakdown: {
          baseFare: 12,
          breathingTax: 18.5,
          runwayLandingFee: 12,
          armrestTax: 0,
          addonsTotal: 10.5,
        },
      });
    } else {
      setFoundBooking(null);
    }
  };

  const handleStepOnScale = () => {
    setScaleStepped(true);
    const weight = Math.floor(62 + Math.random() * 20);
    setSimulatedWeight(weight);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      
      {/* Search Header */}
      <div className="text-center space-y-2">
        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold ${classes.badge}`}>
          <UserCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Self-Service Portal</span>
        </span>
        <h2 className={`text-3xl font-black ${classes.textHeading} font-serif uppercase tracking-tight`}>
          Manage Booking & Digital Check-in
        </h2>
        <p className={`text-sm ${classes.textMuted} max-w-xl mx-auto`}>
          Retrieve your Cheapo Air itinerary, complete your mandatory weight check, and print your boarding pass!
        </p>
      </div>

      {/* Lookup Card */}
      <div className={`rounded-2xl p-6 ${classes.card}`}>
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className={`block text-xs font-extrabold uppercase ${classes.textMuted} mb-1`}>Booking Reference</label>
            <input
              type="text"
              placeholder="e.g. CHP8888"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value.toUpperCase())}
              className={`w-full rounded-xl p-3 font-mono font-bold text-sm ${classes.input}`}
            />
          </div>

          <div>
            <label className={`block text-xs font-extrabold uppercase ${classes.textMuted} mb-1`}>Passenger Family Name</label>
            <input
              type="text"
              placeholder="e.g. Tan"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full rounded-xl p-3 font-bold text-sm ${classes.input}`}
            />
          </div>

          <button
            type="submit"
            className={`${classes.buttonPrimary} px-6 py-3 rounded-xl flex items-center justify-center space-x-2 text-sm`}
          >
            <Search className="w-4 h-4" />
            <span>FIND BOOKING</span>
          </button>
        </form>
      </div>

      {/* Display Found Booking */}
      {foundBooking ? (
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-400 p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
                REF: {foundBooking.bookingRef}
              </span>
              <h3 className="text-2xl font-black text-[#001d4a] font-serif uppercase mt-1">
                {foundBooking.passenger.fullName}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Checked-In & Verified</span>
              </span>
            </div>
          </div>

          {/* Flight Summary Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] font-bold uppercase">Flight</span>
              <span className="font-mono font-extrabold text-gray-900">{foundBooking.flight.flightNumber}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] font-bold uppercase">Route</span>
              <span className="font-extrabold text-gray-900">{foundBooking.flight.originCode} ➔ {foundBooking.flight.destinationCode}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] font-bold uppercase">Position/Seat</span>
              <span className="font-extrabold text-amber-700">{foundBooking.seatNumber}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] font-bold uppercase">Status</span>
              <span className="font-extrabold text-green-700">Ready For Boarding</span>
            </div>
          </div>

          {/* Interactive Weight Scale Station */}
          <div className="bg-gradient-to-r from-blue-950 to-[#001d4a] text-white p-6 rounded-2xl border border-amber-400/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scale className="w-6 h-6 text-amber-400" />
                <h4 className="font-black font-serif text-lg text-amber-300 uppercase">
                  Digital Weight Verification Scale
                </h4>
              </div>
              <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded font-mono">
                Mandatory Terminal Check
              </span>
            </div>

            <p className="text-xs text-gray-300">
              Cheapo Air requires all passengers to verify total weight before entering the gate. Click the scale below to weigh yourself:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/10 p-4 rounded-xl border border-white/10">
              <div className="text-center sm:text-left">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Scale Sensor Reading</span>
                <span className="text-3xl font-black text-amber-400 font-mono">
                  {scaleStepped ? `${simulatedWeight} kg` : '--- kg'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleStepOnScale}
                className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs px-6 py-3 rounded-xl shadow-lg transform active:scale-95 transition-all"
              >
                {scaleStepped ? 'RE-WEIGH PASSENGER' : 'STEP ON SCALE NOW'}
              </button>
            </div>

            {scaleStepped && (
              <div className="text-xs text-amber-200 bg-amber-500/20 p-3 rounded-lg border border-amber-400/30">
                ✅ <strong>Weight Approved:</strong> {simulatedWeight}kg recorded. {simulatedWeight <= 70 ? 'No excess fuel fee required!' : `+$${((simulatedWeight - 70) * 0.5).toFixed(2)} fuel tax appended.`}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={() => alert('Seat upgraded to "Cardboard Economy with 1 Armrest" for S$5!')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-5 py-2.5 rounded-xl border border-gray-300"
            >
              Upgrade Seat (+S$5)
            </button>

            <button
              onClick={() => setShowPassModal(true)}
              className="bg-[#001d4a] hover:bg-blue-900 text-amber-400 font-black text-xs px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2"
            >
              <QrCode className="w-4 h-4" />
              <span>VIEW / PRINT BOARDING PASS</span>
            </button>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center text-gray-600 shadow-md">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
          <h4 className="text-lg font-bold text-gray-900">No Booking Found</h4>
          <p className="text-xs mt-1">Check your reference number or try searching with reference <strong>CHP8888</strong>.</p>
        </div>
      )}

      {/* Boarding Pass Modal Overlay */}
      {showPassModal && foundBooking && (
        <div className="fixed inset-0 z-50 bg-blue-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl">
            <BoardingPass booking={foundBooking} currency={currency} onClose={() => setShowPassModal(false)} />
          </div>
        </div>
      )}

    </div>
  );
};
