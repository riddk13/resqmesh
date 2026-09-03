import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Menu, ShieldAlert, Radio } from 'lucide-react';

import DashboardPage from './pages/DashboardPage';
import TopologyPage from './pages/TopologyPage';
import VictimsPage from './pages/VictimsPage';
import ResourcesPage from './pages/ResourcesPage';
import DiagnosticsPage from './pages/DiagnosticsPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [alerts, setAlerts] = useState([
    { 
      id: 'SOS-8091', 
      sender: 'Victim_81', 
      location: 'Sector 18 - Submerged Area', 
      status: 'CRITICAL', 
      medical: 'Injured Arm, Needs Boat Evacuation',
      familyCount: 3,
      hops: 3, 
      time: 'Just now',
      coords: [28.6220, 77.2200]
    },
    { 
      id: 'SOS-8092', 
      sender: 'Victim_98', 
      location: 'Sector 18 - Submerged Area', 
      status: 'CRITICAL', 
      medical: 'Elderly Patient, High Water Level',
      familyCount: 2,
      hops: 2, 
      time: '2 mins ago',
      coords: [28.6180, 77.2150]
    },
    { 
      id: 'SOS-8088', 
      sender: 'Victim_14', 
      location: 'Block C Shelter Base', 
      status: 'RESCUED', 
      medical: 'Safe at Shelter',
      familyCount: 1,
      hops: 0, 
      time: '15 mins ago',
      coords: [28.6139, 77.2090]
    },
  ]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        
        {/* Top Sticky Header */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 px-6 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white hover:bg-slate-700 transition cursor-pointer flex items-center space-x-2"
              title="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5 text-red-500" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Menu</span>
            </button>

            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              <span className="font-black text-lg text-white tracking-wider">ResQMesh</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="hidden md:flex items-center text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-800/40">
              <Radio className="w-3.5 h-3.5 mr-1.5 animate-ping" /> Mesh Gateway Active
            </span>
          </div>
        </header>

        {/* Sidebar Menu */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Dynamic Pages */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardPage alerts={alerts} setAlerts={setAlerts} />} />
            <Route path="/topology" element={<TopologyPage alerts={alerts} />} />
            <Route path="/victims" element={<VictimsPage alerts={alerts} setAlerts={setAlerts} />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/diagnostics" element={<DiagnosticsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}