"use client";

import { signOut } from "next-auth/react";
import { useState, PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";

export const LogoutButton = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Button
      className={className}
      variant="ghost"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Signing out..." : (children || "Logout")}
    </Button>
  );
};
