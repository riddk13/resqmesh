import React from 'react';
import { Activity, ShieldCheck, WifiOff, FileText } from 'lucide-react';

export default function DiagnosticsPage() {
  return (
    <div className="p-6 flex-1 bg-slate-900 text-slate-100 flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <Activity className="w-7 h-7 text-amber-400 mr-2" /> Node Diagnostics & System Audit
        </h1>
        <p className="text-xs text-slate-400">Mesh Frequency Metrics, Packet Loss Rates & Incident Audit Logs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <h3 className="font-bold text-slate-200 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-amber-400" /> Protocol Diagnostics
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between pb-2 border-b border-slate-700">
              <span className="text-slate-400">Active Mesh Protocol</span>
              <span className="font-mono font-bold text-indigo-300">BLE Multi-Hop / Wi-Fi Direct</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-700">
              <span className="text-slate-400">Average Packet Latency</span>
              <span className="font-mono font-bold text-emerald-400">142 ms</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-700">
              <span className="text-slate-400">Packet Success Rate</span>
              <span className="font-mono font-bold text-emerald-400">99.2%</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-700">
              <span className="text-slate-400">Encryption Status</span>
              <span className="font-mono font-bold text-indigo-300">AES-256 (Offline Multi-hop)</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <h3 className="font-bold text-slate-200 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-indigo-400" /> Incident Audit Logs
          </h3>

          <div className="space-y-2 font-mono text-[11px] text-slate-300 max-h-[220px] overflow-y-auto">
            <p className="text-emerald-400">[09:28:10] Gateway Sync Completed. 142 Nodes Verified.</p>
            <p className="text-red-400">[09:26:45] SOS Packet #8091 Received via Hop Count 3.</p>
            <p className="text-slate-400">[09:22:11] Node #12B battery dropped below 20%.</p>
            <p className="text-emerald-400">[09:15:00] Victim #8088 Status updated to SAFE by Admin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}