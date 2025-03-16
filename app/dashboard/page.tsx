"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  LineChart,
  Target,
  Wallet,
} from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { SavingsGoals } from "@/components/dashboard/savings-goals";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    savings: 0,
    transactions: [],
  });

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      setDashboardData(data);
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/transactions/new">
            <CreditCard className="mr-2 h-4 w-4" />
            Add Transaction
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{dashboardData.totalBalance.toFixed(2)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income</CardTitle>
                <ArrowUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{dashboardData.totalIncome.toFixed(2)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <ArrowDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{dashboardData.totalExpenses.toFixed(2)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings</CardTitle>
                <Wallet className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{dashboardData.savings.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Your financial activity for the past 30 days.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview transactions={dashboardData.transactions} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentTransactions transactions={dashboardData.transactions} />
              </CardContent>
            </Card>
          </div>

          {/* New Div: Savings Goals & Investment Recommendations */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Savings Goals</CardTitle>
                <CardDescription>
                  Track your progress towards your financial goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SavingsGoals />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Investment Recommendations</CardTitle>
                <CardDescription>
                  Personalized investment suggestions based on your profile.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <LineChart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Mutual Funds</p>
                      <p className="text-xs text-muted-foreground">
                        Recommended allocation: 40%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <LineChart className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Stocks</p>
                      <p className="text-xs text-muted-foreground">
                        Recommended allocation: 30%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-yellow-100 p-2">
                      <Target className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Fixed Deposits</p>
                      <p className="text-xs text-muted-foreground">
                        Recommended allocation: 20%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Wallet className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Savings</p>
                      <p className="text-xs text-muted-foreground">
                        Recommended allocation: 10%
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/investments">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
