import React from 'react';
import { Wind, Armchair, Maximize2, CornerDownRight, Coffee, UtensilsCrossed, Droplets, Sparkles, Briefcase, Eye, Check } from 'lucide-react';
import { ADDONS } from '../data/mockData';
import { AddOn } from '../types';

interface AddOnSelectorProps {
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
  currency: string;
}

export const AddOnSelector: React.FC<AddOnSelectorProps> = ({
  selectedAddonIds,
  onToggleAddon,
  currency,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return Wind;
      case 'Armchair': return Armchair;
      case 'Maximize2': return Maximize2;
      case 'CornerDownRight': return CornerDownRight;
      case 'Coffee': return Coffee;
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'Droplets': return Droplets;
      case 'Sparkles': return Sparkles;
      case 'Briefcase': return Briefcase;
      case 'Eye': return Eye;
      default: return Sparkles;
    }
  };

  const getCurrencySymbol = () => {
    if (currency === 'MYR') return 'RM';
    if (currency === 'USD') return '$';
    return 'S$';
  };

  const convertPrice = (priceSGD: number) => {
    let rate = 1;
    if (currency === 'MYR') rate = 3.5;
    if (currency === 'USD') rate = 0.75;
    return (priceSGD * rate).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h4 className="font-extrabold text-[#001d4a] uppercase text-sm flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Customize Your Cheapo Comforts (À La Carte)</span>
          </h4>
          <p className="text-xs text-gray-500">Pick only what you need. Zero included by default!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ADDONS.map((addon) => {
          const Icon = getIcon(addon.iconName);
          const isSelected = selectedAddonIds.includes(addon.id);

          return (
            <div
              key={addon.id}
              onClick={() => onToggleAddon(addon.id)}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start space-x-3 ${
                isSelected
                  ? 'bg-amber-50/90 border-amber-500 shadow-md ring-1 ring-amber-400'
                  : 'bg-white border-gray-200 hover:border-amber-300 hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-lg text-white ${isSelected ? 'bg-[#001d4a]' : 'bg-amber-600'}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-900">{addon.name}</span>
                  <span className="font-mono font-extrabold text-xs text-[#001d4a]">
                    +{getCurrencySymbol()}{convertPrice(addon.priceSGD)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{addon.description}</p>
              </div>

              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                isSelected ? 'bg-amber-500 border-amber-600 text-blue-950' : 'border-gray-300'
              }`}>
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
