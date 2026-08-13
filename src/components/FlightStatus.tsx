import React, { useState } from 'react';
import { Compass, RefreshCw, Plane, Gauge, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { MOCK_FLIGHT_STATUSES } from '../data/mockData';

export const FlightStatus: React.FC = () => {
  const [statuses, setStatuses] = useState(MOCK_FLIGHT_STATUSES);
  const [filterQuery, setFilterQuery] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState('Just Now');

  const handleRefresh = () => {
    setLastRefreshed(new Date().toLocaleTimeString());
    // Simulate minor telemetry updates
    const updated = statuses.map((item) => ({
      ...item,
      altitudeFt: item.altitudeFt > 0 ? item.altitudeFt + Math.floor(Math.random() * 500 - 250) : 0,
      speedKts: item.speedKts > 0 ? item.speedKts + Math.floor(Math.random() * 20 - 10) : 0,
    }));
    setStatuses(updated);
  };

  const filtered = statuses.filter(
    (s) =>
      s.flightNumber.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.route.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold">
          <Compass className="w-3.5 h-3.5 text-amber-700" />
          <span>Real-Time Fleet Telemetry</span>
        </span>
        <h2 className="text-3xl font-black text-[#001d4a] font-serif uppercase tracking-tight">
          Cheapo Air Live Flight Tracker
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Monitor aircraft positions, gliding engine statuses, and fuel bargaining updates in real-time.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-200">
        <input
          type="text"
          placeholder="Filter by Flight No. or City (e.g. CP 101, SIN)..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full sm:w-80 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-500"
        />

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-gray-400 font-mono">Updated: {lastRefreshed}</span>
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 bg-[#001d4a] hover:bg-blue-900 text-amber-400 font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>REFRESH RADAR</span>
          </button>
        </div>
      </div>

      {/* Flight Cards Grid */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.flightNumber}
            className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 hover:border-amber-400 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-3">
                <span className="bg-[#001d4a] text-amber-400 font-mono font-black text-sm px-3 py-1 rounded-lg">
                  {item.flightNumber}
                </span>
                <span className="text-base font-black text-gray-900 uppercase">{item.route}</span>
              </div>

              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                item.status.includes('Gliding')
                  ? 'bg-blue-50 text-blue-900 border-blue-300'
                  : item.status.includes('On Time')
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}>
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Altitude</span>
                <span className="font-mono font-bold text-gray-900">{item.altitudeFt.toLocaleString()} ft</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Airspeed</span>
                <span className="font-mono font-bold text-gray-900">{item.speedKts} kts</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Estimated ETA</span>
                <span className="font-bold text-amber-700">{item.eta}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Fuel Saving Mode</span>
                <span className="font-bold text-green-700">Active</span>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium italic">
              📢 <strong>Captain's Log:</strong> {item.remarks}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
