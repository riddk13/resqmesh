import React, { useState } from "react";
import {
  PlusCircle,
  MapPin,
  Battery,
  User,
  X,
  Flame,
  Crosshair,
  Send,
} from "lucide-react";
import MapView from "../components/MapView";
import { teams } from "../data/teams";
import { findNearestTeam } from "../utils/geo";

// Form khali hone par yahi default values hongi
const emptyForm = {
  sender: "",
  location: "",
  medical: "",
  familyCount: 1,
};

export default function DashboardPage({ alerts, setAlerts }) {
  const [selectedVictim, setSelectedVictim] = useState(null);

  // ---- Naye states: SOS form ke liye ----
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [coords, setCoords] = useState(null); 
  const [geoStatus, setGeoStatus] = useState(""); 
  const [formError, setFormError] = useState("");

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

  // Purana random SOS (demo ke liye rakha hai, ab chhote button se chalega)
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

  // ---- Form kholna / band karna ----
  const openForm = () => {
    setFormData(emptyForm);
    setCoords(null);
    setGeoStatus("");
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  // Input change handler: har field ke liye ek hi function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---- Geolocation API se asli location lena ----
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords([
          Number(position.coords.latitude.toFixed(5)),
          Number(position.coords.longitude.toFixed(5)),
        ]);
        setGeoStatus("success");
      },
      () => {
        // User ne permission nahi di ya location nahi mili
        setGeoStatus("error");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  // ---- Form submit: naya SOS banao ----
  const handleSubmitSOS = (e) => {
    e.preventDefault();

    if (!formData.sender.trim()) {
      setFormError("Naam likhna zaroori hai.");
      return;
    }

    playAlertSound();

    const newAlert = {
      id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      sender: formData.sender.trim(),
      location: formData.location.trim() || "Location not specified",
      status: "CRITICAL",
      medical: formData.medical.trim() || "Emergency Rescue Required",
      familyCount: Number(formData.familyCount) || 1,
      hops: 0,
      time: "Just now",
      // Agar user ne location nahi li, to Delhi ke paas default point use hoga
      coords: coords || [28.6139, 77.209],
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setShowForm(false);
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

  // Priority sorting: CRITICAL upar, RESCUED neeche.
  // Ek hi status ke andar order same rehta hai (naya SOS pehle), kyunki sort() stable hai.
  // Original `alerts` ko nahi badalte (copy banate hain), taaki map aur localStorage par asar na pade.
  const statusRank = (status) => (status === "CRITICAL" ? 0 : 1);
  const sortedAlerts = [...alerts].sort(
    (a, b) => statusRank(a.status) - statusRank(b.status),
  );

  // Jo victim popup mein khula hai, uske liye sabse paas wali available team nikalo
  const nearest = selectedVictim
    ? findNearestTeam(selectedVictim.coords, teams)
    : null;

  return (
    <div className="p-6 w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* High-Tech Visual Hero Banner with Image Background */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl bg-slate-900 min-h-[220px] flex items-center">
        <img
          src="/banner.jpg"
          alt="Rescue Command Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />

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

          <div className="flex flex-col items-stretch gap-2 shrink-0">
            {/* Ab ye button form kholta hai */}
            <button
              onClick={openForm}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-xl shadow-red-950/80 border border-red-400/40"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Broadcast SOS Alert</span>
            </button>

            {/* Purana random demo button */}
            <button
              onClick={handleSimulateSOS}
              className="text-[11px] text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Simulate random SOS (demo)
            </button>
          </div>
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
            {sortedAlerts.map((alert) => (
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

      {/* ---------- SOS Form Modal (naya) ---------- */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmitSOS}
            className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={closeForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">Broadcast SOS Alert</h3>

            {/* Naam */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Naam *</label>
              <input
                name="sender"
                value={formData.sender}
                onChange={handleChange}
                placeholder="e.g: Rahul Sharma"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-red-500"
              />
            </div>

            {/* Location (text) */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Location / Area</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g: Sector 18 - Near Bridge"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-red-500"
              />
            </div>

            {/* Medical need */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Medical / Rescue Need</label>
              <input
                name="medical"
                value={formData.medical}
                onChange={handleChange}
                placeholder="e.g: Injured leg, needs boat"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-red-500"
              />
            </div>

            {/* Family size */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Family Members</label>
              <input
                type="number"
                min="1"
                name="familyCount"
                value={formData.familyCount}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-red-500"
              />
            </div>

            {/* Geolocation button */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs font-bold py-2.5 rounded-lg cursor-pointer"
              >
                <Crosshair className="w-4 h-4 text-indigo-300" />
                <span>
                  {geoStatus === "loading"
                    ? "Location searching..."
                    : "Use my real location"}
                </span>
              </button>

              {geoStatus === "success" && coords && (
                <p className="text-xs text-emerald-400 font-mono">
                  Location found: {coords[0]}, {coords[1]}
                </p>
              )}
              {geoStatus === "error" && (
                <p className="text-xs text-amber-400">
                 Location could not be detected 
                 (location permission is disabled or the browser does not support it). The default point will be used.
                </p>
              )}
            </div>

            {formError && <p className="text-xs text-red-400">{formError}</p>}

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send SOS</span>
            </button>
          </form>
        </div>
      )}

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

            {/* Nearest rescue team (Haversine distance se) */}
            {selectedVictim.status !== "RESCUED" && nearest && (
              <div className="text-xs bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/40 space-y-1">
                <p className="text-indigo-300 font-bold uppercase tracking-wider text-[10px]">
                  Nearest Available Team
                </p>
                <p className="text-white font-bold text-sm">{nearest.team.name}</p>
                <p className="text-slate-300">
                  {nearest.distanceKm.toFixed(1)} km door · {nearest.team.vehicle}
                </p>
                <p className="text-slate-400">
                  Status: {nearest.team.status} · Base: {nearest.team.location}
                </p>
              </div>
            )}

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
