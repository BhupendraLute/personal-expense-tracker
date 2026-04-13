import mongoose from "mongoose";

import { env } from "@/lib/env";

declare global {
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

export const connectToDatabase = async () => {
  if (!global.mongooseConnection) {
    global.mongooseConnection = mongoose.connect(env.mongodbUri, {
      bufferCommands: false
    });
  }

  return global.mongooseConnection;
};
