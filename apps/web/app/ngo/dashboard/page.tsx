"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";

type Donation = {
  id: string;
  title: string;
  category: string;
  servings: number;
  location: string;
  status: string;
  createdAt: string;
};

export default function NgoDashboardPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  useEffect(() => {
    void fetchPending();
  }, []);

  async function fetchPending() {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.id) {
        setDonations([]);
        return;
      }

      const res = await fetch("/api/ngo/pending", {
        headers: {
          "x-user": JSON.stringify(user),
        },
      });

      if (!res.ok) {
        setDonations([]);
        return;
      }

      const data = await res.json();
      setDonations(data.donations || []);
    } catch {
      setDonations([]);
    } finally {
      setLoading(false);
    }
  }

  async function act(id: string, action: "approve" | "reject") {
    setActingId(id);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.id) {
        return;
      }

      const res = await fetch(`/api/ngo/${action}/${id}`, {
        method: "POST",
        headers: {
          "x-user": JSON.stringify(user),
        },
      });

      if (res.ok) {
        setDonations((prev) => prev.filter((d) => d.id !== id));
      }
    } finally {
      setActingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            NGO Moderation Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            Review donor submissions before they are visible to volunteers.
          </p>
        </header>

        {loading ? (
          <Card className="rounded-2xl p-6 text-sm text-gray-600">Loading pending donations...</Card>
        ) : donations.length === 0 ? (
          <Card className="rounded-2xl p-8 text-center">
            <p className="text-lg font-semibold text-gray-900">No pending donations</p>
            <p className="mt-1 text-sm text-gray-500">All submissions are reviewed.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id} className="rounded-2xl p-5 shadow-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-gray-900">{donation.title}</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {donation.category} • {donation.servings} servings
                    </p>
                    <p className="text-sm text-gray-500">{donation.location}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      disabled={actingId === donation.id}
                      onClick={() => void act(donation.id, "reject")}
                    >
                      Reject
                    </Button>
                    <Button
                      disabled={actingId === donation.id}
                      onClick={() => void act(donation.id, "approve")}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
