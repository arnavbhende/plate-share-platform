"use client";

import Card from "@/components/Card";
import Button from "@/components/Button";
import { MapPin, Navigation, Clock, Truck } from "lucide-react";

export default function DeliveryTracking() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Delivery <span className="text-[#2E7D32]">Tracking</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">Live delivery status and estimated arrival</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Map Visualization */}
        <Card className="overflow-hidden shadow-lg h-[600px] flex flex-col relative w-full border-none">
          <div className="flex-1 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] w-full">
            {/* Expanded SVG Map visualization for Desktop */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {/* Simulated route */}
              <svg
                className="h-full w-full max-h-[500px]"
                viewBox="0 0 600 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid pattern */}
                <defs>
                  <pattern
                    id="grid"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="#2E7D32"
                      strokeWidth="0.5"
                      opacity="0.2"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Route line */}
                <path
                  d="M 120 300 Q 250 150 400 200 Q 450 250 500 100"
                  stroke="#2E7D32"
                  strokeWidth="6"
                  strokeDasharray="16 8"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Start point */}
                <circle cx="120" cy="300" r="14" fill="#2E7D32" />
                <circle cx="120" cy="300" r="6" fill="white" />

                {/* Current position (animated pulse) */}
                <g transform="translate(400, 200)">
                  <circle cx="0" cy="0" r="24" fill="#2E7D32" opacity="0.2">
                    <animate
                      attributeName="r"
                      values="16;32;16"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.4;0.1;0.4"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="0" cy="0" r="12" fill="#2E7D32" />
                  <circle cx="0" cy="0" r="5" fill="white" />
                </g>

                {/* End point */}
                <circle cx="500" cy="100" r="14" fill="#1B5E20" />
                <circle cx="500" cy="100" r="6" fill="white" />

                {/* Labels */}
                <text x="80" y="340" className="text-sm" fill="#2E7D32" fontWeight="700">
                  Pickup Location
                </text>
                <text x="450" y="70" className="text-sm" fill="#1B5E20" fontWeight="700">
                  Drop-off Location
                </text>
              </svg>
            </div>
          </div>
        </Card>

        {/* Right Column: Status Details */}
        <div className="space-y-6 flex flex-col h-full">
          {/* Status Tracker */}
          <Card className="shadow-md">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F5E9] shrink-0">
                  <Truck className="h-8 w-8 text-[#2E7D32]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Delivery in Progress
                  </h2>
                  <p className="text-sm font-semibold text-[#2E7D32] uppercase tracking-wider">
                    On the way to drop-off
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden w-full">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] transition-all"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="flex justify-between mt-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>Pickup</span>
                  <span>En Route</span>
                  <span>Delivery</span>
                </div>
              </div>
            </div>
          </Card>

          {/* ETA Metrics */}
          <Card className="shadow-md">
            <div className="grid grid-cols-2 divide-x divide-gray-100 py-6">
              <div className="px-8 text-center flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 mb-3">
                  <Clock className="h-6 w-6 text-[#2E7D32]" />
                </div>
                <p className="text-2xl font-black text-gray-900">2H 15M</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Estimated Arrival</p>
              </div>
              <div className="px-8 text-center flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 mb-3">
                  <MapPin className="h-6 w-6 text-[#2E7D32]" />
                </div>
                <p className="text-2xl font-black text-gray-900">3.5 km</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Distance Remaining</p>
              </div>
            </div>
          </Card>

          {/* Route Overview */}
          <Card className="shadow-md">
            <div className="p-8 space-y-6">
              <h3 className="font-heading text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Route Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-[#2E7D32]" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
                    <p className="text-base font-medium text-gray-900 mt-1">Grand Hotel, Brigade Road</p>
                  </div>
                </div>
                <div className="ml-3 border-l-2 border-dashed border-gray-300 h-6" />
                <div className="flex items-start gap-4">
                  <Navigation className="mt-0.5 h-6 w-6 shrink-0 text-[#1B5E20]" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Drop-off</p>
                    <p className="text-base font-medium text-gray-900 mt-1">City Shelter, Richmond Town</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Button className="py-4 text-lg w-full font-bold shadow-lg mt-auto">
            Mark as Delivered ✓
          </Button>
        </div>
      </div>
    </div>
  );
}
