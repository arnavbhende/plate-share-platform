"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { Bell, Moon, Globe, LogOut, ChevronRight, Shield, Database } from "lucide-react";

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2 ${
        enabled ? "bg-[#2E7D32]" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            System <span className="text-[#2E7D32]">Settings</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">Configure your desktop application preferences</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
        
        {/* Settings Grid Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-4">
              General Preferences
              <div className="h-px flex-1 bg-gray-200" />
            </h2>
            <Card className="shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="divide-y divide-gray-100">
                {/* Notifications */}
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5E9] shadow-sm">
                      <Bell className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">Push Notifications</p>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">Alerts for new assignments</p>
                    </div>
                  </div>
                  <Toggle
                    enabled={notifications}
                    onToggle={() => setNotifications(!notifications)}
                  />
                </div>

                {/* Dark Mode */}
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 shadow-sm">
                      <Moon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">Dark Mode GUI</p>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">Toggle site wide dark theme appearance</p>
                    </div>
                  </div>
                  <Toggle
                    enabled={darkMode}
                    onToggle={() => setDarkMode(!darkMode)}
                  />
                </div>

                {/* Language */}
                <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 shadow-sm">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">Application Language</p>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">English (US)</p>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-4">
              Security
              <div className="h-px flex-1 bg-gray-200" />
            </h2>
            <Card className="shadow-sm border border-gray-100">
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 shadow-sm">
                      <Shield className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">Password & Security</p>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">Update credentials and 2FA</p>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 shadow-sm">
                      <Database className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">Data Management</p>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">Download or delete your data</p>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </Card>
          </section>

        </div>

        {/* Sidebar Mini Actions */}
        <div className="space-y-6">
           <Card className="shadow-sm border border-red-100 bg-red-50/30 overflow-hidden">
             <div className="p-6 text-center space-y-4">
               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                 <LogOut className="h-8 w-8 text-red-600" />
               </div>
               <div>
                  <h3 className="text-base font-bold text-gray-900">Sign Out</h3>
                  <p className="text-sm font-medium text-gray-500 mt-1 mb-4">You will need to manually login again.</p>
                  <button className="w-full rounded-xl bg-white border border-red-200 py-3 text-sm font-bold text-red-600 shadow-sm hover:bg-red-50 transition">
                    Logout Immediately
                  </button>
               </div>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
