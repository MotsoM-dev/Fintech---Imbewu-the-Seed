// app/auth/signin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      const role = searchParams.get("role");
      const roleName = role === "entrepreneur" ? "Entrepreneur" : "Funder";
      setSuccess(`✅ ${roleName} account created successfully! Please sign in.`);
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = session.user as any;
      // FIXED: Correct paths
      if (user.role === "funder") {
        router.push("/funder/dashboard");
      } else {
        router.push("/entrepreneur/dashboard");
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        action: "signin",
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        setSuccess("✅ Signing in...");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: "entrepreneur" | "funder") => {
    setEmail(role === "entrepreneur" ? "entrepreneur@imbewu.com" : "funder@imbewu.com");
    setPassword("password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to your Imbewu account</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Quick Login Buttons */}
          <div className="mt-6 space-y-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Quick Demo Login</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fillDemo("entrepreneur")}
                className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg border border-emerald-200 transition flex items-center justify-center gap-2"
              >
                <span>🚀</span> Entrepreneur
              </button>
              <button
                type="button"
                onClick={() => fillDemo("funder")}
                className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg border border-blue-200 transition flex items-center justify-center gap-2"
              >
                <span>💰</span> Funder
              </button>
            </div>
            <p className="text-xs text-center text-gray-400">
              Password: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">password</span>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}