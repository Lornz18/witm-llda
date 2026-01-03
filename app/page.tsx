"use client";

import React, { useState } from "react";
import { Droplets, Info, MapPin, TrendingUp, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const LagunaMap = dynamic(() => import("@/components/LagunaMap"), {
  ssr: false,
});

export default function Home() {
  const [activeTab, setActiveTab] = useState("map");

  const waterQualityMetrics = [
    { label: "pH Level", value: "7.2", status: "good", icon: Droplets },
    {
      label: "Dissolved Oxygen",
      value: "6.8 mg/L",
      status: "good",
      icon: TrendingUp,
    },
    {
      label: "Temperature",
      value: "28°C",
      status: "normal",
      icon: AlertCircle,
    },
    { label: "Active Stations", value: "11", status: "online", icon: MapPin },
  ];

  type Station = {
  station: string;
  image: string;
  desc: string;
};

   const [stations, setStations] = useState<Station[]>([]);
  
    useEffect(() => {
      fetch("/data/water_quality.json")
        .then((res) => res.json())
        .then((data) => setStations(data));
    }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <img src="/images/logo.png" alt="logo" width={56} height={56} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  Laguna Lake Water Quality
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Real-time monitoring and environmental analysis
                </p>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </button>
          </div>
        </div>
      </header>

      {/* Metrics Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {waterQualityMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      metric.status === "good" || metric.status === "online"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {metric.status === "good"
                      ? "Optimal Range"
                      : metric.status === "online"
                      ? "All Online"
                      : "Normal"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        {/* Navigation Tabs */}
        <div className="bg-white rounded-t-xl shadow-md border border-gray-100 overflow-hidden relative z-20">
          <div className="flex border-b border-gray-200 bg-white">
            {["map", "stations"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="relative z-0 h-[81vh] bg-gray-50 overflow-y-auto rounded-b-2xl">
          {activeTab === "map" && (
            <>
              <LagunaMap />
            </>
          )}
          {activeTab === "stations" && (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Monitoring Stations
              </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                {stations.map((station, key) => (
              <div
              key={key}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100"
              >
                <p className="font-semibold text-gray-900 mb-4">{station.station}</p>
                <div className="flex flex-col items-center gap-5">
                  <div>
                    <img src={station.image} alt="station" className="w-75 h-50 rounded-xl object-cover"/>
                  </div>
                  <div>
                    <p className=" text-gray-900 text-sm">{station.desc}</p>
                  </div>
                </div>
              </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "parameters" && (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Water Quality Parameters
              </h2>
              <p className="text-gray-600">
                Parameter descriptions and thresholds will be displayed here
              </p>
            </div>
          )}

           {/* Legend */}
        {activeTab === "map" && (
        <div className="bg-white rounded-b-xl shadow-md border-t-0 border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Water Quality Legend
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700">Good Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-700">Moderate Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">Poor Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
              <span className="text-sm text-gray-700">No Data</span>
            </div>
          </div>
        </div>
        )}
      </div>
        </div>

       

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Data updated every 15 minutes • Last update:{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </footer>
    </div>
  );
}
