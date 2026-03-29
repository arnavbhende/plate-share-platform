"use client";

import { useEffect, useState } from "react";
import {
  Clock3,
  HandPlatter,
  MapPin,
  Sparkles,
  UserRound,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Badge from "@/components/Badge";
import Card from "@/components/Card";

type UserInfo = {
  id: string;
  name: string;
  role: string;
};

type Donation = {
  id: string;
  title: string;
  servings: number;
  pickupSlot: string | null;
  status: string;
  createdAt: string;
  volunteer?: { name: string } | null;
};

export default function DonorDashboardPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const localUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (!localUser?.id) {
          setLoading(false);
          return;
        }

        setUser(localUser);

        const donRes = await fetch("/api/donations", {
          headers: {
            "x-user": JSON.stringify(localUser),
          },
        });
        if (donRes.ok) {
          const donData = await donRes.json();
          setDonations(donData.donations || []);
        }
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const activeDonations = donations.filter(
    (d) => d.status === "OPEN" || d.status === "ACCEPTED" || d.status === "PICKED"
  );

  const recentDonations = donations.slice(0, 5);

  const statusConfig: Record<string, { label: string; classes: string }> = {
    OPEN: { label: "OPEN", classes: "bg-[#F2F8F2] text-[#2E7D32]" },
    ACCEPTED: { label: "ACCEPTED", classes: "bg-[#E8F5E9] text-[#1B5E20]" },
    PICKED: { label: "PICKED", classes: "bg-amber-50 text-amber-700" },
    DELIVERED: { label: "DELIVERED", classes: "bg-emerald-50 text-emerald-700" },
    CANCELLED: { label: "CANCELLED", classes: "bg-red-50 text-red-600" },
  };

  // Determine greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-[#f3f4f6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Loader2 className="h-8 w-8 animate-spin text-[#2E7D32]" />
          <p className="text-sm font-medium">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#f3f4f6]">
      <header className="w-full border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <p className="font-heading text-2xl font-semibold text-gray-900">PlateShare</p>
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl bg-[#E8F5E9] px-3 py-2 text-sm font-medium text-[#1B5E20] shadow-sm"
          >
            <UserRound className="h-4 w-4" />
            {user?.name || "User"}
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
        <section className="space-y-2">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {greeting}, {user?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-base text-gray-600">Ready to make an impact today?</p>
        </section>

        <Card className="relative rounded-2xl bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] p-6 shadow-md md:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-20 top-12 h-24 w-24 rounded-full border border-white/20" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-heading text-3xl font-semibold text-white">Post New Donation</h2>
              <p className="text-base leading-7 text-white/90">
                Share your surplus food with local shelters and families.
              </p>
              <Link
                href="/donor/post-donation"
                className="inline-flex w-auto rounded-2xl border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-[#2E7D32] shadow-md transition hover:bg-[#f1fdf2]"
              >
                Post Now
              </Link>
            </div>
            <div className="hidden h-28 w-28 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm md:flex">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
        </Card>

        {donations.length === 0 && (
          <Card className="rounded-2xl p-8 text-center shadow-md">
            <p className="text-lg font-semibold text-gray-900">No donations yet</p>
            <p className="mt-1 text-sm text-gray-500">Post your first donation</p>
            <Link
              href="/donor/post-donation"
              className="mt-4 inline-flex rounded-2xl bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white"
            >
              Post your first donation
            </Link>
          </Card>
        )}

        {/* Active Donations */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-semibold text-gray-900">Active Donations</h2>
            <p className="text-sm font-medium text-gray-500">{activeDonations.length} Active</p>
          </div>

          {activeDonations.length === 0 ? (
            <Card className="rounded-2xl p-8 text-center shadow-md">
              <p className="text-gray-500">No active donations yet. Post your first donation above!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {activeDonations.map((donation) => {
                const config = statusConfig[donation.status] || statusConfig.PENDING;
                return (
                  <Card key={donation.id} className="rounded-2xl p-4 shadow-md">
                    <div className="space-y-4">
                      <Badge
                        className={`${config.classes} rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide`}
                      >
                        {config.label}
                      </Badge>
                      <h3 className="font-heading text-lg font-semibold text-gray-900">
                        {donation.title}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <HandPlatter className="h-4 w-4 text-[#2E7D32]" />
                          <span>{donation.servings} servings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-[#2E7D32]" />
                          <span>{donation.pickupSlot || "No time set"}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Recent Donations */}
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-gray-900">Recent Donations</h2>
          {recentDonations.length === 0 ? (
            <Card className="rounded-2xl p-8 text-center shadow-md">
              <p className="text-gray-500">
                No donations yet. Your history will appear here.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentDonations.map((donation) => (
                <Card key={donation.id} className="rounded-2xl bg-white p-4 shadow-md">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9]">
                        <HandPlatter className="h-5 w-5 text-[#2E7D32]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-heading text-base font-semibold text-gray-900">
                          {donation.title}
                        </h3>
                        <p className="truncate text-sm text-gray-500">
                          {donation.servings} servings • {donation.status}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold text-[#2E7D32]">{donation.status}</p>
                      <div className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-500">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>
                          {new Date(donation.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
