import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Transaction } from "@/models/transaction"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Get a specific transaction
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const transactionId = params.id

    // Connect to database
    await connectToDatabase()

    // Get transaction
    const transaction = await Transaction.findOne({ _id: transactionId, userId })

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ transaction })
  } catch (error) {
    console.error("Get transaction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update a transaction
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const transactionId = params.id
    const { type, amount, category, date, description } = await req.json()

    // Connect to database
    await connectToDatabase()

    // Find transaction
    const transaction = await Transaction.findOne({ _id: transactionId, userId })

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    // Update transaction
    transaction.type = type || transaction.type
    transaction.amount = type === "expense" ? -Math.abs(amount) : Math.abs(amount)
    transaction.category = category || transaction.category
    transaction.date = date ? new Date(date) : transaction.date
    transaction.description = description !== undefined ? description : transaction.description

    await transaction.save()

    return NextResponse.json({ transaction })
  } catch (error) {
    console.error("Update transaction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete a transaction
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const transactionId = params.id

    // Connect to database
    await connectToDatabase()

    // Find and delete transaction
    const transaction = await Transaction.findOneAndDelete({ _id: transactionId, userId })

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete transaction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

