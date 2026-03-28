"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { MapPin, Navigation, CheckCircle2, Loader2 } from "lucide-react";

type Donation = {
  id: string;
  title: string;
  servings: number;
  status: string;
  location: string;
  dropLocation: string | null;
  donor?: { name: string; phone: string | null } | null;
};

const steps = ["Accepted", "Picked", "Delivered"];

function getStepIndex(status: string) {
  if (status === "ACCEPTED") return 0;
  if (status === "IN_TRANSIT") return 1;
  if (status === "DELIVERED") return 2;
  return 0;
}

export default function AssignedPickups() {
  const [pickups, setPickups] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchAssigned();
  }, []);

  async function fetchAssigned() {
    try {
      const res = await fetch("/api/donations?status=ACCEPTED,IN_TRANSIT");
      if (res.ok) {
        const data = await res.json();
        setPickups(data.donations);
      }
    } catch (err) {
      console.error("Failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(id: string, newStatus: string) {
    setUpdating(id);
    try {
      if (newStatus === "DELIVERED") {
        const res = await fetch(`/api/donations/${id}/deliver`, { method: "POST" });
        if (res.ok) {
          setPickups((prev) => prev.filter((p) => p.id !== id));
        }
      } else {
        const res = await fetch(`/api/donations/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) {
          setPickups((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
          );
        }
      }
    } catch {
      alert("Network error");
    } finally {
      setUpdating(null);
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
            Assigned <span className="text-[#2E7D32]">Pickups</span>
          </h1>
          <p className="mt-1 text-base text-gray-500">
            {pickups.length} active tasks currently in progress
          </p>
        </div>
      </header>

      {pickups.length === 0 ? (
        <Card className="rounded-2xl p-12 text-center shadow-md">
          <p className="text-lg text-gray-500">No assigned tasks.</p>
          <p className="text-sm text-gray-400 mt-2">
            Go to Available Pickups to accept a task.
          </p>
        </Card>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pickups.map((pickup) => {
            const currentStep = getStepIndex(pickup.status);

            return (
              <Card key={pickup.id} className="flex flex-col hover:shadow-lg transition">
                <div className="flex flex-col p-6 space-y-6">
                  {/* Top info */}
                  <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9]">
                      <CheckCircle2 className="h-8 w-8 text-[#2E7D32]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold text-gray-900 truncate">
                        {pickup.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 mt-1">
                        {pickup.donor?.name || "Unknown Donor"}
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-[#E8F5E9] px-2 py-0.5 text-xs font-semibold text-[#2E7D32]">
                          {pickup.status.replace("_", " ")}
                        </Badge>
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
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {pickup.location}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2.5 border-l-2 border-dashed border-gray-300 h-4" />
                    <div className="flex items-start gap-3">
                      <Navigation className="mt-0.5 h-5 w-5 shrink-0 text-[#1B5E20]" />
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                          Drop-off Location
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {pickup.dropLocation || "Not specified"}
                        </p>
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
                  </div>

                  {/* Actions */}
                  <div className="mt-auto">
                    {pickup.status === "ACCEPTED" ? (
                      <Button
                        onClick={() => handleUpdateStatus(pickup.id, "IN_TRANSIT")}
                        disabled={updating === pickup.id}
                        className="py-3 text-sm font-bold"
                      >
                        {updating === pickup.id ? "Updating..." : "Mark as Picked Up"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleUpdateStatus(pickup.id, "DELIVERED")}
                        disabled={updating === pickup.id}
                        className="py-3 text-sm font-bold"
                      >
                        {updating === pickup.id
                          ? "Marking..."
                          : "Mark as Delivered ✓"}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </section>
      )}
    </div>
  );
}
