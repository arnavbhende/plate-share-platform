import { Bell, Bike, MapPin, Route, UserRound } from "lucide-react";
import Card from "@/components/Card";

const quickActions = [
  {
    title: "New Pickup",
    icon: Bike,
  },
  {
    title: "Live Map",
    icon: Route,
  },
];

const impactOverview = [
  {
    label: "Food Rescued",
    value: "1,240 kg",
  },
  {
    label: "Meals Provided",
    value: "3,450",
  },
];

const recentMissions = [
  {
    title: "Whole Foods Market",
    subtitle: "Mission #4928",
    status: "In Route",
    meta: "1.2 km",
    statusClass: "text-[#2E7D32]",
  },
  {
    title: "Fresh Harvest Hub",
    subtitle: "Mission #4921",
    status: "Waiting",
    meta: "8 min",
    statusClass: "text-amber-600",
  },
  {
    title: "Green Basket Supply",
    subtitle: "Mission #4915",
    status: "Done",
    meta: "Today",
    statusClass: "text-gray-500",
  },
];

export default function VolunteerDashboardPage() {
  const progress = 85;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <main className="min-h-screen w-full bg-[#f3f4f6]">
      <header className="w-full border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <p className="font-heading text-2xl font-semibold text-gray-900">PlateShare</p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20] shadow-md transition-all duration-200 hover:shadow-lg"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-[#E8F5E9] px-3 py-2 text-sm font-medium text-[#1B5E20] shadow-md transition-all duration-200 hover:shadow-lg"
            >
              <UserRound className="h-4 w-4" />
              Acash
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl space-y-6 px-6 py-6">
        <Card className="rounded-2xl bg-gradient-to-r from-white to-[#f8faf8] p-8 shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32]">
              <UserRound className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h1 className="font-heading text-2xl font-semibold text-gray-900">Acash</h1>
              <span className="inline-flex rounded-full bg-[#2E7D32] px-3 py-1 text-xs font-semibold tracking-wide text-white">
                LEVEL 5 HERO
              </span>
              <p className="text-sm text-gray-600">12 rescues this month</p>
            </div>
          </div>
        </Card>

        <Card className="overflow-visible rounded-2xl bg-[#f9fafb] p-6 shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">DAILY GOAL</p>
              <p className="mt-2 font-heading text-3xl font-bold text-gray-900">85 / 100 kg</p>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 space-y-4">
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-sm font-medium text-[#1B5E20]">Almost there! 1 rescue left</p>
              </div>

              <div className="ml-4 shrink-0 flex items-center justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center drop-shadow-sm">
                  <svg className="h-20 w-20 -rotate-90" viewBox="0 0 100 100" aria-label="Goal progress">
                    <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="11" />
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#2E7D32"
                      strokeWidth="11"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  <p className="absolute text-base font-semibold text-[#2E7D32]">85%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <section className="space-y-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.title}
                  className="cursor-pointer rounded-2xl p-5 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                >
                  <button type="button" className="flex w-full items-center gap-3 text-left">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5E9]">
                      <Icon className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <span className="font-heading text-lg font-semibold text-gray-900">{action.title}</span>
                  </button>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Impact Overview</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {impactOverview.map((item) => (
              <Card
                key={item.label}
                className="rounded-2xl border-l-4 border-[#2E7D32] bg-gradient-to-br from-white to-[#f9fafb] p-5 shadow-md transition-all duration-200 hover:shadow-lg"
              >
                <p className="font-heading text-2xl font-bold text-[#2E7D32]">{item.value}</p>
                <p className="mt-1 text-sm font-medium text-gray-600">{item.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Recent Missions</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {recentMissions.map((mission) => (
              <div
                key={mission.subtitle}
                className="p-4 transition-all duration-200 hover:bg-[#f9fafb]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-heading text-base font-semibold text-gray-900">
                      {mission.title}
                    </h3>
                    <p className="truncate text-sm text-gray-500">{mission.subtitle}</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className={`text-sm font-semibold ${mission.statusClass}`}>{mission.status}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{mission.meta}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
