"use client";

import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExpenseItem } from "@/types/expense";

type ExpenseActionsProps = {
	expense: ExpenseItem;
	deletingId: string | null;
	startEditing: (expense: ExpenseItem) => void;
	cancelDeleting: () => void;
	removeExpense: (id: string) => Promise<void>;
};

export const ExpenseActions = ({
	expense,
	deletingId,
	startEditing,
	cancelDeleting,
	removeExpense,
}: ExpenseActionsProps) => {
	const isDeleting = deletingId === expense._id;

	return (
		<div className="flex items-center justify-end gap-2 transition-all">
			{isDeleting ? (
				<div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-300">
					<Button
						variant="ghost"
						className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:bg-muted"
						onClick={cancelDeleting}
					>
						Cancel
					</Button>
					<Button
						variant="ghost"
						className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider text-destructive hover:bg-destructive/10"
						onClick={() => removeExpense(expense._id)}
					>
						Confirm
					</Button>
				</div>
			) : (
				<>
					<Button
						variant="ghost"
						className="py-2 px-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
						onClick={() => startEditing(expense)}
					>
						<Edit2 size={16} />
					</Button>
					<Button
						variant="ghost"
						className="py-2 px-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
						onClick={() => removeExpense(expense._id)}
					>
						<Trash2 size={16} />
					</Button>
				</>
			)}
		</div>
	);
};
