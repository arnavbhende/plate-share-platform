"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import {
  Star,
  Truck,
  CheckCircle2,
  Clock,
  Settings,
} from "lucide-react";
import { volunteerProfile } from "../_data/mock";

export default function Profile() {
  const [isActive, setIsActive] = useState(volunteerProfile.active);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Volunteer <span className="text-[#2E7D32]">Profile</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">View your stats and manage availability</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Toggle */}
        <div className="space-y-8">
          <Card className="shadow-md">
            <div className="flex flex-col items-center p-8 text-center">
              <div className="relative mb-4">
                <img
                  src={volunteerProfile.avatar}
                  alt={volunteerProfile.name}
                  className="h-32 w-32 rounded-full object-cover ring-4 ring-[#2E7D32] ring-offset-4 shadow-lg"
                />
                {volunteerProfile.verified && (
                  <div className="absolute bottom-2 right-2 bg-white rounded-full p-0.5">
                    <CheckCircle2 className="h-6 w-6 fill-[#2E7D32] text-white" />
                  </div>
                )}
              </div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mt-2">
                {volunteerProfile.name}
              </h2>
              <p className="text-base text-gray-500 mt-1 mb-4">{volunteerProfile.email}</p>
              <Badge className="bg-[#E8F5E9] text-[#2E7D32] px-4 py-1.5 font-bold shadow-sm">
                Active Volunteer
              </Badge>
            </div>
          </Card>

          {/* Active Toggle Card */}
          <Card className={`shadow-md transition-colors ${isActive ? 'bg-[#2E7D32] text-white border-transparent' : 'bg-white'}`}>
            <div className="flex items-center justify-between p-6">
              <div>
                <p className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>Status Toggle</p>
                <p className={`text-sm mt-1 ${isActive ? 'text-green-50' : 'text-gray-500'}`}>
                  {isActive ? "You're visible for tasks" : "You're currently offline"}
                </p>
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ${
                  isActive ? "bg-white ring-transparent" : "bg-gray-300 ring-transparent"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full shadow-sm transition-transform ${
                    isActive ? "translate-x-7 bg-[#2E7D32]" : "translate-x-1 bg-white"
                  }`}
                />
              </button>
            </div>
          </Card>
        </div>

        {/* Right Columns: Insights & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Highlight */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="shadow-md border border-gray-100 flex items-center gap-6 p-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5E9]">
                <Truck className="h-8 w-8 text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-900">{volunteerProfile.totalDeliveries}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total Deliveries</p>
              </div>
            </Card>

            <Card className="shadow-md border border-gray-100 flex items-center gap-6 p-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-50">
                <Star className="h-8 w-8 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-900">{volunteerProfile.rating}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Average Rating</p>
              </div>
            </Card>
          </div>

          {/* Details Section */}
          <Card className="shadow-md border border-gray-100">
            <div className="p-8 space-y-2">
               <h3 className="font-heading text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
                 Registration Info
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                 <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                    <Clock className="h-5 w-5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Availability</p>
                    <p className="text-base font-medium text-gray-900 mt-1">{volunteerProfile.availability}</p>
                  </div>
                 </div>

                 <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                    <Truck className="h-5 w-5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vehicle Details</p>
                    <p className="text-base font-medium text-gray-900 mt-1">{volunteerProfile.vehicle}</p>
                  </div>
                 </div>

                 <div className="flex items-start gap-4 md:col-span-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                    <Settings className="h-5 w-5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operational Preferences</p>
                    <p className="text-base font-medium text-gray-900 mt-1">{volunteerProfile.preferences}</p>
                  </div>
                 </div>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
