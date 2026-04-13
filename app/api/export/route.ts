import { requireApiSession } from "@/lib/auth/guards";
import { exportExpensesAsCsv } from "@/services/csv-service";

export async function GET() {
  const session = await requireApiSession();
  const csv = await exportExpensesAsCsv(session.user.id);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="expenses.csv"'
    }
  });
}
