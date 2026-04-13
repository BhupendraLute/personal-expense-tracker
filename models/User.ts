import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    provider: {
      type: String,
      enum: ["google"],
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: string;
};

export const UserModel =
  (models.User as Model<UserDocument>) || model<UserDocument>("User", userSchema);
