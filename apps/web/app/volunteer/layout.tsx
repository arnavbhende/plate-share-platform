"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ClipboardList, CheckCircle2, User, LogOut } from "lucide-react";
import { ReactNode } from "react";

const tabs = [
  { label: "Dashboard", href: "/volunteer", icon: Home },
  { label: "Available Pickups", href: "/volunteer/available", icon: Package },
  { label: "Assigned Tasks", href: "/volunteer/assigned", icon: ClipboardList },
  { label: "Completed", href: "/volunteer/completed", icon: CheckCircle2 },
];

const bottomTabs = [
  { label: "Profile & Settings", href: "/volunteer/profile", icon: User },
];

export default function VolunteerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Desktop Sidebar Navigation */}
      <nav className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 shrink-0 items-center border-b border-gray-200 bg-[#E8F5E9] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#2E7D32]/10 mr-3">
            <span className="text-lg">🍽</span>
          </div>
          <h1 className="font-heading text-xl font-bold tracking-tight text-gray-900">
            Plate<span className="text-[#2E7D32]">Share</span>
          </h1>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto pt-6">
          <div className="flex flex-col gap-1 px-4">
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Volunteer Portal
            </p>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive =
                tab.href === "/volunteer"
                  ? pathname === "/volunteer"
                  : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#E8F5E9] text-[#2E7D32]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-[#2E7D32]" : "text-gray-400"}`}
                    strokeWidth={isActive ? 2.4 : 1.8}
                  />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex flex-col gap-1">
            {bottomTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname.startsWith(tab.href) || pathname.startsWith("/volunteer/settings");

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#E8F5E9] text-[#2E7D32]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-[#2E7D32]" : "text-gray-400"}`}
                    strokeWidth={isActive ? 2.4 : 1.8}
                  />
                  {tab.label}
                </Link>
              );
            })}
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
              <LogOut className="h-5 w-5 text-red-500" strokeWidth={1.8} />
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pl-64">
        {/* Top Header Placeholder */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end border-b border-gray-200 bg-white/80 px-8 backdrop-blur-md">
           <Link href="/volunteer/notifications" className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition">
             <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
           </Link>
        </header>
        <div className="p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
