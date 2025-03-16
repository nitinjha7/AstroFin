import mongoose from "mongoose";

export interface ITransaction {
  _id?: string;
  userId?: string;
  type: string;
  amount: number;
  category: string;
  date: Date | number;
  description: string;
  createdAt: Date | number;
}

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
