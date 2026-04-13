"use client";

import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/dates";

const colors = [
  "hsl(199, 89%, 48%)", // blue
  "hsl(169, 89%, 38%)", // teal
  "hsl(280, 89%, 60%)", // purple
  "hsl(340, 89%, 60%)", // pink
  "hsl(30, 89%, 50%)",  // orange
];

export const DashboardCharts = ({
  categories,
  trend
}: {
  categories: { name: string; value: number }[];
  trend: { label: string; total: number }[];
}) => (
  <div className="grid gap-6 lg:grid-cols-2">
    <Card className="flex flex-col h-[400px]">
      <div className="mb-4">
        <h3 className="text-xl font-bold tracking-tight">Category Allocation</h3>
        <p className="text-sm text-muted-foreground">Where your money goes</p>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={categories} 
              dataKey="value" 
              nameKey="name" 
              innerRadius={70} 
              outerRadius={100}
              stroke="none"
              paddingAngle={5}
            >
              {categories.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => formatCurrency(value)} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>

    <Card className="flex flex-col h-[400px]">
      <div className="mb-4">
        <h3 className="text-xl font-bold tracking-tight">Financial Pulse</h3>
        <p className="text-sm text-muted-foreground">Spending trend over the last 7 days</p>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              hide
            />
            <Tooltip 
               contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => formatCurrency(value)} 
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="hsl(var(--primary))" 
              strokeWidth={4} 
              dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);
