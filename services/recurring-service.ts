import { connectToDatabase } from "@/lib/db";
import { ExpenseModel } from "@/models/Expense";
import { RecurringExpenseModel } from "@/models/RecurringExpense";
import { advanceDateByFrequency } from "@/utils/dates";

export const generateRecurringExpenses = async (userId: string) => {
  await connectToDatabase();

  const now = new Date();
  const recurringExpenses = await RecurringExpenseModel.find({ userId }).lean();

  let createdCount = 0;

  for (const recurring of recurringExpenses) {
    let cursor = recurring.lastGenerated ?? recurring.startDate;
    let lastGeneratedAt = recurring.lastGenerated ?? null;

    if (cursor < recurring.startDate) {
      cursor = recurring.startDate;
    }

    while (cursor <= now) {
      if (!recurring.endDate || cursor <= recurring.endDate) {
        const duplicate = await ExpenseModel.findOne({
          userId,
          sourceRecurringId: recurring._id,
          date: cursor
        }).lean();

        if (!duplicate) {
          await ExpenseModel.create({
            amount: recurring.amount,
            category: recurring.category,
            note: recurring.note,
            date: cursor,
            userId,
            sourceRecurringId: recurring._id
          });
          createdCount += 1;
        }

        lastGeneratedAt = cursor;
      }

      const nextCursor = advanceDateByFrequency(cursor, recurring.frequency);
      if (nextCursor.getTime() === cursor.getTime()) {
        break;
      }
      cursor = nextCursor;
    }

    await RecurringExpenseModel.findByIdAndUpdate(recurring._id, {
      lastGenerated: lastGeneratedAt
    });
  }

  return createdCount;
};
