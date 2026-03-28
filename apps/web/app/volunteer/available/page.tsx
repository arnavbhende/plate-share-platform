"use client";

import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { MapPin, Clock, UtensilsCrossed } from "lucide-react";
import { availablePickups } from "../_data/mock";

export default function AvailablePickups() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Available <span className="text-[#2E7D32]">Pickups</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">
            {availablePickups.length} pickups near your location ready for collection
          </p>
        </div>
      </header>

      {/* Pickup Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availablePickups.map((pickup) => (
          <Card key={pickup.id} className="flex flex-col overflow-hidden hover:shadow-lg transition">
            {/* Food Image */}
            <div className="relative h-48 shrink-0">
              <img
                src={pickup.image}
                alt={pickup.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {pickup.urgency === "Urgent" && (
                  <Badge className="bg-red-500/95 text-white shadow-sm">
                    🔴 Urgent
                  </Badge>
                )}
                {pickup.urgency === "Nearby" && (
                  <Badge className="bg-[#2E7D32]/95 text-white shadow-sm">
                    📍 Nearby
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-black/70 text-white shadow-sm">
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  {pickup.expiry}
                </Badge>
              </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-4">
                <h3 className="font-heading text-lg font-bold text-gray-900">
                  {pickup.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">{pickup.donor}</p>
              </div>

              {/* Meta Info */}
              <div className="mb-4 flex flex-wrap items-center gap-4 rounded-xl bg-gray-50 p-3 text-sm font-medium text-gray-700">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#2E7D32]" />
                  {pickup.distance}
                </span>
                <span className="flex items-center gap-1.5">
                  <UtensilsCrossed className="h-4 w-4 text-[#2E7D32]" />
                  {pickup.meals} meals
                </span>
              </div>

              <p className="mb-6 text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
                {pickup.location}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                <Link href={`/volunteer/pickup/${pickup.id}`} className="flex-1">
                  <button className="w-full rounded-2xl border-2 border-[#2E7D32]/20 px-4 py-3 text-sm font-bold text-[#2E7D32] transition hover:border-[#2E7D32] hover:bg-[#E8F5E9]">
                    View Details
                  </button>
                </Link>
                <div className="flex-1">
                  <Button className="py-3 text-sm font-bold">
                    Accept Task
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
