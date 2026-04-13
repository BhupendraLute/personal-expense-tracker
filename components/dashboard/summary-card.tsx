"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/dates";
import { TrendingUp, Calendar, Clock } from "lucide-react";
import { cn } from "@/utils/cn";

const iconMap: Record<string, any> = {
  "Today": Clock,
  "This Week": Calendar,
  "This Month": TrendingUp,
};

export const SummaryCard = ({
  label,
  value,
  accent
}: {
  label: string;
  value: number;
  accent: string;
}) => {
  const Icon = iconMap[label] || TrendingUp;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative overflow-hidden group">
        <div className={cn("absolute top-0 left-0 w-1 h-full", accent)} />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{formatCurrency(value)}</p>
          </div>
          <div className={cn("p-3 rounded-2xl bg-secondary transition-colors group-hover:bg-primary/10")}>
            <Icon className={cn("h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary")} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
