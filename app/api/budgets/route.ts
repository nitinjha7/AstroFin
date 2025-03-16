import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Budget } from "@/models/budget";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get budgets for a specific month
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month") || new Date().toISOString().slice(0, 7); // Default to current month

    const budgets = await Budget.find({ userId: session.user.id, month });

    return NextResponse.json(budgets);
  } catch (error) {
    console.error("Get budgets error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update or set a budget for a specific month
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { month, category, amount } = await req.json();
    const amountNumber = parseFloat(amount);

    if (!month || !category || isNaN(amountNumber)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();
    
    // Find the budget for this month, user, and category
    let budget = await Budget.findOne({ 
      userId: session.user.id,
      month,
      category
    });

    if (budget) {
      // Update existing budget
      budget.amount = amountNumber;
    } else {
      // Create new budget
      budget = new Budget({
        userId: session.user.id,
        month,
        category,
        amount: amountNumber,
        currentStatus: "not completed",
        currentAmount: 0,
      });
    }
    await budget.save();

    return NextResponse.json({ message: "Budget updated!" });

  } catch (error) {
    console.error("Update budget error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}