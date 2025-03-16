import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/transaction";
import dayjs from "dayjs";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "daily";

    await connectToDatabase();
    const userId = session.user.id;

    // Calculate date range based on period
    let startDate;
    const endDate = dayjs();

    switch (period) {
      case "daily":
        startDate = endDate.subtract(1, "day");
        break;
      case "weekly":
        startDate = endDate.subtract(1, "week");
        break;
      case "monthly":
        startDate = endDate.subtract(1, "month");
        break;
      case "yearly":
        startDate = endDate.subtract(1, "year");
        break;
      default:
        startDate = endDate.subtract(1, "week");
    }

    // Build query
    const query: any = {
      userId,
      date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
      type: "expense"
    };

    const transactions = await Transaction.find(query)
      .select('date amount category')
      .sort({ date: 1 });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Spending trends API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
