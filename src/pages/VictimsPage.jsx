import React from 'react';
import { Users, HeartPulse, UserCheck, AlertTriangle } from 'lucide-react';

export default function VictimsPage({ alerts, setAlerts }) {
  const updateStatus = (id, newStatus) => {
    setAlerts(alerts.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="p-6 flex-1 bg-slate-900 text-slate-100 flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="w-7 h-7 text-red-500 mr-2" /> Victim Triage & Patient Details
        </h1>
        <p className="text-xs text-slate-400">Medical Priorities, Family Members Count & Medical Requirements</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-700">
              <tr>
                <th className="p-4">Victim / ID</th>
                <th className="p-4">Location</th>
                <th className="p-4">Medical Need</th>
                <th className="p-4">Family Size</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {alerts.map((victim) => (
                <tr key={victim.id} className="hover:bg-slate-700/30 transition">
                  <td className="p-4">
                    <p className="font-bold text-slate-100">{victim.sender}</p>
                    <p className="text-[10px] font-mono text-slate-400">{victim.id}</p>
                  </td>
                  <td className="p-4 text-xs">{victim.location}</td>
                  <td className="p-4 text-xs text-amber-300 flex items-center">
                    <HeartPulse className="w-3.5 h-3.5 mr-1.5 shrink-0 text-red-400" />
                    {victim.medical || 'None specified'}
                  </td>
                  <td className="p-4 text-xs font-mono">{victim.familyCount || 1} Person(s)</td>
                  <td className="p-4">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                      victim.status === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {victim.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {victim.status !== 'RESCUED' ? (
                      <button 
                        onClick={() => updateStatus(victim.id, 'RESCUED')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg transition font-medium cursor-pointer"
                      >
                        Mark Rescued
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 flex items-center justify-end">
                        <UserCheck className="w-4 h-4 mr-1" /> Safe
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}