"use client";

import { motion } from "motion/react";
import { XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpenseItem, ExpenseFormState } from "@/types/expense";
import { FormEvent } from "react";

type ExpenseEditFormProps = {
	expense: ExpenseItem;
	editForm: ExpenseFormState;
	setEditForm: React.Dispatch<React.SetStateAction<ExpenseFormState>>;
	submitEdit: (event: FormEvent<HTMLFormElement>, id: string) => Promise<void>;
	cancelEditing: () => void;
	editLoading: boolean;
	editError: string;
};

export const ExpenseEditForm = ({
	expense,
	editForm,
	setEditForm,
	submitEdit,
	cancelEditing,
	editLoading,
	editError,
}: ExpenseEditFormProps) => {
	return (
		<motion.tr
			initial={{ opacity: 0, height: 0 }}
			animate={{
				opacity: 1,
				height: "auto",
			}}
			className="bg-secondary/20"
		>
			<td className="px-6 py-6" colSpan={5}>
				<form
					className="space-y-6"
					onSubmit={(event) => submitEdit(event, expense._id)}
				>
					<div className="grid gap-6 md:grid-cols-4">
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
								Amount
							</label>
							<Input
								type="number"
								step="0.01"
								value={editForm.amount}
								onChange={(event) =>
									setEditForm((current) => ({
										...current,
										amount: event.target.value,
									}))
								}
								required
								autoFocus
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
								Category
							</label>
							<Input
								value={editForm.category}
								onChange={(event) =>
									setEditForm((current) => ({
										...current,
										category: event.target.value,
									}))
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
								Date
							</label>
							<Input
								type="date"
								value={editForm.date}
								onChange={(event) =>
									setEditForm((current) => ({
										...current,
										date: event.target.value,
									}))
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
								Note (Optional)
							</label>
							<Input
								value={editForm.note}
								onChange={(event) =>
									setEditForm((current) => ({
										...current,
										note: event.target.value,
									}))
								}
							/>
						</div>
					</div>

					{editError ? (
						<p className="text-sm font-semibold text-destructive">
							{editError}
						</p>
					) : null}

					<div className="flex items-center gap-3 justify-end pt-4 border-t border-border">
						<Button
							type="button"
							variant="ghost"
							onClick={cancelEditing}
							disabled={editLoading}
							className="gap-2"
						>
							<XCircle size={16} />
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={editLoading}
							className="gap-2 px-6"
						>
							{editLoading ? (
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
							) : (
								<CheckCircle size={16} />
							)}
							{editLoading ? "Updating..." : "Update Expense"}
						</Button>
					</div>
				</form>
			</td>
		</motion.tr>
	);
};
