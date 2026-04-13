"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpenseFilters } from "@/types/expense";

type ExpenseFiltersProps = {
	filters: ExpenseFilters;
	setFilters: React.Dispatch<React.SetStateAction<ExpenseFilters>>;
	applyFilters: () => Promise<void>;
};

export const ExpenseFiltersBar = ({
	filters,
	setFilters,
	applyFilters,
}: ExpenseFiltersProps) => {
	return (
		<div className="flex flex-wrap items-end gap-4 bg-muted/30 p-4 rounded-2xl border border-border">
			<div className="flex-1 min-w-[200px] space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
					Category Filter
				</label>
				<Input
					placeholder="Search category..."
					value={filters.category}
					onChange={(event) =>
						setFilters((current) => ({
							...current,
							category: event.target.value,
						}))
					}
					className="h-10 border-transparent bg-background/50 focus:bg-background"
				/>
			</div>
			<div className="w-full md:w-auto space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
					Start Date
				</label>
				<Input
					type="date"
					value={filters.startDate}
					onChange={(event) =>
						setFilters((current) => ({
							...current,
							startDate: event.target.value,
						}))
					}
					className="h-10 border-transparent bg-background/50 focus:bg-background"
				/>
			</div>
			<div className="w-full md:w-auto space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
					End Date
				</label>
				<Input
					type="date"
					value={filters.endDate}
					onChange={(event) =>
						setFilters((current) => ({
							...current,
							endDate: event.target.value,
						}))
					}
					className="h-10 border-transparent bg-background/50 focus:bg-background"
				/>
			</div>
			<Button
				variant="primary"
				onClick={applyFilters}
				className="h-10 gap-2 px-6"
			>
				<Filter size={16} />
				<span>Apply Filters</span>
			</Button>
		</div>
	);
};
