"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "motion/react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const AuthForm = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          className="w-full relative h-12 bg-white text-slate-900 hover:bg-slate-50 border-none shadow-lg overflow-hidden group"
          disabled={loading}
          onClick={handleGoogleSignIn}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
              <span>Connecting...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <FaGoogle className="h-5 w-5 text-[#4285F4]" />
              <span className="font-semibold">Continue with Google</span>
            </div>
          )}
        </Button>
      </motion.div>
    </div>
  );
};
