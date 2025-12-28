"use client";

import React, { useState } from "react";
import { Droplets, Info, MapPin, TrendingUp, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";

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
    { label: "Active Stations", value: "12", status: "online", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
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
            {["map", "stations", "parameters"].map((tab) => (
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
        <div className="relative z-0 h-[70vh] bg-gray-50">
          {activeTab === "map" && (
            <>
              <LagunaMap />
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Interactive Features
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Click markers to view station details</li>
                  <li>• Hover for real-time parameter values</li>
                  <li>• Color-coded water quality indicators</li>
                </ul>
              </div>
            </>
          )}
          {activeTab === "stations" && (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Monitoring Stations
              </h2>
              <p className="text-gray-600">
                Station list and details will be displayed here
              </p>
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
        </div>

        {/* Legend */}
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
