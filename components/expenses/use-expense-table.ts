"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { ExpenseItem, ExpenseFilters, ExpenseFormState } from "@/types/expense";

export const useExpenseTable = (initialExpenses: ExpenseItem[]) => {
	const router = useRouter();
	const [items, setItems] = useState(initialExpenses);
	const [filters, setFilters] = useState<ExpenseFilters>({
		category: "",
		startDate: "",
		endDate: "",
	});
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editForm, setEditForm] = useState<ExpenseFormState>({
		amount: "",
		category: "",
		note: "",
		date: "",
	});
	const [editError, setEditError] = useState("");
	const [editLoading, setEditLoading] = useState(false);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const startEditing = (expense: ExpenseItem) => {
		setEditingId(expense._id);
		setDeletingId(null);
		setEditError("");
		setEditForm({
			amount: String(expense.amount),
			category: expense.category,
			note: expense.note,
			date: expense.date.slice(0, 10),
		});
	};

	const cancelEditing = () => {
		setEditingId(null);
		setEditError("");
		setEditLoading(false);
	};

	const cancelDeleting = () => {
		setDeletingId(null);
	};

	const removeExpense = async (id: string) => {
		if (deletingId !== id) {
			setDeletingId(id);
			setEditingId(null);
			return;
		}

		const response = await fetch(`/api/expenses/${id}`, {
			method: "DELETE",
		});
		const result = await response.json();

		if (result.success) {
			setItems((current) => current.filter((item) => item._id !== id));
			setDeletingId(null);
			router.refresh();
		}
	};

	const applyFilters = async () => {
		const searchParams = new URLSearchParams();
		Object.entries(filters).forEach(([key, value]) => {
			if (value) {
				searchParams.set(key, value);
			}
		});

		const response = await fetch(
			`/api/expenses?${searchParams.toString()}`,
		);
		const result = await response.json();
		if (result.success) {
			setItems(result.data);
		}
	};

	const submitEdit = async (
		event: FormEvent<HTMLFormElement>,
		expenseId: string,
	) => {
		event.preventDefault();
		setEditLoading(true);
		setEditError("");

		const response = await fetch(`/api/expenses/${expenseId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: editForm.amount,
				category: editForm.category,
				note: editForm.note,
				date: editForm.date,
			}),
		});

		const result = await response.json();
		setEditLoading(false);

		if (!result.success) {
			setEditError(result.error ?? "Unable to update expense");
			return;
		}

		if (result.success) {
			setItems((current) =>
				current.map((item) =>
					item._id === expenseId
						? {
								...item,
								amount: Number(editForm.amount),
								category: editForm.category,
								note: editForm.note,
								date: new Date(editForm.date).toISOString(),
							}
						: item,
				),
			);
			cancelEditing();
			router.refresh();
		}
	};

	return {
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
	};
};
