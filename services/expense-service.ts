import { connectToDatabase } from "@/lib/db";
import { ExpenseModel } from "@/models/Expense";

export const listExpenses = async ({
  userId,
  category,
  startDate,
  endDate
}: {
  userId: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}) => {
  await connectToDatabase();

  const query: Record<string, unknown> = { userId };

  if (category) {
    query.category = category;
  }

  if (startDate || endDate) {
    const dateQuery: { $gte?: Date; $lte?: Date } = {};

    if (startDate) {
      dateQuery.$gte = new Date(startDate);
    }

    if (endDate) {
      dateQuery.$lte = new Date(endDate);
    }

    query.date = dateQuery;
  }

  return ExpenseModel.find(query).sort({ date: -1, createdAt: -1 }).lean();
};
