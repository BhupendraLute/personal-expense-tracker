import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";

export const upsertGoogleUser = async ({
  email,
  name,
  avatar
}: {
  email: string;
  name: string;
  avatar?: string;
}) => {
  await connectToDatabase();

  const user = await UserModel.findOneAndUpdate(
    { email },
    {
      email,
      name,
      avatar: avatar ?? "",
      provider: "google"
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  );

  return user;
};
