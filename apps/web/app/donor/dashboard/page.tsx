import {
  Clock3,
  HandPlatter,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import Badge from "@/components/Badge";
import Card from "@/components/Card";

const activeDonations = [
  {
    status: "ACCEPTED",
    title: "Large Veggie Trays",
    servings: "45 servings",
    pickup: "Pickup 5:30 PM",
    statusClass: "bg-[#E8F5E9] text-[#1B5E20]",
  },
  {
    status: "PENDING",
    title: "Fresh Bread Packs",
    servings: "28 servings",
    pickup: "Pickup 7:00 PM",
    statusClass: "bg-[#F2F8F2] text-[#2E7D32]",
  },
  {
    status: "ACCEPTED",
    title: "Cooked Rice Boxes",
    servings: "60 servings",
    pickup: "Pickup 8:15 PM",
    statusClass: "bg-[#E8F5E9] text-[#1B5E20]",
  },
];

const recentMissions = [
  {
    title: "Whole Foods Market",
    subtitle: "Mission #PS-1024 • Food Pickup",
    status: "In Route",
    meta: "1.2 km",
  },
  {
    title: "Sunrise Community Kitchen",
    subtitle: "Mission #PS-1020 • Delivery",
    status: "Waiting",
    meta: "8 min",
  },
  {
    title: "City Relief Hub",
    subtitle: "Mission #PS-1018 • Completed",
    status: "Done",
    meta: "Today",
  },
];

export default function DonorDashboardPage() {
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
            Arnav
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
        <section className="space-y-2">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Good Afternoon, Arnav
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

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-semibold text-gray-900">Active Donations</h2>
            <p className="text-sm font-medium text-gray-500">2 Active</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeDonations.map((donation) => (
              <Card key={`${donation.title}-${donation.pickup}`} className="rounded-2xl p-4 shadow-md">
                <div className="space-y-4">
                  <Badge
                    className={`${donation.statusClass} rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide`}
                  >
                    {donation.status}
                  </Badge>

                  <h3 className="font-heading text-lg font-semibold text-gray-900">{donation.title}</h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <HandPlatter className="h-4 w-4 text-[#2E7D32]" />
                      <span>{donation.servings}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-[#2E7D32]" />
                      <span>{donation.pickup}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-gray-900">Recent Missions</h2>
          <div className="space-y-3">
            {recentMissions.map((mission) => (
              <Card key={mission.subtitle} className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9]">
                      <HandPlatter className="h-5 w-5 text-[#2E7D32]" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-heading text-base font-semibold text-gray-900">
                        {mission.title}
                      </h3>
                      <p className="truncate text-sm text-gray-500">{mission.subtitle}</p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-[#2E7D32]">{mission.status}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{mission.meta}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
