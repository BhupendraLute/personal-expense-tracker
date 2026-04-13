import { AppShell } from "@/components/layout/app-shell";
import { Sidebar } from "@/components/layout/sidebar";
import { BudgetForm } from "@/components/budget/budget-form";
import { Card } from "@/components/ui/card";
import { requireSession } from "@/lib/auth/guards";
import { connectToDatabase } from "@/lib/db";
import { BudgetModel } from "@/models/Budget";
import { ExpenseModel } from "@/models/Expense";
import { formatCurrency, getMonthKey } from "@/utils/dates";
import { Target, PieChart, Wallet } from "lucide-react";
import { cn } from "@/utils/cn";

export default async function BudgetPage() {
  const session = await requireSession();
  const month = getMonthKey(new Date());

  await connectToDatabase();
  const startOfMonth = new Date(`${month}-01T00:00:00.000Z`);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  const [budget, expenses] = await Promise.all([
    BudgetModel.findOne({ userId: session.user.id, month }).lean(),
    ExpenseModel.find({
      userId: session.user.id,
      date: { $gte: startOfMonth, $lt: endOfMonth }
    }).lean()
  ]);

  const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = budget ? budget.monthlyLimit - spent : 0;

  return (
    <AppShell sidebar={<Sidebar />}>
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Budget Planning</h1>
        <p className="text-muted-foreground mt-1 text-lg">Set boundaries and reach your financial targets</p>
      </div>

      <div className="grid gap-10">
        <Card className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Target className="text-primary h-5 w-5" />
            <h2 className="text-xl font-bold">Planned Limit</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6" style={{ wordSpacing: "0.15em" }}>
            Establishing a limit helps you stay disciplined and save for what matters.
          </p>
          <BudgetForm defaultMonth={month} defaultLimit={budget?.monthlyLimit} />
        </Card>

        <section className="grid gap-6 md:grid-cols-3">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-300" />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                 <Wallet size={12} /> Target
              </span>
              <span className="text-2xl font-bold">
                {budget ? formatCurrency(budget.monthlyLimit) : "Not set"}
              </span>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                 <PieChart size={12} /> Spent
              </span>
              <span className="text-2xl font-bold">{formatCurrency(spent)}</span>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div className={cn("absolute top-0 left-0 w-1 h-full", remaining < 0 ? "bg-destructive" : "bg-teal-500")} />
            <div className="flex flex-col">
              <span className={cn("text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2", remaining < 0 ? "text-destructive" : "text-muted-foreground")}>
                 <Target size={12} /> Remaining
              </span>
              <span className={cn("text-2xl font-bold", remaining < 0 ? "text-destructive" : "text-teal-500")}>
                {budget ? formatCurrency(remaining) : "Set target first"}
              </span>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
