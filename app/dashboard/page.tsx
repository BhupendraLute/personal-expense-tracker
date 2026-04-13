import { AppShell } from "@/components/layout/app-shell";
import { Sidebar } from "@/components/layout/sidebar";
import { BudgetProgress } from "@/components/dashboard/budget-progress";
import { DashboardCharts } from "@/components/dashboard/charts";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { requireSession } from "@/lib/auth/guards";
import { getDashboardSnapshot } from "@/services/dashboard-service";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await requireSession();
  const snapshot = await getDashboardSnapshot(session.user.id);
  const firstName = session.user.name?.split(" ")[0] ?? "there";

  return (
    <AppShell sidebar={<Sidebar />}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Welcome back, {firstName}!</h1>
        <p className="text-muted-foreground mt-1 text-lg">Here's what's happening with your money today.</p>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        <SummaryCard accent="bg-primary" label="Today" value={snapshot.totals.daily} />
        <SummaryCard accent="bg-amber-500" label="This Week" value={snapshot.totals.weekly} />
        <SummaryCard accent="bg-purple-500" label="This Month" value={snapshot.totals.monthly} />
      </section>

      <div className="mt-10 space-y-10">
        <BudgetProgress budget={snapshot.budget} />
        <DashboardCharts categories={snapshot.categories} trend={snapshot.trend} />
      </div>
    </AppShell>
  );
}
