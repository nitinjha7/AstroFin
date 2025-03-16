"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvestmentAllocation } from "@/components/dashboard/investment-allocation"
import { InvestmentRecommendations } from "@/components/dashboard/investment-recommendations"
import { MarketTrends } from "@/components/dashboard/market-trends"
import { InvestmentPerformance } from "@/components/dashboard/investment-performance"

export default function InvestmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Investments</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Allocation</CardTitle>
                <CardDescription>Your current investment portfolio allocation</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <InvestmentAllocation />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Allocation</CardTitle>
                <CardDescription>Personalized investment recommendations</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <InvestmentRecommendations />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>Latest market data and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <MarketTrends />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Recommendations</CardTitle>
              <CardDescription>Personalized investment suggestions based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentRecommendations detailed={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Analysis</CardTitle>
              <CardDescription>Current market trends and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketTrends detailed={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Performance</CardTitle>
              <CardDescription>Track the performance of your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentPerformance />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

