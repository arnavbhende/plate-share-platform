export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-5">
        
        <h1 className="text-2xl font-heading font-bold text-center text-primary">
          PlateShare
        </h1>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button className="w-full bg-primary text-white py-3 rounded-2xl font-semibold shadow-md">
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <span className="text-primary font-medium cursor-pointer">
            Sign up
          </span>
        </p>

      </div>

    </main>
  );
}