"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import { Package, ClipboardList, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

type Donation = {
  id: string;
  title: string;
  servings: number;
  status: string;
  location: string;
  dropLocation: string | null;
  createdAt: string;
  donor?: { name: string } | null;
};

export default function VolunteerDashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Fetch all donations to get counts
        const res = await fetch("/api/donations");
        if (res.ok) {
          const data = await res.json();
          setDonations(data.donations);
        }
      } catch (err) {
        console.error("Failed to load:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const available = donations.filter((d) => d.status === "PENDING");
  const assigned = donations.filter(
    (d) => d.status === "ACCEPTED" || d.status === "IN_TRANSIT"
  );
  const completed = donations.filter((d) => d.status === "DELIVERED");

  const stats = [
    {
      label: "Available Pickups",
      value: available.length,
      icon: Package,
      color: "bg-[#E8F5E9]",
      iconColor: "text-[#2E7D32]",
    },
    {
      label: "Assigned Tasks",
      value: assigned.length,
      icon: ClipboardList,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Completed Tasks",
      value: completed.length,
      icon: CheckCircle2,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#2E7D32]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <Card className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] shadow-lg">
        <div className="flex flex-col justify-center p-8 min-h-[160px]">
          <p className="text-sm font-medium tracking-wide text-white/80 uppercase mb-2">
            Good evening 👋
          </p>
          <h1 className="font-heading text-3xl font-bold text-white mb-3">
            Welcome, Volunteer
          </h1>
          <p className="max-w-xl text-base text-white/80 leading-relaxed">
            You&apos;re making a real difference. Check available pickups and start
            delivering hope across the community today.
          </p>
        </div>
      </Card>

      {/* Stats */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-gray-900">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="text-left hover:shadow-md transition">
                <div className="flex items-center gap-5 p-6">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${s.color}`}
                  >
                    <Icon className={`h-7 w-7 ${s.iconColor}`} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-sm font-medium text-gray-500">{s.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Actions + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/volunteer/available" className="block">
              <Card className="transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5E9]">
                      <Package className="h-6 w-6 text-[#2E7D32]" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        View Available Pickups
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {available.length} pickups near you
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#2E7D32]" />
                </div>
              </Card>
            </Link>

            <Link href="/volunteer/assigned" className="block">
              <Card className="transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                      <ClipboardList
                        className="h-6 w-6 text-amber-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        View Assigned Tasks
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {assigned.length} tasks in progress
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-amber-600" />
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* Recent Completed */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-gray-900">
            Recent Deliveries
          </h2>
          <div className="space-y-4">
            {completed.length === 0 ? (
              <Card>
                <div className="p-6 text-center text-gray-500">
                  No completed deliveries yet. Accept a pickup to get started!
                </div>
              </Card>
            ) : (
              completed.slice(0, 3).map((d) => (
                <Card key={d.id}>
                  <div className="flex items-center gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9]">
                      <CheckCircle2 className="h-5 w-5 text-[#2E7D32]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 truncate">
                        {d.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {d.donor?.name || "Unknown"} → {d.dropLocation || d.location}
                      </p>
                    </div>
                    <span className="shrink-0 inline-flex items-center rounded-full bg-[#E8F5E9] px-2.5 py-1 text-xs font-semibold text-[#2E7D32]">
                      ✓ Delivered
                    </span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
