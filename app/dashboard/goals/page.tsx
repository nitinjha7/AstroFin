"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Plus, Target } from "lucide-react"

export default function GoalsPage() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    category: "",
    description: "",
  })

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/goals")

        if (!response.ok) {
          throw new Error("Failed to fetch goals")
        }

        const data = await response.json()
        setGoals(data.goals || [])
      } catch (error) {
        console.error("Error fetching goals:", error)
        toast({
          title: "Error",
          description: "Failed to load savings goals. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGoals()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create goal")
      }

      const data = await response.json()

      toast({
        title: "Goal created",
        description: "Your savings goal has been created successfully.",
      })

      // Add the new goal to the state
      setGoals([...goals, data.goal])

      setOpen(false)
      setFormData({
        name: "",
        targetAmount: "",
        currentAmount: "",
        targetDate: "",
        category: "",
        description: "",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error.message || "Your goal couldn't be created. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Savings Goals</h1>
        </div>
        <div className="p-8 text-center">
          <p>Loading savings goals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Savings Goals</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create a new savings goal</DialogTitle>
                <DialogDescription>
                  Set a target and track your progress towards your financial goals.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Vacation Fund"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                    <Input
                      id="targetAmount"
                      name="targetAmount"
                      type="number"
                      placeholder="50000"
                      required
                      value={formData.targetAmount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentAmount">Current Amount (₹)</Label>
                    <Input
                      id="currentAmount"
                      name="currentAmount"
                      type="number"
                      placeholder="0"
                      value={formData.currentAmount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetDate">Target Date</Label>
                  <Input
                    id="targetDate"
                    name="targetDate"
                    type="date"
                    required
                    value={formData.targetDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="emergency">Emergency Fund</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="gadgets">Gadgets</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Goal"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center">
              <p>You don't have any savings goals yet. Create your first goal to get started!</p>
            </CardContent>
          </Card>
        ) : (
          goals.map((goal) => {
            // Calculate progress percentage
            const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100)

            return (
              <Card key={goal._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{goal.name}</CardTitle>
                    <div className="rounded-full bg-primary/10 p-1">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4">
                    <Progress value={progress} className="h-2" />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>₹{goal.currentAmount.toLocaleString()}</span>
                      <span>₹{goal.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target Date</p>
                      <p className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Progress</p>
                      <p className="font-medium">{progress}%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Update Progress
                  </Button>
                </CardFooter>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

