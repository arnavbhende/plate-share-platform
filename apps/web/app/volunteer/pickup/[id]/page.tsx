"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  UtensilsCrossed,
  Clock,
  User,
} from "lucide-react";
import { availablePickups, assignedPickups, completedPickups } from "../../_data/mock";

const allPickups = [...availablePickups, ...assignedPickups, ...completedPickups];

export default function PickupDetails() {
  const params = useParams();
  const pickup = allPickups.find((p) => p.id === params.id);

  if (!pickup) {
    return (
      <div className="text-center space-y-4 py-20">
        <p className="text-lg text-gray-500">Pickup not found.</p>
        <Link href="/volunteer/available">
          <Button className="max-w-xs mx-auto">Back to Available</Button>
        </Link>
      </div>
    );
  }

  const isAccepted = pickup.status !== "available";

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/volunteer/available"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-900 mb-2"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Available
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Image & Details */}
        <div className="space-y-8">
          <Card className="overflow-hidden shadow-md">
            <div className="relative h-72">
              <img
                src={pickup.image}
                alt={pickup.title}
                className="h-full w-full object-cover"
              />
              {pickup.urgency !== "Normal" && (
                <div className="absolute top-4 left-4">
                  <Badge
                    className={
                      pickup.urgency === "Urgent"
                        ? "bg-red-500/90 py-1 px-3 text-sm font-bold text-white shadow-sm backdrop-blur-sm"
                        : "bg-[#2E7D32]/90 py-1 px-3 text-sm font-bold text-white shadow-sm backdrop-blur-sm"
                    }
                  >
                    {pickup.urgency === "Urgent" ? "🔴 Urgent" : "📍 Nearby"}
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h1 className="font-heading text-3xl font-bold text-gray-900">
                  {pickup.title}
                </h1>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  {pickup.description}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#E8F5E9] p-4 text-center">
                  <UtensilsCrossed className="mx-auto h-6 w-6 text-[#2E7D32]" />
                  <p className="mt-2 text-xl font-bold text-gray-900">{pickup.meals}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-1">Meals</p>
                </div>
                <div className="rounded-2xl bg-[#E8F5E9] p-4 text-center">
                  <MapPin className="mx-auto h-6 w-6 text-[#2E7D32]" />
                  <p className="mt-2 text-xl font-bold text-gray-900">{pickup.distance}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-1">Distance</p>
                </div>
                <div className="rounded-2xl bg-[#E8F5E9] p-4 text-center">
                  <Clock className="mx-auto h-6 w-6 text-[#2E7D32]" />
                  <p className="mt-2 text-lg font-bold text-gray-900 leading-tight">
                    {pickup.expiry ? pickup.expiry.replace("Expires in ", "") : "N/A"}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-1">Expires</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Routing & Actions */}
        <div className="space-y-6">
          <Card className="shadow-md">
            <div className="p-6 space-y-4">
              <h2 className="font-heading text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                Donor Information
              </h2>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9]">
                    <User className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">{pickup.donor}</p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">{pickup.donorPhone}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] transition hover:bg-[#C8E6C9]">
                    <Phone className="h-5 w-5 text-[#2E7D32]" />
                  </button>
                  <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] transition hover:bg-[#C8E6C9]">
                    <MessageCircle className="h-5 w-5 text-[#2E7D32]" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="p-6 space-y-4">
              <h2 className="font-heading text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                Route Details
              </h2>
              <div className="space-y-4 rounded-xl bg-gray-50 p-5 mt-2">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-[#2E7D32]" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Pickup Location
                    </p>
                    <p className="text-base font-medium text-gray-900 mt-1">{pickup.location}</p>
                  </div>
                </div>
                <div className="ml-3 border-l-2 border-dashed border-gray-300 h-6" />
                <div className="flex items-start gap-4">
                  <Navigation className="mt-0.5 h-6 w-6 shrink-0 text-[#1B5E20]" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Drop-off Location
                    </p>
                    <p className="text-base font-medium text-gray-900 mt-1">{pickup.dropLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Large Desktop CTA Action */}
          <div className="pt-4">
            {isAccepted ? (
              <Link href="/volunteer/tracking" className="block">
                <Button className="py-4 text-lg w-full font-bold shadow-lg">
                  Continue to Delivery Tracking →
                </Button>
              </Link>
            ) : (
              <Button className="py-4 text-lg w-full font-bold shadow-lg">
                Accept This Task Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
