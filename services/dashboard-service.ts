import { eachDayOfInterval } from "date-fns";

import { connectToDatabase } from "@/lib/db";
import { BudgetModel } from "@/models/Budget";
import { ExpenseModel } from "@/models/Expense";
import {
  formatDayLabel,
  getDateBoundaries,
  getDateDaysAgo,
  getMonthKey
} from "@/utils/dates";

export const getDashboardSnapshot = async (userId: string) => {
  await connectToDatabase();

  const now = new Date();
  const [dailyRange, weeklyRange, monthlyRange] = [
    getDateBoundaries("day", now),
    getDateBoundaries("week", now),
    getDateBoundaries("month", now)
  ];
  const trendStart = getDateDaysAgo(6, now);

  const [expenses, budget] = await Promise.all([
    ExpenseModel.find({
      userId,
      date: { $gte: monthlyRange.start, $lt: dailyRange.end }
    }).lean(),
    BudgetModel.findOne({
      userId,
      month: getMonthKey(now)
    }).lean()
  ]);

  const totalForRange = (start: Date, end: Date) =>
    expenses
      .filter((expense) => expense.date >= start && expense.date < end)
      .reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce<Record<string, number>>((accumulator, expense) => {
    accumulator[expense.category] = (accumulator[expense.category] ?? 0) + expense.amount;
    return accumulator;
  }, {});

  const lineItems = eachDayOfInterval({
    start: trendStart,
    end: new Date(dailyRange.end.getTime() - 1)
  }).map((date) => {
    const dayRange = getDateBoundaries("day", date);
    const total = expenses
      .filter((expense) => expense.date >= dayRange.start && expense.date < dayRange.end)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      label: formatDayLabel(date),
      total
    };
  });

  const monthlySpent = totalForRange(monthlyRange.start, monthlyRange.end);

  return {
    totals: {
      daily: totalForRange(dailyRange.start, dailyRange.end),
      weekly: totalForRange(weeklyRange.start, weeklyRange.end),
      monthly: monthlySpent
    },
    categories: Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value
    })),
    trend: lineItems,
    budget: budget
      ? {
          limit: budget.monthlyLimit,
          spent: monthlySpent,
          remaining: Math.max(budget.monthlyLimit - monthlySpent, 0),
          exceeded: monthlySpent > budget.monthlyLimit
        }
      : null
  };
};
