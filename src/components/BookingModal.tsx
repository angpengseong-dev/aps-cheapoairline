import React, { useState } from 'react';
import { X, Check, User, Scale, Armchair, Sparkles, CreditCard, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';
import { Flight, Booking, CabinClass } from '../types';
import { SeatSelector } from './SeatSelector';
import { AddOnSelector } from './AddOnSelector';
import { BoardingPass } from './BoardingPass';
import { ADDONS } from '../data/mockData';

interface BookingModalProps {
  flight: Flight;
  currency: string;
  cabinClass: CabinClass;
  passengersCount: number;
  sharingSeat: boolean;
  onClose: () => void;
  onBookingComplete: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  flight,
  currency,
  cabinClass,
  passengersCount,
  sharingSeat,
  onClose,
  onBookingComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Passenger Info State
  const [fullName, setFullName] = useState('Tan Ah Kow');
  const [passportNumber, setPassportNumber] = useState('K12345678');
  const [weightKg, setWeightKg] = useState(68);
  const [jacketLayers, setJacketLayers] = useState(3);

  // Seat & Add-ons
  const [selectedSeatId, setSelectedSeatId] = useState('Strap 7A (Overhead Handle Grip)');
  const [seatFeeSGD, setSeatFeeSGD] = useState(0);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['add-air', 'add-pad']);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'cheapo_pay' | 'cash_at_gate'>('cheapo_pay');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const getCurrencySymbol = () => {
    if (currency === 'MYR') return 'RM';
    if (currency === 'USD') return '$';
    return 'S$';
  };

  const getRate = () => {
    if (currency === 'MYR') return 3.5;
    if (currency === 'USD') return 0.75;
    return 1;
  };

  // Fees calculation
  let basePrice = flight.basePriceSGD;
  if (cabinClass === 'standing') basePrice *= 0.4;
  if (cabinClass === 'premium_cardboard') basePrice *= 1.8;
  if (cabinClass === 'baggage_suite') basePrice *= 2.5;

  if (sharingSeat) basePrice *= 0.6;

  // Excess weight fuel surcharge ($0.50 per kg over 70kg)
  const excessWeightFee = Math.max(0, (weightKg - 70) * 0.5);

  // Addons total
  const addonsTotalSGD = selectedAddonIds.reduce((acc, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return acc + (item ? item.priceSGD : 0);
  }, 0);

  const breathingTaxSGD = 18.50;
  const runwayLandingFeeSGD = 12.00;
  const armrestTaxSGD = cabinClass === 'premium_cardboard' ? 0 : 3.50;

  const grandTotalSGD =
    (basePrice + seatFeeSGD + excessWeightFee + addonsTotalSGD + breathingTaxSGD + runwayLandingFeeSGD + armrestTaxSGD) *
    passengersCount;

  const grandTotalConverted = Math.round(grandTotalSGD * getRate());

  const handleToggleAddon = (addonId: string) => {
    if (selectedAddonIds.includes(addonId)) {
      setSelectedAddonIds(selectedAddonIds.filter((id) => id !== addonId));
    } else {
      setSelectedAddonIds([...selectedAddonIds, addonId]);
    }
  };

  const handleConfirmBooking = () => {
    const randomRef = 'CHP' + Math.floor(100000 + Math.random() * 900000);

    const booking: Booking = {
      bookingRef: randomRef,
      flight,
      passenger: {
        fullName,
        passportNumber,
        weightKg,
        jacketLayers,
        cabinClass,
        selectedSeatId,
        addons: selectedAddonIds,
      },
      tripType: 'one-way',
      totalPriceSGD: grandTotalSGD,
      bookingDate: new Date().toISOString().split('T')[0],
      checkedIn: true,
      seatNumber: selectedSeatId,
      feeBreakdown: {
        baseFare: Math.round(basePrice * passengersCount),
        breathingTax: Math.round(breathingTaxSGD * passengersCount),
        runwayLandingFee: Math.round(runwayLandingFeeSGD * passengersCount),
        armrestTax: Math.round(armrestTaxSGD * passengersCount),
        addonsTotal: Math.round((addonsTotalSGD + seatFeeSGD) * passengersCount),
      },
    };

    setConfirmedBooking(booking);
    onBookingComplete(booking);
    setStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-400 w-full max-w-3xl overflow-hidden my-8">
        
        {/* Modal Top Header */}
        <div className="bg-[#001d4a] text-white p-5 border-b-2 border-amber-400 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
              Step {step} of 5 • Cheapo Air Booking Engine
            </span>
            <h3 className="text-xl font-black font-serif uppercase tracking-tight text-white">
              {step === 1 && 'Passenger Info & Weight Declaration'}
              {step === 2 && 'Aircraft Position & Seat Selection'}
              {step === 3 && 'Customize À La Carte Comforts'}
              {step === 4 && 'Frugal Fee Summary & Payment'}
              {step === 5 && 'Booking Confirmed! Boarding Pass Issued'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Progress Indicator */}
        <div className="bg-amber-50 px-6 py-2 border-b border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
          <span className={step >= 1 ? 'text-[#001d4a] underline' : 'opacity-40'}>1. Pax Info</span>
          <span className={step >= 2 ? 'text-[#001d4a] underline' : 'opacity-40'}>2. Seat Map</span>
          <span className={step >= 3 ? 'text-[#001d4a] underline' : 'opacity-40'}>3. Comforts</span>
          <span className={step >= 4 ? 'text-[#001d4a] underline' : 'opacity-40'}>4. Payment</span>
          <span className={step >= 5 ? 'text-[#001d4a] underline' : 'opacity-40'}>5. Boarding Pass</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: PASSENGER INFO */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-300 text-xs text-amber-900">
                <p className="font-bold flex items-center space-x-1.5">
                  <Scale className="w-4 h-4 text-amber-700" />
                  <span>CHEAPO AIR FUEL SAVINGS RULE:</span>
                </p>
                <p className="mt-1">
                  Total passenger weight affects aircraft kerosene consumption. Passengers weighing above 70kg incur a S$0.50/kg fuel surcharge. Tip: Wear jackets to store items!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-gray-700 mb-1">Full Legal Name (As in Passport)</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Passport / IC Number</label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 font-mono font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Declared Weight (kg)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-xs text-gray-500 shrink-0">kg</span>
                  </div>
                  {weightKg > 70 && (
                    <span className="text-[10px] text-amber-700 font-bold block mt-1">
                      +S${((weightKg - 70) * 0.5).toFixed(2)} Fuel Surcharge Applied
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Jackets Worn at Boarding</label>
                  <select
                    value={jacketLayers}
                    onChange={(e) => setJacketLayers(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 font-bold text-gray-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value={1}>1 Layer (Standard)</option>
                    <option value={3}>3 Layers (Saved $15 baggage fee)</option>
                    <option value={5}>5 Layers (Smart Frugal Traveler)</option>
                    <option value={8}>8 Layers (Wearing all winter wear)</option>
                    <option value={12}>12 Layers (Maximum Cheapo Level)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SEAT SELECTION */}
          {step === 2 && (
            <SeatSelector
              selectedSeatId={selectedSeatId}
              onSelectSeat={(seatId, feeSGD) => {
                setSelectedSeatId(seatId);
                setSeatFeeSGD(feeSGD);
              }}
              cabinClass={cabinClass}
            />
          )}

          {/* STEP 3: ADD-ON COMFORT SELECTION */}
          {step === 3 && (
            <AddOnSelector
              selectedAddonIds={selectedAddonIds}
              onToggleAddon={handleToggleAddon}
              currency={currency}
            />
          )}

          {/* STEP 4: FEE BREAKDOWN & PAYMENT */}
          {step === 4 && (
            <div className="space-y-5 text-xs">
              
              {/* Fee Breakdown Card */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                <h4 className="font-black text-[#001d4a] uppercase text-sm border-b border-gray-200 pb-2">
                  Transparent Fee Breakdown ({passengersCount} Pax)
                </h4>

                <div className="flex justify-between text-gray-600">
                  <span>Base Air Ticket ({cabinClass} class):</span>
                  <span className="font-bold text-gray-900">{getCurrencySymbol()}{Math.round(basePrice * getRate() * passengersCount)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Assigned Position Fee ({selectedSeatId}):</span>
                  <span className="font-bold text-gray-900">+{getCurrencySymbol()}{Math.round(seatFeeSGD * getRate() * passengersCount)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Breathing Oxygen Tax (Mandatory):</span>
                  <span className="font-bold text-gray-900">+{getCurrencySymbol()}{Math.round(breathingTaxSGD * getRate() * passengersCount)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Runway Landing Impact Fee:</span>
                  <span className="font-bold text-gray-900">+{getCurrencySymbol()}{Math.round(runwayLandingFeeSGD * getRate() * passengersCount)}</span>
                </div>

                {excessWeightFee > 0 && (
                  <div className="flex justify-between text-amber-800 font-bold">
                    <span>Passenger Weight Fuel Surcharge ({weightKg}kg):</span>
                    <span>+{getCurrencySymbol()}{Math.round(excessWeightFee * getRate() * passengersCount)}</span>
                  </div>
                )}

                {addonsTotalSGD > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Selected À La Carte Comforts ({selectedAddonIds.length} items):</span>
                    <span className="font-bold text-gray-900">+{getCurrencySymbol()}{Math.round(addonsTotalSGD * getRate() * passengersCount)}</span>
                  </div>
                )}

                <div className="border-t-2 border-gray-300 pt-2 flex justify-between items-center text-sm">
                  <span className="font-black text-[#001d4a] uppercase">Grand Total Amount:</span>
                  <span className="font-black text-2xl text-[#001d4a]">
                    {getCurrencySymbol()}{grandTotalConverted}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="font-extrabold text-[#001d4a] uppercase block">Select Payment Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cheapo_pay')}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === 'cheapo_pay'
                        ? 'bg-amber-50 border-amber-500 shadow-md font-bold'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <span className="font-bold text-xs block text-[#001d4a]">🪙 Cheapo Pay</span>
                    <span className="text-[10px] text-gray-500">Instant debit with 0% processing fee</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === 'credit'
                        ? 'bg-amber-50 border-amber-500 shadow-md font-bold'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <span className="font-bold text-xs block text-[#001d4a]">💳 Credit Card</span>
                    <span className="text-[10px] text-gray-500">+S$3.50 Card Terminal Fee</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_at_gate')}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === 'cash_at_gate'
                        ? 'bg-amber-50 border-amber-500 shadow-md font-bold'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <span className="font-bold text-xs block text-[#001d4a]">💵 Pay In Coins At Gate</span>
                    <span className="text-[10px] text-gray-500">Bring exact change in $1 coins</span>
                  </button>

                </div>
              </div>

            </div>
          )}

          {/* STEP 5: BOARDING PASS GENERATED */}
          {step === 5 && confirmedBooking && (
            <BoardingPass booking={confirmedBooking} currency={currency} onClose={onClose} />
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="flex items-center space-x-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 px-4 py-2.5 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            <div className="flex items-center space-x-3">
              <span className="font-black text-[#001d4a] text-sm hidden sm:inline">
                Total: {getCurrencySymbol()}{grandTotalConverted}
              </span>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((step + 1) as any)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center space-x-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="bg-[#001d4a] hover:bg-blue-900 text-amber-400 font-black text-xs px-8 py-3 rounded-xl shadow-xl flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>CONFIRM & PAY NOW</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
