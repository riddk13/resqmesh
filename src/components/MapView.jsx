import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Custom Map Marker Icons using SVG Strings
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="
      background-color: ${color};
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 10px ${color};
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

const redIcon = createCustomIcon('#DC2626');   // SOS Victims
const greenIcon = createCustomIcon('#16A34A'); // Relay / Gateway Nodes

export default function MapView({ alerts }) {
  // Center coordinates (Default: New Delhi)
  const defaultCenter = [28.6139, 77.2090];

  // Multi-hop routing path visualization
  const meshRoute = [
    [28.6139, 77.2090], // Gateway Node
    [28.6180, 77.2150], // Relay Node
    [28.6220, 77.2200], // Victim Node
  ];

  return (
    <div className="w-full h-[450px] rounded-lg overflow-hidden border border-slate-700 relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="w-full h-full"
      >
        {/* Free OpenStreetMap Layer (No API Key Required) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Multi-Hop Mesh Line */}
        <Polyline 
          positions={meshRoute} 
          pathOptions={{ color: '#2563EB', weight: 3, dashArray: '6, 6' }} 
        />

        {/* SOS Alert Markers */}
        {alerts.map((alert) => (
          <Marker 
            key={alert.id} 
            position={alert.coords} 
            icon={alert.status === 'CRITICAL' ? redIcon : greenIcon}
          >
            <Popup>
              <div className="p-1 text-slate-900 font-sans">
                <span className={`font-bold text-xs px-1.5 py-0.5 rounded text-white ${
                  alert.status === 'CRITICAL' ? 'bg-red-600' : 'bg-emerald-600'
                }`}>
                  {alert.id}
                </span>
                <h4 className="font-bold text-sm mt-1">{alert.sender}</h4>
                <p className="text-xs text-slate-600">{alert.location}</p>
                <div className="text-[10px] mt-2 pt-1 border-t flex justify-between text-slate-500">
                  <span>Hops: {alert.hops}</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}