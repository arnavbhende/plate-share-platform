"use client";

import Card from "@/components/Card";
import { notifications } from "../_data/mock";

export default function Notifications() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Notifi<span className="text-[#2E7D32]">cations</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">Stay updated on your active and past tasks</p>
        </div>
      </header>

      <div className="max-w-4xl space-y-8 pb-10">
        {/* Today */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-4">
            Today
            <div className="h-px flex-1 bg-gray-200" />
          </h2>
          <div className="space-y-4">
            {notifications.today.map((n) => (
              <Card key={n.id} className="hover:shadow-md transition">
                <div className="flex items-start gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-xl shadow-sm">
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-base font-bold text-gray-900 truncate">{n.title}</p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5 truncate">
                      {n.subtitle}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-gray-400 self-center">
                    {n.time}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Yesterday */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-4">
            Yesterday
            <div className="h-px flex-1 bg-gray-200" />
          </h2>
          <div className="space-y-4">
            {notifications.yesterday.map((n) => (
              <Card key={n.id} className="hover:shadow-md transition">
                <div className="flex items-start gap-4 p-5 opacity-80">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl shadow-sm grayscale-[0.5]">
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-base font-bold text-gray-900 truncate">{n.title}</p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5 truncate">
                      {n.subtitle}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-gray-400 self-center">
                    {n.time}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
