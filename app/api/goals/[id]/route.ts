import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Goal } from "@/models/goal";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// PATCH - Update goal progress
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const goalId = params.id;

    if (!goalId) {
      return NextResponse.json({ error: "Missing goal ID" }, { status: 400 });
    }

    const { newAmount } = await req.json();

    if (newAmount == null || isNaN(newAmount) || Number(newAmount) < 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    await connectToDatabase();

    const goal = await Goal.findOne({ _id: goalId, userId });

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    console.log("Updating Goal:", goalId, "New Amount:", newAmount);

    goal.currentAmount = Number(newAmount);
    await goal.save();

    return NextResponse.json({ goal }, { status: 200 });
  } catch (error) {
    console.error("Update goal progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
