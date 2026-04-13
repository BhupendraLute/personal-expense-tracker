import { connectToDatabase } from "@/lib/db";
import { ExpenseModel } from "@/models/Expense";
import { expenseSchema } from "@/lib/validators/expense";
import { generateExpenseCsv, parseExpenseCsv } from "@/utils/csv";

export const exportExpensesAsCsv = async (userId: string) => {
  await connectToDatabase();

  const expenses = await ExpenseModel.find({ userId }).sort({ date: -1 }).lean();

  return generateExpenseCsv(
    expenses.map((expense) => ({
      amount: expense.amount.toString(),
      category: expense.category,
      note: expense.note,
      date: expense.date.toISOString()
    }))
  );
};

export const importExpensesFromCsv = async (userId: string, csvContent: string) => {
  await connectToDatabase();

  const rows = parseExpenseCsv(csvContent);
  const inserted = [];
  const errors: string[] = [];

  for (const [index, row] of rows.entries()) {
    const parsed = expenseSchema.safeParse(row);

    if (!parsed.success) {
      errors.push(`Row ${index + 2}: ${parsed.error.errors[0]?.message ?? "Invalid row"}`);
      continue;
    }

    const created = await ExpenseModel.create({
      ...parsed.data,
      userId
    });

    inserted.push(created);
  }

  return {
    inserted: inserted.length,
    errors
  };
};
