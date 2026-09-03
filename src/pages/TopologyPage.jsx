import React from 'react';
import { Network, Cpu, Wifi, Battery, Server } from 'lucide-react';

export default function TopologyPage({ alerts }) {
  const mockNodes = [
    { id: 'Node-01 (Gateway)', type: 'Gateway Node', battery: '98%', signal: '-45 dBm', status: 'Online' },
    { id: 'Node-02 (Relay Alpha)', type: 'Relay Node', battery: '82%', signal: '-62 dBm', status: 'Online' },
    { id: 'Node-03 (Relay Beta)', type: 'Relay Node', battery: '45%', signal: '-78 dBm', status: 'Warning' },
    { id: 'Node-04 (End Device)', type: 'Victim Node', battery: '18%', signal: '-90 dBm', status: 'Critical' },
  ];

  return (
    <div className="p-8 w-full max-w-7xl mx-auto flex flex-col gap-8">
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-bold flex items-center text-white">
          <Network className="w-7 h-7 text-indigo-400 mr-3" /> Mesh Network Topology
        </h1>
        <p className="text-sm text-slate-400 mt-1">Multi-Hop Device Connections and Decentralized Routing Path Analysis</p>
      </div>

      {/* Grid Cards (2 columns on medium, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockNodes.map((node) => (
          <div key={node.id} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center">
              <div className="p-2.5 bg-indigo-950/60 text-indigo-400 rounded-xl border border-indigo-800/40">
                <Cpu className="w-5 h-5" />
              </div>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                node.status === 'Online' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/40' :
                node.status === 'Warning' ? 'bg-amber-600/20 text-amber-400 border border-amber-600/40' : 'bg-red-600/20 text-red-400 border border-red-600/40'
              }`}>
                {node.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-100">{node.id}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{node.type}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-700/60">
              <div className="flex justify-between items-center">
                <span className="flex items-center text-slate-400"><Battery className="w-3.5 h-3.5 mr-1.5" /> Battery</span>
                <span className="font-mono font-bold text-slate-200">{node.battery}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center text-slate-400"><Wifi className="w-3.5 h-3.5 mr-1.5" /> Signal</span>
                <span className="font-mono font-bold text-slate-200">{node.signal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/80 p-12 rounded-2xl border border-slate-700/60 flex flex-col justify-center items-center text-center my-4">
        <Server className="w-12 h-12 text-indigo-400 mb-3 animate-bounce" />
        <h3 className="text-lg font-bold text-slate-200">Mesh Route Graph Visualizer</h3>
        <p className="text-xs text-slate-400 max-w-md mt-1">
          Showing Bluetooth Low Energy (BLE) & Wi-Fi Direct dynamic links across active emergency nodes.
        </p>
      </div>
    </div>
  );
}