"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target } from "lucide-react"

// Sample goals data (in a real app, this would come from an API)
const goals = [
  {
    id: 1,
    name: "Vacation Fund",
    targetAmount: 50000,
    currentAmount: 15000,
    targetDate: "2023-12-31",
    progress: 30,
  },
  {
    id: 2,
    name: "Emergency Fund",
    targetAmount: 100000,
    currentAmount: 75000,
    targetDate: "2023-10-31",
    progress: 75,
  },
  {
    id: 3,
    name: "New Laptop",
    targetAmount: 80000,
    currentAmount: 20000,
    targetDate: "2023-11-30",
    progress: 25,
  },
]

export function SavingsGoals() {
  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div key={goal.id} className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{goal.name}</p>
              <p className="text-sm font-medium">{goal.progress}%</p>
            </div>
            <Progress value={goal.progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>₹{goal.currentAmount.toLocaleString()}</span>
              <span>₹{goal.targetAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full" asChild>
        <a href="/dashboard/goals">View All Goals</a>
      </Button>
    </div>
  )
}

