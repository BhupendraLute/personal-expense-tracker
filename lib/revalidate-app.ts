import { revalidatePath } from "next/cache";

export const revalidateExpenseTrackerPaths = () => {
  revalidatePath("/dashboard");
  revalidatePath("/expenses");
  revalidatePath("/budget");
};
