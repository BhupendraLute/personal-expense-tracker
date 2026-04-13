export type ExpenseItem = {
	_id: string;
	amount: number;
	category: string;
	note: string;
	date: string;
};

export type ExpenseFilters = {
	category: string;
	startDate: string;
	endDate: string;
};

export type ExpenseFormState = {
	amount: string;
	category: string;
	note: string;
	date: string;
};
