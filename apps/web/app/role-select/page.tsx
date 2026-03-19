"use client";
import { Utensils, Building2, Bike } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RoleSelect() {
  const router = useRouter();

  const roles = [
    {
      title: "Donor",
      subtitle: "Restaurant or Individual",
      desc: "Share surplus food and reduce waste in your local neighborhood.",
      route: "/donor/dashboard",
      icon: Utensils,
    },
    {
      title: "NGO",
      subtitle: "Food Bank or Charity",
      desc: "Coordinate logistics and distribute fresh food to those who need it most.",
      route: "/ngo/dashboard",
      icon: Building2,
    },
    {
      title: "Volunteer",
      subtitle: "Delivery Hero",
      desc: "Be the bridge. Help transport food safely from donors to NGOs.",
      route: "/volunteer/dashboard",
      icon: Bike,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-7 space-y-2">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-gray-900">
            Choose your <span className="text-[#2E7D32]">Impact</span>
          </h1>
          <p className="text-sm leading-6 text-gray-600">
            Pick your role to start making food donation faster, safer, and more meaningful.
          </p>
        </header>

        <section className="space-y-5">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <button
                key={role.title}
                type="button"
                onClick={() => router.push(role.route)}
                className="w-full overflow-hidden rounded-2xl bg-white text-left shadow-md ring-1 ring-black/5 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] focus-visible:ring-offset-2"
              >
                <div className="flex h-32 items-center justify-center bg-[#E8F5E9]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#2E7D32]/10">
                    <Icon className="h-7 w-7 text-[#2E7D32]" strokeWidth={2.2} />
                  </div>
                </div>

                <div className="space-y-2 p-5">
                  <h2 className="font-heading text-xl font-semibold text-gray-900">
                    {role.title}
                  </h2>
                  <p className="text-sm font-semibold text-[#2E7D32]">{role.subtitle}</p>
                  <p className="text-sm leading-6 text-gray-600">{role.desc}</p>
                </div>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}