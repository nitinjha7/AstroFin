"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseBreakdown } from "@/components/dashboard/expense-breakdown"
import { IncomeExpenseChart } from "@/components/dashboard/income-expense-chart"
import { SpendingTrends } from "@/components/dashboard/spending-trends"
import { SavingsSuggestions } from "@/components/dashboard/savings-suggestions"

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Compare your income and expenses over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <IncomeExpenseChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>See where your money is going</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ExpenseBreakdown />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>Track how your spending has changed over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <SpendingTrends />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Savings Suggestions</CardTitle>
              <CardDescription>Personalized recommendations to help you save more</CardDescription>
            </CardHeader>
            <CardContent>
              <SavingsSuggestions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Expense analysis content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your income sources</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Income analysis content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Savings Suggestions</CardTitle>
              <CardDescription>AI-powered recommendations to optimize your finances</CardDescription>
            </CardHeader>
            <CardContent>
              <SavingsSuggestions />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

