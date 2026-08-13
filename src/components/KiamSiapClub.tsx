import React, { useState } from 'react';
import { Award, QrCode, Sparkles, Check, Calculator, Gift, ArrowRight } from 'lucide-react';
import { LOYALTY_TIERS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const KiamSiapClub: React.FC = () => {
  const { classes } = useTheme();
  const [milesToCalc, setMilesToCalc] = useState(10000);
  const [memberPoints, setMemberPoints] = useState(2450);

  const currentTier = LOYALTY_TIERS[2]; // Aluminium Saver

  const handleClaimPeanut = () => {
    if (memberPoints >= 100) {
      setMemberPoints(memberPoints - 100);
      alert('🎉 CONGRATULATIONS! You redeemed 100 points for 1 recycled salted peanut!');
    } else {
      alert('Wah! Not enough points lah! Keep flying Standing Class to earn more points!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold ${classes.badge}`}>
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Singapore Airlines KrisFlyer Parody</span>
        </span>
        <h2 className={`text-3xl sm:text-4xl font-black ${classes.textHeading} font-serif uppercase tracking-tight`}>
          The KiamSiap Rewards Club
        </h2>
        <p className={`text-sm ${classes.textMuted} max-w-xl mx-auto`}>
          Every mile flown earns you fractions of a peanut, free air breathing permissions, and priority eye contact!
        </p>
      </div>

      {/* Member Virtual Card */}
      <div className="max-w-xl mx-auto bg-gradient-to-br from-[#001d4a] via-[#002b6d] to-[#00173b] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#d4af37] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between border-b border-amber-400/30 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">KIAMSIAP REWARDS</span>
            <h3 className="text-xl font-black font-serif text-[#d4af37] uppercase">STAINLESS STEEL ELITE</h3>
          </div>
          <span className="bg-[#d4af37] text-blue-950 font-black text-xs px-3 py-1 rounded-lg">
            {currentTier.badge}
          </span>
        </div>

        <div className="py-6 space-y-4">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-extrabold block tracking-wider">Member Name</span>
            <span className="text-xl font-black uppercase text-white tracking-wide">MR. TAN AH KOW</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-extrabold block tracking-wider">KiamSiap Points</span>
              <span className="text-3xl font-black text-amber-400 font-mono">{memberPoints.toLocaleString()} PTS</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase font-extrabold block tracking-wider">Miles Flown</span>
              <span className="text-lg font-mono font-bold text-gray-200">14,250 Miles</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-amber-400/30 pt-4 text-xs font-mono text-amber-200">
          <span>ID: KS-889911-SG</span>
          <span>VAL: 2029/12</span>
        </div>
      </div>

      {/* Loyalty Tiers Display */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-[#001d4a] font-serif uppercase tracking-tight text-center">
          KiamSiap Loyalty Membership Tiers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LOYALTY_TIERS.slice(0, 3).map((tier) => (
            <div
              key={tier.name}
              className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#001d4a]">{tier.name}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-gray-100" style={{ color: tier.color }}>
                  {tier.badge}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-mono font-semibold">{tier.minPoints} Points Minimum</p>
              <ul className="space-y-1 text-xs text-gray-700">
                {tier.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Miles Reward Calculator */}
      <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-lg space-y-4">
        <div className="flex items-center space-x-2">
          <Calculator className="w-6 h-6 text-amber-700" />
          <h3 className="text-lg font-black text-[#001d4a] font-serif uppercase">
            KiamSiap Miles Rewards Value Calculator
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Enter Miles Flown:</label>
            <input
              type="number"
              value={milesToCalc}
              onChange={(e) => setMilesToCalc(Number(e.target.value))}
              className="w-full bg-white border border-amber-400 rounded-xl p-3 font-mono font-extrabold text-gray-900 text-base focus:outline-none"
            />
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs space-y-1">
            <span className="text-gray-500 block font-bold uppercase">Estimated Reward Entitlement:</span>
            <p className="font-black text-[#001d4a] text-sm">
              {milesToCalc >= 50000
                ? '1x Free Cup of Ice & 1 Armrest Lease (45 Mins)'
                : milesToCalc >= 10000
                ? '1x Empty Plastic Cup + Smell of Pilot Chicken Rice'
                : '1x Recycled Salted Peanut & Friendly Wave'}
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={handleClaimPeanut}
            className="bg-[#001d4a] hover:bg-blue-900 text-amber-400 font-black text-xs px-6 py-3 rounded-xl shadow-md inline-flex items-center space-x-2"
          >
            <Gift className="w-4 h-4" />
            <span>REDEEM 100 POINTS FOR 1 PEANUT</span>
          </button>
        </div>
      </div>

    </div>
  );
};
