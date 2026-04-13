"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export const RecurringExpenseForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/recurring", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    setLoading(false);
    setMessage(result.success ? "Recurring expense saved" : result.error);

    if (result.success) {
      form.reset();
      window.location.reload();
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="grid gap-4 md:grid-cols-5" onSubmit={handleSubmit}>
      <div className="md:col-span-1 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Amount</label>
        <Input name="amount" placeholder="0.00" type="number" step="0.01" required />
      </div>
      <div className="md:col-span-1 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</label>
        <Input name="category" placeholder="Home, Travel, etc." required />
      </div>
      <div className="md:col-span-1 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Frequency</label>
        <Select
          name="frequency"
          defaultValue="monthly"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
      </div>
      <div className="md:col-span-1 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Start Date</label>
        <Input name="startDate" type="date" defaultValue={today} required />
      </div>
      <div className="md:col-span-1 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">End Date</label>
        <Input name="endDate" type="date" />
      </div>
      <div className="md:col-span-4 space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Description</label>
        <Input name="note" placeholder="What is this recurring payment for?" />
      </div>
      <div className="md:col-span-5 flex items-end">
        <Button className="md:w-fit" type="submit" variant="primary" disabled={loading}>
          {loading ? "Saving..." : "Setup Recurring"}
        </Button>
      </div>
      {message ? <p className="md:col-span-5 text-sm font-medium text-primary">{message}</p> : null}
    </form>
  );
};
