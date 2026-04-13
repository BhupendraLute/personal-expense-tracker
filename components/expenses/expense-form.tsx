"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ExpenseForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    setLoading(false);

    if (!result.success) {
      setMessage(result.error);
      return;
    }

    form.reset();
    setMessage("Expense saved");
    router.refresh();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="grid gap-4 md:grid-cols-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Amount</label>
        <Input name="amount" placeholder="0.00" type="number" step="0.01" required />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</label>
        <Input name="category" placeholder="Food, Rent, etc." required />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Note</label>
        <Input name="note" placeholder="Optional details" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Expense Date</label>
        <Input name="date" type="date" defaultValue={today} required />
      </div>
      <Button className="md:col-span-4 md:w-fit" type="submit" variant="primary" disabled={loading}>
        {loading ? "Saving..." : "Add Expense"}
      </Button>
      {message ? <p className="md:col-span-4 text-sm font-medium text-primary">{message}</p> : null}
    </form>
  );
};
