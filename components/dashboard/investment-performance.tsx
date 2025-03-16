"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, ArrowUp } from "lucide-react"

const investments = [
  {
    id: 1,
    name: "HDFC Equity Fund",
    type: "Mutual Fund",
    investedAmount: 50000,
    currentValue: 58500,
    returns: 17,
    trend: "up",
  },
  {
    id: 2,
    name: "ICICI Prudential Value Discovery Fund",
    type: "Mutual Fund",
    investedAmount: 40000,
    currentValue: 45200,
    returns: 13,
    trend: "up",
  },
  {
    id: 3,
    name: "Reliance Industries Ltd.",
    type: "Stock",
    investedAmount: 30000,
    currentValue: 34500,
    returns: 15,
    trend: "up",
  },
  {
    id: 4,
    name: "Infosys Ltd.",
    type: "Stock",
    investedAmount: 25000,
    currentValue: 23750,
    returns: -5,
    trend: "down",
  },
  {
    id: 5,
    name: "SBI Fixed Deposit",
    type: "Fixed Deposit",
    investedAmount: 100000,
    currentValue: 105500,
    returns: 5.5,
    trend: "up",
  },
]

export function InvestmentPerformance() {
  return (
    <div className="space-y-4">
      {investments.map((investment) => (
        <Card key={investment.id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{investment.name}</h4>
                    <p className="text-xs text-muted-foreground">{investment.type}</p>
                  </div>
                  <div className={`flex items-center ${investment.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {investment.trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">{investment.returns}%</span>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Invested</p>
                    <p className="font-medium">₹{investment.investedAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Value</p>
                    <p className="font-medium">₹{investment.currentValue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <Progress
                    value={investment.returns > 0 ? investment.returns * 2 : 0}
                    className="h-1.5"
                    style={
                      {
                        "--progress-background": investment.trend === "up" ? "#dcfce7" : "#fee2e2",
                        "--progress-foreground": investment.trend === "up" ? "#22c55e" : "#ef4444",
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

