import React, { useState } from "react";
import {
  AlertTriangle,
  PlusCircle,
  MapPin,
  ShieldCheck,
  Radio,
  Activity,
  Battery,
  User,
  X,
  Flame,
} from "lucide-react";
import MapView from "../components/MapView";

export default function DashboardPage({ alerts, setAlerts }) {
  const [selectedVictim, setSelectedVictim] = useState(null);

  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.log("Audio restricted");
    }
  };

  const handleSimulateSOS = () => {
    playAlertSound();
    const randomId = `SOS-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomLat = 28.61 + Math.random() * 0.02;
    const randomLng = 77.2 + Math.random() * 0.02;

    const newAlert = {
      id: randomId,
      sender: `Victim_${Math.floor(Math.random() * 90) + 10}`,
      location: "Submerged Rescue Zone",
      status: "CRITICAL",
      medical: "Emergency Rescue Required",
      battery: `${Math.floor(Math.random() * 30) + 10}%`,
      familyCount: Math.floor(Math.random() * 4) + 1,
      hops: Math.floor(Math.random() * 4) + 1,
      time: "Just now",
      coords: [randomLat, randomLng],
    };

    setAlerts((prev) => [newAlert, ...prev]);
  };

  const updateStatus = (id, newStatus) => {
    setAlerts(
      alerts.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
    if (selectedVictim && selectedVictim.id === id) {
      setSelectedVictim({ ...selectedVictim, status: newStatus });
    }
  };

  const criticalCount = alerts.filter((a) => a.status === "CRITICAL").length;
  const rescuedCount = alerts.filter((a) => a.status === "RESCUED").length;

  return (
    <div className="p-6 w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* High-Tech Tactical Hero Banner with Embedded SVG Pattern */}
      {/* High-Tech Visual Hero Banner with Image Background */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl bg-slate-900 min-h-[220px] flex items-center">
        {/* Rescue Helicopter Background Image */}
        <img
          src="/banner.jpg"
          alt="Rescue Command Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />

        {/* Light Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />

        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-600/40 text-red-300 border border-red-500/60 tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
                <Flame className="w-3.5 h-3.5 text-red-500 animate-bounce" />{" "}
                Emergency Command Base
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 font-mono backdrop-blur-sm">
                P2P Mesh Online
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase drop-shadow-md">
              ResQMesh <span className="text-red-500">Tactical Control</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 drop-shadow">
              Decentralized offline emergency signal tracking & multi-hop
              disaster relief dispatch system.
            </p>
          </div>

          <button
            onClick={handleSimulateSOS}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-xl shadow-red-950/80 border border-red-400/40 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Broadcast SOS Alert</span>
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left SOS Feed Queue */}
        <div className="lg:col-span-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2 animate-ping"></span>
            Live SOS Queue ({alerts.length})
          </h2>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedVictim(alert)}
                className={`p-4 rounded-xl border transition cursor-pointer transform hover:-translate-y-0.5 ${
                  alert.status === "CRITICAL"
                    ? "bg-red-950/30 border-red-500/60 sos-glow"
                    : "bg-slate-950/80 border-slate-800"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                      {alert.id}
                    </span>
                    <h3 className="font-bold text-sm text-white">
                      {alert.sender}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase ${
                      alert.status === "CRITICAL"
                        ? "bg-red-600 text-white"
                        : "bg-emerald-600 text-white"
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 flex items-center mt-2">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-red-400 shrink-0" />
                  <span className="truncate">{alert.location}</span>
                </p>

                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800 font-mono">
                  <span className="text-indigo-300">Hops: {alert.hops}</span>
                  <span className="text-slate-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Map Display */}
        <div className="lg:col-span-8 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Live Tactical Mesh Map
          </h2>

          <div className="w-full h-[480px] rounded-xl overflow-hidden border border-slate-800">
            <MapView alerts={alerts} />
          </div>
        </div>
      </div>

      {/* Victim Inspector Modal */}
      {selectedVictim && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedVictim(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-600/20 text-red-500 rounded-xl border border-red-500/40">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-slate-400">
                  {selectedVictim.id}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedVictim.sender}
                </h3>
              </div>
            </div>

            <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span
                  className={
                    selectedVictim.status === "CRITICAL"
                      ? "text-red-400 font-bold"
                      : "text-emerald-400 font-bold"
                  }
                >
                  {selectedVictim.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Battery Level:</span>
                <span className="text-amber-400 font-bold flex items-center">
                  <Battery className="w-3.5 h-3.5 mr-1" />
                  {selectedVictim.battery || "24%"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Family Members:</span>
                <span className="text-slate-200">
                  {selectedVictim.familyCount || 2} Persons
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Coordinates:</span>
                <span className="text-indigo-300">
                  {selectedVictim.coords.join(", ")}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {selectedVictim.status !== "RESCUED" ? (
                <button
                  onClick={() => updateStatus(selectedVictim.id, "RESCUED")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer"
                >
                  Dispatch Rescue & Mark Safe
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-slate-800 text-emerald-400 font-bold text-xs py-3 rounded-xl border border-emerald-500/30"
                >
                  Victim Marked Safe
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
