import { revalidateExpenseTrackerPaths } from "@/lib/revalidate-app";
import { requireApiSession } from "@/lib/auth/guards";
import { importExpensesFromCsv } from "@/services/csv-service";
import { apiError, apiSuccess } from "@/utils/api";

export async function POST(request: Request) {
  try {
    const session = await requireApiSession();
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return apiError("CSV file is required");
    }

    const content = await file.text();
    const result = await importExpensesFromCsv(session.user.id, content);
    revalidateExpenseTrackerPaths();
    return apiSuccess(result);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "CSV import failed");
  }
}
