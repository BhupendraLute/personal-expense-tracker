import { revalidateExpenseTrackerPaths } from "@/lib/revalidate-app";
import { requireApiSession } from "@/lib/auth/guards";
import { connectToDatabase } from "@/lib/db";
import { expenseSchema } from "@/lib/validators/expense";
import { ExpenseModel } from "@/models/Expense";
import { apiError, apiSuccess } from "@/utils/api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  try {
    const session = await requireApiSession();
    const { id } = await context.params;
    const body = await request.json();
    const parsed = expenseSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Invalid expense");
    }

    await connectToDatabase();
    const expense = await ExpenseModel.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      parsed.data,
      { new: true }
    );

    if (!expense) {
      return apiError("Expense not found", 404);
    }

    revalidateExpenseTrackerPaths();
    return apiSuccess(expense);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to update expense");
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await requireApiSession();
    const { id } = await context.params;

    await connectToDatabase();
    const expense = await ExpenseModel.findOneAndDelete({
      _id: id,
      userId: session.user.id
    });

    if (!expense) {
      return apiError("Expense not found", 404);
    }

    revalidateExpenseTrackerPaths();
    return apiSuccess({ deleted: true });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to delete expense");
  }
}
