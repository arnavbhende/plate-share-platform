"use client";

import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { MapPin, Star } from "lucide-react";
import { completedPickups } from "../_data/mock";

export default function CompletedDeliveries() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Completed <span className="text-[#2E7D32]">Deliveries</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">
            {completedPickups.length} deliveries successfully completed
          </p>
        </div>
      </header>

      {/* Completed Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedPickups.map((pickup) => (
          <Card key={pickup.id} className="hover:shadow-lg transition">
            <div className="flex gap-4 p-5">
              {/* Image */}
              <img
                src={pickup.image}
                alt={pickup.title}
                className="h-24 w-24 rounded-xl object-cover shrink-0"
              />

              {/* Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-base font-bold text-gray-900 truncate pr-4">
                    {pickup.title}
                  </h3>
                  <Badge className="shrink-0 bg-[#E8F5E9] text-[#2E7D32] px-2 py-1 text-xs font-semibold">
                    ✓ Delivered
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-600 truncate">{pickup.dropLocation}</span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mt-auto">
                  {pickup.completedAt}
                </p>

                {/* Rating */}
                {pickup.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < pickup.rating!
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-bold text-gray-700">{pickup.rating}.0</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
