import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Goal } from "@/models/goal"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Get all goals for the authenticated user
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Connect to database
    await connectToDatabase()

    // Get goals
    const goals = await Goal.find({ userId }).sort({ targetDate: 1 })

    return NextResponse.json({ goals })
  } catch (error) {
    console.error("Get goals error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create a new goal
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { name, targetAmount, currentAmount, targetDate, category, description } = await req.json()

    // Validate input
    if (!name || !targetAmount || !targetDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Create goal
    const goal = new Goal({
      userId,
      name,
      targetAmount: Number(targetAmount),
      currentAmount: currentAmount ? Number(currentAmount) : 0,
      targetDate: new Date(targetDate),
      category,
      description,
    })

    await goal.save()

    return NextResponse.json({ goal }, { status: 201 })
  } catch (error) {
    console.error("Create goal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

