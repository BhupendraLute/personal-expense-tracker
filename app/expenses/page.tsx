import { AppShell } from "@/components/layout/app-shell";
import { Sidebar } from "@/components/layout/sidebar";
import { CsvImportForm } from "@/components/csv/csv-import-form";
import { ExpenseForm } from "@/components/expenses/expense-form";
import { ExpenseTable } from "@/components/expenses/expense-table";
import { RecurringExpenseForm } from "@/components/recurring/recurring-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireSession } from "@/lib/auth/guards";
import { connectToDatabase } from "@/lib/db";
import { ExpenseModel } from "@/models/Expense";
import { generateRecurringExpenses } from "@/services/recurring-service";
import { Download, PlusCircle, Repeat, FileUp } from "lucide-react";

export default async function ExpensesPage() {
  const session = await requireSession();
  await generateRecurringExpenses(session.user.id);
  await connectToDatabase();

  return (
    <AppShell sidebar={<Sidebar />}>
      <div className="mb-10 lg:flex lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Add Expense</h1>
          <p className="text-muted-foreground mt-1 text-lg">Quickly record your spending and setup recurring payments</p>
        </div>
      </div>

      <div className="grid gap-10">
        <div className="grid gap-10">
          <Card className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <PlusCircle className="text-primary h-5 w-5" />
              <h2 className="text-xl font-bold">One-time Expense</h2>
            </div>
            <ExpenseForm />
          </Card>

          <Card className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Repeat className="text-primary h-5 w-5" />
              <h2 className="text-xl font-bold">Setup Recurring</h2>
            </div>
            <RecurringExpenseForm />
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
