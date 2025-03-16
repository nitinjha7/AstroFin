import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
    required: true,
  },
  month: {
    type: String,
    required: true,
    match: /^\d{4}-(0[1-9]|1[0-2])$/, // Enforces "YYYY-MM" format
  },
  category: {
    type: String,
    enum: [
      "food", "transportation", "utilities", "entertainment", "shopping",
      "housing", "healthcare", "education", "personal", "travel", "other"
    ],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Budget amount should be non-negative
  },
  currentStatus: {
    type: String,
    enum: ["not completed", "completed", "overflow"],
    required: true,
  },
  currentAmount: {
    type: Number,
    required: true,
    min: 0, // Current spent amount should be non-negative
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);