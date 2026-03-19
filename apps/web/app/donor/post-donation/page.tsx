"use client";

import { Clock3, ImagePlus, Info, MapPinned, Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";

type DietaryType = "Veg" | "Non-Veg" | "Vegan";
type PackagingType =
  | "Plastic Containers"
  | "Paper Bags"
  | "Trays"
  | "Cardboard Boxes"
  | "Other";
type ShelfLifeType = "2h" | "6h" | "24h" | "custom";

type DonationFormState = {
  foodName: string;
  category: string;
  dietary: DietaryType;
  description: string;
  servings: number;
  packaging: PackagingType[];
  shelfLife: ShelfLifeType;
  customShelfLife: string;
  handling: string;
  pickupDate: string;
  pickupSlot: string;
  locationName: string;
  locationAddress: string;
  pickupInstructions: string;
};

const dietaryOptions: DietaryType[] = ["Veg", "Non-Veg", "Vegan"];
const packagingOptions: PackagingType[] = [
  "Plastic Containers",
  "Paper Bags",
  "Trays",
  "Cardboard Boxes",
  "Other",
];
const shelfLifeOptions: ShelfLifeType[] = ["2h", "6h", "24h", "custom"];
const timeSlots = [
  "10:00 AM - 11:00 AM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "4:00 PM - 5:00 PM",
  "6:00 PM - 7:00 PM",
  "8:00 PM - 9:00 PM",
];

const stepTitles = [
  "Food Details",
  "Quantity & Packaging",
  "Pickup Details",
  "Final Review",
] as const;

const initialState: DonationFormState = {
  foodName: "",
  category: "",
  dietary: "Veg",
  description: "",
  servings: 0,
  packaging: ["Trays"],
  shelfLife: "6h",
  customShelfLife: "",
  handling: "",
  pickupDate: "",
  pickupSlot: "",
  locationName: "PlateShare Kitchen Point",
  locationAddress: "Sector 18, Noida, Uttar Pradesh",
  pickupInstructions: "",
};

function StepIndicator({ step }: { step: number }) {
  return (
    <Card className="rounded-2xl p-5 shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-semibold tracking-wide text-[#1B5E20]">
              STEP {step}
            </span>
            <span className="text-sm font-medium text-gray-500">of 4</span>
          </div>
          <p className="text-sm font-semibold text-[#2E7D32]">{stepTitles[step - 1]}</p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#2E7D32] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>
    </Card>
  );
}

function Label({ children }: { children: string }) {
  return <label className="text-sm font-medium text-gray-700">{children}</label>;
}

const inputClasses =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#2E7D32] focus:ring-2 focus:ring-[#4CAF50]/30";

export default function PostDonationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<DonationFormState>(initialState);
  const [selectedDietary, setSelectedDietary] = useState<DietaryType>(initialState.dietary);
  const [showSuccess, setShowSuccess] = useState(false);

  const dateOptions = useMemo(() => {
    const formatterDay = new Intl.DateTimeFormat("en-US", { weekday: "short" });
    const formatterDate = new Intl.DateTimeFormat("en-US", { day: "2-digit" });
    const todayValue = new Date().toISOString().slice(0, 10);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const value = date.toISOString().slice(0, 10);

      return {
        label: formatterDay.format(date),
        dateNum: formatterDate.format(date),
        value,
        isToday: value === todayValue,
      };
    });
  }, []);

  const formattedPickupDate = useMemo(() => {
    if (!form.pickupDate) return "Date not selected";
    const date = new Date(form.pickupDate);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }, [form.pickupDate]);

  const dietaryBadge =
    form.dietary === "Non-Veg" ? "NON-VEG" : form.dietary === "Vegan" ? "VEGAN" : "VEG";

  const canGoNext = useMemo(() => {
    if (step === 1) return form.foodName.trim().length > 0 && form.category.trim().length > 0;
    if (step === 2) {
      const isCustomShelfLifeValid =
        form.shelfLife !== "custom" || Number(form.customShelfLife) > 0;
      return form.servings >= 0 && isCustomShelfLifeValid;
    }
    if (step === 3) return form.pickupDate !== "" && form.pickupSlot !== "";
    return true;
  }, [
    form.category,
    form.customShelfLife,
    form.foodName,
    form.pickupDate,
    form.pickupSlot,
    form.servings,
    form.shelfLife,
    step,
  ]);

  const nextStep = () => setStep((prev) => Math.min(4, prev + 1));
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  useEffect(() => {
    if (!showSuccess) return;

    const timeoutId = window.setTimeout(() => {
      router.push("/donor/dashboard");
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [router, showSuccess]);

  return (
    <main className="min-h-screen w-full bg-[#f3f4f6] px-6 py-8">
      <div className={`mx-auto w-full space-y-6 ${step === 4 ? "max-w-4xl" : "max-w-5xl"}`}>
        <header className="space-y-2">
          <h1 className="font-heading text-3xl font-bold text-gray-900">Post Donation</h1>
          <p className="text-base text-gray-600">
            Create a new donation in 4 quick steps and help local communities faster.
          </p>
        </header>

        <StepIndicator step={step} />

        <Card className="rounded-2xl p-8 shadow-lg">
          {step === 1 && (
            <section className="space-y-8">
              <h2 className="font-heading text-2xl font-semibold text-gray-900">Food Details</h2>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label>Food Image</Label>
                  <button
                    type="button"
                    className="flex h-56 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#2E7D32]/35 bg-[#E8F5E9]/70 text-[#2E7D32] shadow-sm transition-all duration-200 hover:scale-[1.01] hover:bg-[#dff0e1] hover:shadow-md"
                  >
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm font-medium">Upload image</span>
                    <span className="text-xs text-[#1B5E20]/80">PNG, JPG up to 5MB</span>
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label>Food Name</Label>
                    <input
                      className={inputClasses}
                      placeholder="e.g. Paneer Curry Meal Boxes"
                      value={form.foodName}
                      onChange={(e) => setForm((prev) => ({ ...prev, foodName: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select
                      className={inputClasses}
                      value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Select category</option>
                      <option value="Cooked Meals">Cooked Meals</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Dry Rations">Dry Rations</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dietary</Label>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedDietary(option);
                            setForm((prev) => ({ ...prev, dietary: option }));
                          }}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            selectedDietary === option
                              ? "bg-[#2E7D32] text-white shadow-md"
                              : "bg-[#E8F5E9] text-[#1B5E20] hover:bg-[#dceedd]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  className={`${inputClasses} min-h-28 resize-y`}
                  placeholder="Add key food details, freshness notes, and portion breakdown"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-6">
              <h2 className="font-heading text-2xl font-semibold text-gray-900">Quantity & Packaging</h2>

              <Card className="rounded-2xl p-6 shadow-md md:p-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-gray-900">Approx. Servings</h3>
                    <p className="text-sm text-gray-600">How many people can this feed?</p>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex items-center gap-4 rounded-2xl bg-gray-50 px-5 py-3 shadow-sm ring-1 ring-gray-100">
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, servings: Math.max(0, prev.servings - 1) }))
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32] transition hover:bg-[#dceedd]"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={form.servings}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, "");
                          setForm((prev) => ({
                            ...prev,
                            servings: digitsOnly === "" ? 0 : Number(digitsOnly),
                          }));
                        }}
                        className="w-20 rounded-xl border border-gray-200 bg-white px-2 py-1 text-center text-3xl font-semibold text-gray-900 outline-none ring-0"
                        aria-label="Approximate servings"
                      />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, servings: prev.servings + 1 }))}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32] transition hover:bg-[#dceedd]"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl p-6 shadow-md md:p-8">
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold text-gray-900">Packaging Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {packagingOptions.map((option) => {
                      const isSelected = form.packaging.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              packaging: isSelected
                                ? prev.packaging.filter((item) => item !== option)
                                : [...prev.packaging, option],
                            }))
                          }
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            isSelected
                              ? "bg-[#2E7D32] text-white shadow-md"
                              : "bg-[#E8F5E9] text-[#1B5E20] hover:bg-[#dceedd]"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl p-6 shadow-md md:p-8">
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold text-gray-900">Shelf Life</h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {shelfLifeOptions.map((option) => {
                      const isSelected = form.shelfLife === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, shelfLife: option }))}
                          className={`rounded-xl border px-4 py-5 text-center text-sm font-semibold transition ${
                            isSelected
                              ? "border-[#2E7D32] bg-[#E8F5E9] text-[#1B5E20]"
                              : "border-gray-200 bg-white text-gray-700 hover:border-[#2E7D32]/40"
                          }`}
                        >
                          {option === "2h"
                            ? "2 Hours"
                            : option === "6h"
                              ? "6 Hours"
                              : option === "24h"
                                ? "24 Hours"
                                : "Custom"}
                        </button>
                      );
                    })}
                  </div>

                  {form.shelfLife === "custom" && (
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className={inputClasses}
                      placeholder="Enter hours (e.g. 5)"
                      value={form.customShelfLife}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "");
                        setForm((prev) => ({ ...prev, customShelfLife: digitsOnly }));
                      }}
                    />
                  )}
                </div>
              </Card>

              <Card className="rounded-2xl p-6 shadow-md md:p-8">
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold text-gray-900">Handling Instructions</h3>
                  <textarea
                    className={`${inputClasses} min-h-28 resize-y`}
                    placeholder="e.g. Keep refrigerated, handle with care"
                    value={form.handling}
                    onChange={(e) => setForm((prev) => ({ ...prev, handling: e.target.value }))}
                  />
                </div>
              </Card>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-6">
              <h2 className="font-heading text-2xl font-semibold text-gray-900">Pickup Details</h2>

              <Card className="rounded-2xl p-6 shadow-md md:p-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-gray-900">Pickup Date</h3>
                    <p className="text-sm text-gray-600">Choose a date for donation pickup</p>
                  </div>

                  <div className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-1">
                    {dateOptions.map((dateOption) => {
                      const isSelected = form.pickupDate === dateOption.value;
                      return (
                        <button
                          key={dateOption.value}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, pickupDate: dateOption.value }))}
                          className={`min-w-24 rounded-2xl px-4 py-3 text-center transition-all duration-200 ${
                            isSelected
                              ? "bg-[#2E7D32] text-white shadow-md"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          {dateOption.isToday && (
                            <p
                              className={`mb-1 text-[10px] font-semibold uppercase tracking-wide ${
                                isSelected ? "text-white/85" : "text-[#2E7D32]"
                              }`}
                            >
                              Today
                            </p>
                          )}
                          <p className="text-xs font-medium">{dateOption.label}</p>
                          <p className="mt-1 text-lg font-semibold">{dateOption.dateNum}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl p-6 shadow-md md:p-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-gray-900">Time Slots</h3>
                    <p className="text-sm text-gray-600">Select the most convenient pickup window</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, pickupSlot: slot }))}
                        className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                          form.pickupSlot === slot
                            ? "border-[#2E7D32] bg-[#E8F5E9] text-[#1B5E20] shadow-sm"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#2E7D32]/40 hover:bg-gray-50"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl p-6 shadow-md transition hover:shadow-lg md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9]">
                        <MapPinned className="h-5 w-5 text-[#2E7D32]" />
                      </div>
                      <div>
                        <p className="font-heading text-xl font-bold text-gray-900">{form.locationName}</p>
                        <p className="mt-1 text-sm text-gray-500">{form.locationAddress}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-xl bg-[#E8F5E9] px-3 py-1.5 text-sm font-medium text-[#1B5E20] transition hover:bg-[#dceedd]"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="h-px bg-gray-200" />

                  <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.45)_1px,transparent_1px)] bg-[size:22px_22px]" />
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-sm ring-1 ring-black/5">
                      <MapPinned className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl p-6 shadow-md md:p-8">
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold text-gray-900">Driver Instructions</h3>
                  <textarea
                    className={`${inputClasses} min-h-28 resize-y`}
                    placeholder="e.g. Ring doorbell, call on arrival"
                    value={form.pickupInstructions}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, pickupInstructions: e.target.value }))
                    }
                  />
                </div>
              </Card>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-6">
              <h2 className="font-heading text-2xl font-semibold text-gray-900">Final Review</h2>

              <Card className="rounded-2xl p-6 shadow-md transition-all duration-200 hover:shadow-lg md:p-8">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-start">
                  <div className="relative w-full max-w-xs">
                    <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-[#eef7ef] to-[#dfeee0] text-[#2E7D32]">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.45)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                        <ImagePlus className="h-10 w-10" />
                        <p className="text-sm font-medium">No image uploaded</p>
                      </div>
                    </div>
                    <span className="absolute left-3 top-3 rounded-full bg-[#2E7D32] px-2.5 py-1 text-xs font-semibold tracking-wide text-white">
                      {dietaryBadge}
                    </span>
                  </div>

                  <div className="flex-1 space-y-5">
                    <h3 className="font-heading text-2xl font-semibold text-gray-900">
                      {form.foodName || "Untitled Donation"}
                    </h3>

                    <p className="text-base font-medium text-gray-700">
                      {form.servings > 0 ? (
                        <>
                          <span className="font-semibold text-gray-900">{form.servings}</span> servings
                        </>
                      ) : (
                        <span className="font-semibold text-gray-900">Not specified</span>
                      )}
                    </p>

                    <div className="inline-flex items-center gap-2 rounded-xl bg-[#E8F5E9] px-3 py-2 text-sm font-medium text-[#1B5E20]">
                      <Clock3 className="h-4 w-4" />
                      {form.pickupSlot || "Time slot not selected"}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-semibold text-[#1B5E20]">
                        {form.category || "Category not set"}
                      </span>
                      {(form.packaging.length ? form.packaging : ["Packaging not set"]).map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600">{form.description || "No description provided."}</p>
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl p-6 shadow-md transition-all duration-200 hover:shadow-lg md:p-8">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-500">Pickup Information</p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Pickup date</p>
                      <p className="font-medium text-gray-900">{formattedPickupDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Pickup time</p>
                      <p className="font-medium text-gray-900">{form.pickupSlot || "Time slot not selected"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Location name</p>
                      <p className="font-medium text-gray-900">{form.locationName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">{form.locationAddress}</p>
                    </div>
                  </div>

                  <div className="relative h-40 w-full rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <div className="relative flex h-full w-full items-center justify-center">
                      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                        <MapPinned className="h-5 w-5 text-[#2E7D32]" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="rounded-xl bg-[#E8F5E9] p-4 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start gap-3 text-[#1B5E20]">
                  <Info className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">
                    Once posted, local food rescue organizations will be notified of your contribution.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSuccess(true)}
                className="w-full rounded-2xl bg-[#2E7D32] py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.01] hover:bg-[#1B5E20]"
              >
                Confirm & Post
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={prevStep}
                  className="cursor-pointer text-sm font-medium text-[#2E7D32] transition hover:underline"
                >
                  Edit Details
                </button>
              </div>
            </section>
          )}
        </Card>

        {step < 4 && (
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="rounded-2xl px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>

            <button
              type="button"
              onClick={nextStep}
              disabled={!canGoNext}
              className="rounded-xl bg-[#2E7D32] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1B5E20] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next Step &rarr;
            </button>
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
              <h3 className="font-heading text-2xl font-semibold text-gray-900">
                Donation Posted Successfully
              </h3>
              <p className="mt-2 text-sm text-gray-600">NGOs will be notified shortly</p>
              <p className="mt-3 text-xs text-gray-500">Redirecting to dashboard...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
