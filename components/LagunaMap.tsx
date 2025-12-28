"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

type Station = {
  station: string;
  coordinates: { lat: number; lng: number };
  DO: number;
  pH: number;
  BOD: number;
  COD: number;
  turbidity: number;
  temperature: number;
  nitrate: number;
  phosphate: number;
};

// Fix Leaflet default icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Marker icons
const markerIcons = {
  green: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),

  orange: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),

  red: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

// Water Quality based on Dissolved Oxygen (DO)
const getWaterQualityIcon = (station: Station) => {
  if (station.DO >= 6) {
    return markerIcons.green;   // Good
  } else if (station.DO >= 4) {
    return markerIcons.orange;  // Fair
  } else {
    return markerIcons.red;     // Poor
  }
};

export default function LagunaMap() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    fetch("/data/water_quality.json")
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  return (
    <MapContainer
      center={[14.4, 121.2]} // Center of Laguna Lake
      zoom={10}
      style={{ height: "70vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {stations.map((station, idx) => (
        <Marker
          key={idx}
          position={[station.coordinates.lat, station.coordinates.lng]}
         icon={getWaterQualityIcon(station)}
        >
          <Popup>
            <h3 className="font-semibold mb-2">{station.station}</h3>
            <ul>
              <li>DO: {station.DO} mg/L</li>
              <li>pH: {station.pH}</li>
              <li>BOD: {station.BOD} mg/L</li>
              <li>COD: {station.COD} mg/L</li>
              <li>Turbidity: {station.turbidity} NTU</li>
              <li>Temperature: {station.temperature} °C</li>
              <li>Nitrate: {station.nitrate} mg/L</li>
              <li>Phosphate: {station.phosphate} mg/L</li>
            </ul>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
