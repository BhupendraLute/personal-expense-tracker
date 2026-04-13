import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.string().min(1).max(60),
  note: z.string().max(240).default(""),
  date: z.coerce.date()
});

export const expenseFiltersSchema = z.object({
  category: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional()
});

export const recurringExpenseSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.string().min(1).max(60),
  note: z.string().max(240).default(""),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional()
});

export const budgetSchema = z.object({
  monthlyLimit: z.coerce.number().nonnegative(),
  month: z.string().regex(/^\d{4}-\d{2}$/)
});
