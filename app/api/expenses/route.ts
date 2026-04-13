import { revalidateExpenseTrackerPaths } from "@/lib/revalidate-app";
import { requireApiSession } from "@/lib/auth/guards";
import { connectToDatabase } from "@/lib/db";
import { expenseFiltersSchema, expenseSchema } from "@/lib/validators/expense";
import { ExpenseModel } from "@/models/Expense";
import { generateRecurringExpenses } from "@/services/recurring-service";
import { listExpenses } from "@/services/expense-service";
import { apiError, apiSuccess } from "@/utils/api";

export async function GET(request: Request) {
  try {
    const session = await requireApiSession();
    await generateRecurringExpenses(session.user.id);

    const { searchParams } = new URL(request.url);
    const parsed = expenseFiltersSchema.safeParse({
      category: searchParams.get("category") ?? undefined,
      startDate: searchParams.get("startDate") ?? undefined,
      endDate: searchParams.get("endDate") ?? undefined
    });

    if (!parsed.success) {
      return apiError("Invalid filters");
    }

    const expenses = await listExpenses({
      userId: session.user.id,
      ...parsed.data
    });

    return apiSuccess(expenses);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to fetch expenses", 401);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireApiSession();
    const body = await request.json();
    const parsed = expenseSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Invalid expense");
    }

    await connectToDatabase();
    const expense = await ExpenseModel.create({
      ...parsed.data,
      userId: session.user.id
    });

    revalidateExpenseTrackerPaths();
    return apiSuccess(expense, { status: 201 });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to create expense");
  }
}
