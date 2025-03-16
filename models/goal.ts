import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    targetDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      default: "other",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

GoalSchema.virtual("progress").get(function () {
  return Math.round((this.currentAmount / this.targetAmount) * 100) || 0;
});

export const Goal = mongoose.models.Goal || mongoose.model("Goal", GoalSchema);
