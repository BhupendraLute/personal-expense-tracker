"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const BudgetForm = ({
  defaultMonth,
  defaultLimit
}: {
  defaultMonth: string;
  defaultLimit?: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    setLoading(false);
    setMessage(result.success ? "Budget saved" : result.error);
    if (result.success) {
      window.location.reload();
    }
  };

  return (
    <form className="grid gap-3 md:grid-cols-3" onSubmit={handleSubmit}>
      <Input name="month" defaultValue={defaultMonth} placeholder="YYYY-MM" required />
      <Input
        name="monthlyLimit"
        defaultValue={defaultLimit?.toString() ?? ""}
        placeholder="Monthly limit"
        type="number"
        step="0.01"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save budget"}
      </Button>
      {message ? <p className="md:col-span-3 text-sm text-slate-600">{message}</p> : null}
    </form>
  );
};
