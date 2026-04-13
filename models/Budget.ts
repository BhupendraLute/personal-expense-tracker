import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const budgetSchema = new Schema(
  {
    monthlyLimit: {
      type: Number,
      required: true,
      min: 0
    },
    month: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

budgetSchema.index({ userId: 1, month: 1 }, { unique: true });

export type BudgetDocument = InferSchemaType<typeof budgetSchema> & {
  _id: string;
};

export const BudgetModel =
  (models.Budget as Model<BudgetDocument>) || model<BudgetDocument>("Budget", budgetSchema);
