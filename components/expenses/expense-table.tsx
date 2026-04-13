"use client";

import { Fragment } from "react";
import { AnimatePresence } from "motion/react";
import { XCircle } from "lucide-react";

import { ExpenseItem } from "@/types/expense";
import { useExpenseTable } from "./use-expense-table";
import { ExpenseFiltersBar } from "./expense-filters";
import { ExpenseRow } from "./expense-row";
import { ExpenseEditForm } from "./expense-edit-form";

export const ExpenseTable = ({ expenses }: { expenses: ExpenseItem[] }) => {
	const {
		items,
		filters,
		setFilters,
		editingId,
		editForm,
		setEditForm,
		editError,
		editLoading,
		deletingId,
		startEditing,
		cancelEditing,
		cancelDeleting,
		removeExpense,
		applyFilters,
		submitEdit,
	} = useExpenseTable(expenses);

	return (
		<div className="space-y-8">
			<ExpenseFiltersBar
				filters={filters}
				setFilters={setFilters}
				applyFilters={applyFilters}
			/>

			<div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
				<table className="w-full text-left text-sm border-collapse">
					<thead>
						<tr className="border-b border-border bg-muted/30">
							<th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-muted-foreground">
								Date
							</th>
							<th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-muted-foreground">
								Category
							</th>
							<th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-muted-foreground">
								Note
							</th>
							<th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-muted-foreground text-right">
								Amount
							</th>
							<th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-muted-foreground text-right">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						<AnimatePresence>
							{items.map((expense) => (
								<Fragment key={expense._id}>
									<ExpenseRow
										expense={expense}
										deletingId={deletingId}
										startEditing={startEditing}
										cancelDeleting={cancelDeleting}
										removeExpense={removeExpense}
									/>
									{editingId === expense._id && (
										<ExpenseEditForm
											expense={expense}
											editForm={editForm}
											setEditForm={setEditForm}
											submitEdit={submitEdit}
											cancelEditing={cancelEditing}
											editLoading={editLoading}
											editError={editError}
										/>
									)}
								</Fragment>
							))}
						</AnimatePresence>
						{!items.length && (
							<tr>
								<td
									className="px-6 py-12 text-center text-muted-foreground"
									colSpan={5}
								>
									<div className="flex flex-col items-center gap-2">
										<XCircle className="h-8 w-8 text-muted/50" />
										<p className="font-medium">
											No expenses found matching your
											criteria
										</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
