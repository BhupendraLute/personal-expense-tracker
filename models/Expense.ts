import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const expenseSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    note: {
      type: String,
      default: "",
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    sourceRecurringId: {
      type: Schema.Types.ObjectId,
      ref: "RecurringExpense",
      default: null
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

expenseSchema.index({ userId: 1, date: -1 });

export type ExpenseDocument = InferSchemaType<typeof expenseSchema> & {
  _id: string;
};

export const ExpenseModel =
  (models.Expense as Model<ExpenseDocument>) || model<ExpenseDocument>("Expense", expenseSchema);
