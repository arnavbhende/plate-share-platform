import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <Card className="shadow-lg ring-1 ring-black/5">
          <div className="space-y-6 p-6 sm:p-8">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5e9] text-2xl shadow-sm">
                🍽
              </div>
              <div className="space-y-1">
                <h1 className="font-heading text-2xl font-semibold text-gray-900">
                  PlateShare
                </h1>
                <p className="text-sm text-gray-600">Log in to continue donating food</p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#2E7D32] focus:ring-2 focus:ring-[#4CAF50]/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#2E7D32] focus:ring-2 focus:ring-[#4CAF50]/30"
                  required
                />
              </div>

              <Button type="submit">Log In</Button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="font-semibold text-[#2E7D32] transition hover:text-[#1B5E20]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
