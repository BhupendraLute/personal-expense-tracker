import { ExpenseTable } from "@/components/expenses/expense-table";
import { AppShell } from "@/components/layout/app-shell";
import { Sidebar } from "@/components/layout/sidebar";
import { requireSession } from "@/lib/auth/guards";
import { connectToDatabase } from "@/lib/db";
import { ExpenseModel } from "@/models/Expense";

export default async function HistoryPage() {
	const session = await requireSession();
	await connectToDatabase();

	const expenses = await ExpenseModel.find({ userId: session.user.id })
		.sort({ date: -1 })
		.lean();

	return (
		<AppShell sidebar={<Sidebar />}>
			<div className="mb-10">
				<h1 className="text-4xl font-bold tracking-tight">
					Expense History
				</h1>
				<p className="text-muted-foreground mt-2 text-lg">
					Filter, search, and manage your complete transaction
					history.
				</p>
			</div>

			<div className="space-y-8">
				<ExpenseTable
					expenses={expenses.map((expense) => ({
						_id: expense._id.toString(),
						amount: expense.amount,
						category: expense.category,
						note: expense.note,
						date: expense.date.toISOString(),
					}))}
				/>
			</div>
		</AppShell>
	);
}
