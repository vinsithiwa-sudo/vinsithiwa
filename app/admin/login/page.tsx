"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import FadeUp from "@/components/ui/FadeUp";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-6">
      <FadeUp className="w-full max-w-md">
        <div className="bg-white p-10 border text-center" style={{ borderColor: "#E8E2D9" }}>
          
          <div className="mb-10">
            <span className="font-display font-bold text-3xl tracking-widest block" style={{ color: DARK }}>
              VINSITH
            </span>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase mt-1 block" style={{ color: GOLD }}>
              Admin Portal
            </span>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <label className="block font-body text-xs tracking-widest uppercase mb-2" style={{ color: "#8C7B6A" }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border focus:outline-none focus:border-[#C9A84C] font-body text-sm"
                style={{ borderColor: "#E8E2D9" }}
              />
            </div>

            <div className="text-left">
              <label className="block font-body text-xs tracking-widest uppercase mb-2" style={{ color: "#8C7B6A" }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border focus:outline-none focus:border-[#C9A84C] font-body text-sm"
                style={{ borderColor: "#E8E2D9" }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 font-body text-sm tracking-widest uppercase font-medium transition-opacity mt-4 disabled:opacity-50"
              style={{ backgroundColor: DARK, color: "#FAF8F4", borderRadius: "1px" }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

        </div>
      </FadeUp>
    </div>
  );
}
