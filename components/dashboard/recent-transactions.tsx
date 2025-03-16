"use client"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample transactions data (in a real app, this would come from an API)
const transactions = [
  {
    id: "t1",
    description: "Grocery Shopping",
    amount: -2500,
    date: "2023-08-15",
    category: "Food & Dining",
    type: "expense",
  },
  {
    id: "t2",
    description: "Salary Deposit",
    amount: 45000,
    date: "2023-08-01",
    category: "Salary",
    type: "income",
  },
  {
    id: "t3",
    description: "Electric Bill",
    amount: -1200,
    date: "2023-08-10",
    category: "Utilities",
    type: "expense",
  },
  {
    id: "t4",
    description: "Freelance Payment",
    amount: 15000,
    date: "2023-08-05",
    category: "Freelance",
    type: "income",
  },
  {
    id: "t5",
    description: "Restaurant Dinner",
    amount: -1800,
    date: "2023-08-12",
    category: "Food & Dining",
    type: "expense",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`rounded-full p-2 ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
              {transaction.type === "income" ? (
                <ArrowUp className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{transaction.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                {transaction.type === "income" ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Edit transaction</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

