"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { MapPin, Clock, UtensilsCrossed, Loader2 } from "lucide-react";

type Donation = {
  id: string;
  title: string;
  servings: number;
  status: string;
  location: string;
  category: string;
  shelfLife: string | null;
  description: string | null;
  donor?: { name: string; phone: string | null } | null;
};

export default function AvailablePickups() {
  const [pickups, setPickups] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState<string | null>(null);

  useEffect(() => {
    fetchPickups();
  }, []);

  async function fetchPickups() {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.id) {
        setPickups([]);
        return;
      }

      const res = await fetch("/api/volunteer/available", {
        headers: {
          "x-user": JSON.stringify(user),
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPickups(data.pickups || []);
      }
    } catch (err) {
      console.error("Failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(id: string) {
    setAccepting(id);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.id) {
        alert("Please log in as a volunteer");
        setAccepting(null);
        return;
      }

      const res = await fetch(`/api/donations/${id}/accept`, {
        method: "POST",
        headers: {
          "x-user": JSON.stringify(user),
        },
      });
      if (res.ok) {
        await fetchPickups();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to accept");
      }
    } catch {
      alert("Network error");
    } finally {
      setAccepting(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#2E7D32]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Available <span className="text-[#2E7D32]">Pickups</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">
            {pickups.length} pickups ready for collection
          </p>
        </div>
      </header>

      {pickups.length === 0 ? (
        <Card className="rounded-2xl p-12 text-center shadow-md">
          <p className="text-lg text-gray-500">No available pickups right now.</p>
          <p className="text-sm text-gray-400 mt-2">
            Check back later — new donations appear when donors post them.
          </p>
        </Card>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickups.map((pickup) => (
            <Card
              key={pickup.id}
              className="flex flex-col overflow-hidden hover:shadow-lg transition"
            >
              {/* Info block replacing image */}
              <div className="relative h-32 shrink-0 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center">
                <UtensilsCrossed className="h-12 w-12 text-[#2E7D32]/60" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#2E7D32]/95 text-white shadow-sm">
                    {pickup.category}
                  </Badge>
                </div>
                {pickup.shelfLife && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/70 text-white shadow-sm">
                      <Clock className="mr-1.5 h-3.5 w-3.5" />
                      {pickup.shelfLife}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4">
                  <h3 className="font-heading text-lg font-bold text-gray-900">
                    {pickup.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    {pickup.donor?.name || "Unknown Donor"}
                  </p>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-4 rounded-xl bg-gray-50 p-3 text-sm font-medium text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <UtensilsCrossed className="h-4 w-4 text-[#2E7D32]" />
                    {pickup.servings} meals
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#2E7D32]" />
                    {pickup.location.length > 25
                      ? pickup.location.slice(0, 25) + "..."
                      : pickup.location}
                  </span>
                </div>

                {pickup.description && (
                  <p className="mb-6 text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
                    {pickup.description}
                  </p>
                )}

                <div className="mt-auto">
                  <Button
                    onClick={() => handleAccept(pickup.id)}
                    disabled={accepting === pickup.id}
                    className="py-3 text-sm font-bold"
                  >
                    {accepting === pickup.id ? "Accepting..." : "Accept Pickup"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
