import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const recurringExpenseSchema = new Schema(
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
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      default: null
    },
    lastGenerated: {
      type: Date,
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

export type RecurringExpenseDocument = InferSchemaType<typeof recurringExpenseSchema> & {
  _id: string;
};

export const RecurringExpenseModel =
  (models.RecurringExpense as Model<RecurringExpenseDocument>) ||
  model<RecurringExpenseDocument>("RecurringExpense", recurringExpenseSchema);
