"use client";

import { motion } from "motion/react";
import { formatCurrency, formatDisplayDate } from "@/utils/dates";
import { ExpenseItem } from "@/types/expense";
import { ExpenseActions } from "./expense-actions";

type ExpenseRowProps = {
	expense: ExpenseItem;
	deletingId: string | null;
	startEditing: (expense: ExpenseItem) => void;
	cancelDeleting: () => void;
	removeExpense: (id: string) => Promise<void>;
};

export const ExpenseRow = ({
	expense,
	deletingId,
	startEditing,
	cancelDeleting,
	removeExpense,
}: ExpenseRowProps) => {
	return (
		<motion.tr
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			key={expense._id}
			className="group hover:bg-muted/50 transition-colors"
		>
			<td className="px-6 py-4 font-medium text-muted-foreground">
				{formatDisplayDate(expense.date)}
			</td>
			<td className="px-6 py-4">
				<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase">
					{expense.category}
				</span>
			</td>
			<td className="px-6 py-4 text-muted-foreground">
				{expense.note || "-"}
			</td>
			<td className="px-6 py-4 text-right font-bold text-foreground">
				{formatCurrency(expense.amount)}
			</td>
			<td className="px-6 py-4">
				<ExpenseActions
					expense={expense}
					deletingId={deletingId}
					startEditing={startEditing}
					cancelDeleting={cancelDeleting}
					removeExpense={removeExpense}
				/>
			</td>
		</motion.tr>
	);
};
