import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldAlert, LayoutDashboard, Network, Users, 
  Package, Activity, Radio, X 
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Mesh Topology', path: '/topology', icon: Network },
    { name: 'Victim Triage', path: '/victims', icon: Users },
    { name: 'Resources & Teams', path: '/resources', icon: Package },
    { name: 'Node Diagnostics', path: '/diagnostics', icon: Activity },
  ];

  return (
    <>
      {/* Mobile Back-drop overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Slide-out Sidebar Drawer */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/80 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header with Close Button */}
          <div className="p-5 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600/20 border border-red-500/40 rounded-xl">
                <ShieldAlert className="w-7 h-7 text-red-500 animate-pulse" />
              </div>
              <div>
                <h1 className="font-extrabold text-xl text-white tracking-wider">ResQMesh</h1>
                <p className="text-[10px] text-red-400 font-mono tracking-widest">TACTICAL DISASTER SUITE</p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600/30 to-red-900/20 text-red-400 border border-red-500/40 shadow-lg shadow-red-950/30'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Gateway Node Status */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Radio className="w-4 h-4 text-emerald-400 animate-ping" />
              <div>
                <p className="text-xs font-bold text-slate-200">Gateway Node</p>
                <p className="text-[10px] text-slate-400 font-mono">P2P BLE / Wi-Fi Mesh</p>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500"></span>
          </div>
        </div>
      </aside>
    </>
  );
}