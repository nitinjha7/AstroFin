import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/transaction";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dayjs from "dayjs";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    await connectToDatabase();

    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    // Get transactions for this month
    const transactions = await Transaction.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        totalIncome += t.amount;
      } else {
        totalExpenses += Math.abs(t.amount);
      }
    });

    const totalBalance = totalIncome - totalExpenses;
    const savings = totalIncome * 0.1; // Assume 10% savings for now

    return NextResponse.json({
      totalBalance,
      totalIncome,
      totalExpenses,
      savings,
      transactions,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
