import React from 'react';
import { Package, Shield, Anchor, Heart, Truck } from 'lucide-react';
import { teams } from '../data/teams';

export default function ResourcesPage() {
  return (
    <div className="p-6 flex-1 bg-slate-900 text-slate-100 flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <Package className="w-7 h-7 text-emerald-400 mr-2" /> Resource & Rescue Team Management
        </h1>
        <p className="text-xs text-slate-400">Inventory Tracking, Rescue Boats, Medical Supplies & Field Teams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Rescue Boats</p>
            <p className="text-2xl font-bold text-slate-100">12 Units</p>
          </div>
          <Anchor className="w-8 h-8 text-indigo-400" />
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">First-Aid Kits</p>
            <p className="text-2xl font-bold text-slate-100">350 Kits</p>
          </div>
          <Heart className="w-8 h-8 text-red-400" />
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Deployed Field Teams</p>
            <p className="text-2xl font-bold text-slate-100">8 Teams</p>
          </div>
          <Truck className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
        <h3 className="font-bold text-slate-200 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-indigo-400" /> Active Rescue Teams Dispatch Board
        </h3>

        <div className="space-y-3">
          {teams.map((t, idx) => (
            <div key={idx} className="bg-slate-900 p-4 rounded-lg border border-slate-700/80 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h4 className="font-bold text-sm text-slate-100">{t.name}</h4>
                <p className="text-xs text-slate-400">Equipped: {t.vehicle}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                  t.status === 'Deployed' ? 'bg-amber-600/30 text-amber-300 border border-amber-600/40' : 'bg-emerald-600/30 text-emerald-300 border border-emerald-600/40'
                }`}>
                  {t.status}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
