import { revalidateExpenseTrackerPaths } from "@/lib/revalidate-app";
import { requireApiSession } from "@/lib/auth/guards";
import { connectToDatabase } from "@/lib/db";
import { recurringExpenseSchema } from "@/lib/validators/expense";
import { RecurringExpenseModel } from "@/models/RecurringExpense";
import { generateRecurringExpenses } from "@/services/recurring-service";
import { apiError, apiSuccess } from "@/utils/api";

export async function GET() {
  try {
    const session = await requireApiSession();
    await generateRecurringExpenses(session.user.id);

    await connectToDatabase();
    const recurringExpenses = await RecurringExpenseModel.find({
      userId: session.user.id
    })
      .sort({ createdAt: -1 })
      .lean();

    return apiSuccess(recurringExpenses);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to fetch recurring expenses");
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireApiSession();
    const body = await request.json();
    const parsed = recurringExpenseSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Invalid recurring expense");
    }

    await connectToDatabase();
    const recurringExpense = await RecurringExpenseModel.create({
      ...parsed.data,
      userId: session.user.id,
      lastGenerated: null
    });

    revalidateExpenseTrackerPaths();
    return apiSuccess(recurringExpense, { status: 201 });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Unable to create recurring expense"
    );
  }
}
