"use client";

import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/dates";

export const BudgetProgress = ({
  budget
}: {
  budget: { limit: number; spent: number; remaining: number; exceeded: boolean } | null;
}) => {
  if (!budget) {
    return (
      <Card className="flex flex-col items-center justify-center py-10 text-center border-dashed border-2">
        <TrendingUp className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold tracking-tight">Focus your spending</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-[240px]">
          Set a monthly budget to visualize your spending and reach your goals faster.
        </p>
      </Card>
    );
  }

  const progress = Math.min((budget.spent / budget.limit) * 100, 100);
  const warning = progress >= 80 || budget.exceeded;

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Monthly Budget</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Analyzing your wallet for this period
          </p>
        </div>
        <div className={`p-2 rounded-xl ${budget.exceeded ? "bg-destructive/10 text-destructive" : warning ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"}`}>
           {budget.exceeded ? <AlertTriangle size={24} /> : warning ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between text-sm">
          <div className="flex flex-col">
             <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-wider text-muted-foreground">Spent</span>
             <span className="text-2xl font-bold">{formatCurrency(budget.spent)}</span>
          </div>
          <div className="flex flex-col text-right">
             <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-wider">Limit</span>
             <span className="text-2xl font-bold text-muted-foreground">{formatCurrency(budget.limit)}</span>
          </div>
        </div>

        <div className="h-4 w-full rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full transition-all duration-500 ${
              budget.exceeded 
                ? "bg-gradient-to-r from-destructive to-red-400" 
                : warning 
                  ? "bg-gradient-to-r from-amber-500 to-yellow-300" 
                  : "bg-gradient-to-r from-primary to-blue-400"
            }`}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
           <p className="text-sm font-medium">
            {budget.exceeded
              ? `Spending is ${formatCurrency(budget.spent - budget.limit)} over limit`
              : `${formatCurrency(budget.remaining)} left to spend`}
          </p>
          <span className="text-sm font-bold bg-secondary px-3 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </Card>
  );
};
