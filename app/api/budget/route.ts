import { revalidateExpenseTrackerPaths } from "@/lib/revalidate-app";
import { requireApiSession } from "@/lib/auth/guards";
import { connectToDatabase } from "@/lib/db";
import { budgetSchema } from "@/lib/validators/expense";
import { BudgetModel } from "@/models/Budget";
import { apiError, apiSuccess } from "@/utils/api";
import { getMonthKey } from "@/utils/dates";

export async function GET() {
  try {
    const session = await requireApiSession();
    const month = getMonthKey(new Date());

    await connectToDatabase();
    const budget = await BudgetModel.findOne({
      userId: session.user.id,
      month
    }).lean();

    return apiSuccess(budget);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to fetch budget", 401);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireApiSession();
    const body = await request.json();
    const parsed = budgetSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Invalid budget");
    }

    await connectToDatabase();
    const budget = await BudgetModel.findOneAndUpdate(
      { userId: session.user.id, month: parsed.data.month },
      { monthlyLimit: parsed.data.monthlyLimit },
      { upsert: true, new: true }
    );

    revalidateExpenseTrackerPaths();
    return apiSuccess(budget);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to save budget");
  }
}
