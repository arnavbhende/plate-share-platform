"use client";

import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { MapPin, Navigation, CheckCircle2 } from "lucide-react";
import { assignedPickups } from "../_data/mock";

const steps = ["Accepted", "Picked", "Delivered"];

function getStepIndex(status: string) {
  if (status === "accepted") return 0;
  if (status === "picked") return 1;
  if (status === "delivered") return 2;
  return 0;
}

export default function AssignedPickups() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Assigned <span className="text-[#2E7D32]">Pickups</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">
            {assignedPickups.length} active tasks currently in progress
          </p>
        </div>
      </header>

      {/* Assigned Task Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {assignedPickups.map((pickup) => {
          const currentStep = getStepIndex(pickup.status);

          return (
            <Card key={pickup.id} className="flex flex-col hover:shadow-lg transition">
              <div className="flex flex-col p-6 space-y-6">
                {/* Top info */}
                <div className="flex items-start gap-5">
                  <img
                    src={pickup.image}
                    alt={pickup.title}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-bold text-gray-900 truncate">
                      {pickup.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">{pickup.donor}</p>
                    <div className="mt-2">
                      {pickup.urgency === "Urgent" ? (
                        <Badge className="bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-600/10">
                          🔴 Urgent
                        </Badge>
                      ) : (
                        <Badge className="bg-[#E8F5E9] px-2 py-0.5 text-xs font-semibold text-[#2E7D32]">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-3 rounded-xl bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#2E7D32]" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Pickup Location
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{pickup.location}</p>
                    </div>
                  </div>
                  <div className="ml-2.5 border-l-2 border-dashed border-gray-300 h-4" />
                  <div className="flex items-start gap-3">
                    <Navigation className="mt-0.5 h-5 w-5 shrink-0 text-[#1B5E20]" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Drop-off Location
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{pickup.dropLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between px-2">
                    {steps.map((step, i) => (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`flex z-10 h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                            i <= currentStep
                              ? "bg-[#2E7D32] text-white shadow-md ring-4 ring-white"
                              : "bg-gray-200 text-gray-400 ring-4 ring-white"
                          }`}
                        >
                          {i < currentStep ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            i + 1
                          )}
                        </div>
                        <span
                          className={`mt-2 text-xs font-bold ${
                            i <= currentStep ? "text-[#2E7D32]" : "text-gray-400"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Connector lines (Desktop optimized) */}
                  <div className="relative -mt-[44px] mx-10 flex">
                    <div
                      className={`h-1 flex-1 transition-colors ${
                        currentStep >= 1 ? "bg-[#2E7D32]" : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`h-1 flex-1 transition-colors ${
                        currentStep >= 2 ? "bg-[#2E7D32]" : "bg-gray-200"
                      }`}
                    />
                  </div>
                  <div className="h-10" />
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <Link href={`/volunteer/pickup/${pickup.id}`} className="flex-1">
                    <button className="w-full rounded-2xl border-2 border-[#2E7D32]/20 px-4 py-3 text-sm font-bold text-[#2E7D32] transition hover:border-[#2E7D32] hover:bg-[#E8F5E9]">
                      Pickup Details
                    </button>
                  </Link>
                  <div className="flex-1">
                    {pickup.status === "accepted" ? (
                      <Button className="py-3 text-sm font-bold">
                        Mark as Picked
                      </Button>
                    ) : (
                      <Link href="/volunteer/tracking">
                        <Button className="py-3 text-sm font-bold w-full">
                          Track Delivery
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
