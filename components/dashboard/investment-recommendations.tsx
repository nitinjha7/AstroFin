"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Wallet, TrendingUp, Landmark } from "lucide-react"

export function InvestmentRecommendations({ detailed = false }) {
  const recommendations = [
    {
      id: 1,
      name: "Mutual Funds",
      currentAllocation: 45,
      recommendedAllocation: 40,
      description: "Diversified equity mutual funds for long-term growth",
      icon: LineChart,
      color: "#4f46e5",
    },
    {
      id: 2,
      name: "Stocks",
      currentAllocation: 25,
      recommendedAllocation: 30,
      description: "Direct equity investments in blue-chip and growth stocks",
      icon: TrendingUp,
      color: "#22c55e",
    },
    {
      id: 3,
      name: "Fixed Deposits",
      currentAllocation: 20,
      recommendedAllocation: 20,
      description: "Stable returns with bank and corporate fixed deposits",
      icon: Landmark,
      color: "#eab308",
    },
    {
      id: 4,
      name: "Savings",
      currentAllocation: 10,
      recommendedAllocation: 10,
      description: "Emergency fund and short-term savings",
      icon: Wallet,
      color: "#8b5cf6",
    },
  ]

  if (!detailed) {
    return <ResponsiveInvestmentChart recommendations={recommendations} />
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-2" style={{ backgroundColor: `${recommendation.color}20` }}>
                <recommendation.icon className="h-4 w-4" style={{ color: recommendation.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{recommendation.name}</h4>
                  <span className="text-sm font-medium">{recommendation.recommendedAllocation}%</span>
                </div>
                <Progress
                  value={recommendation.recommendedAllocation}
                  className="h-2 mt-1"
                  style={
                    {
                      "--progress-background": `${recommendation.color}40`,
                      "--progress-foreground": recommendation.color,
                    } as React.CSSProperties
                  }
                />
                <p className="text-sm text-muted-foreground mt-2">{recommendation.description}</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-muted-foreground">Current allocation: {recommendation.currentAllocation}%</span>
                  {recommendation.currentAllocation !== recommendation.recommendedAllocation && (
                    <span className="ml-2 text-primary">
                      {recommendation.currentAllocation < recommendation.recommendedAllocation
                        ? "Increase"
                        : "Decrease"}{" "}
                      by {Math.abs(recommendation.currentAllocation - recommendation.recommendedAllocation)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ResponsiveInvestmentChart({ recommendations }) {
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <div key={recommendation.id} className="flex items-center gap-4">
          <div className="rounded-full p-2" style={{ backgroundColor: `${recommendation.color}20` }}>
            <recommendation.icon className="h-4 w-4" style={{ color: recommendation.color }} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{recommendation.name}</p>
              <p className="text-sm font-medium">{recommendation.recommendedAllocation}%</p>
            </div>
            <Progress
              value={recommendation.recommendedAllocation}
              className="h-2"
              style={
                {
                  "--progress-background": `${recommendation.color}40`,
                  "--progress-foreground": recommendation.color,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}

