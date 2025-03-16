"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"

const marketData = [
  {
    id: 1,
    name: "Nifty 50",
    currentValue: 19250.75,
    change: 1.2,
    trend: "up",
    data: [
      { date: "Aug 1", value: 19000 },
      { date: "Aug 2", value: 19050 },
      { date: "Aug 3", value: 19100 },
      { date: "Aug 4", value: 19080 },
      { date: "Aug 5", value: 19150 },
      { date: "Aug 6", value: 19200 },
      { date: "Aug 7", value: 19250 },
    ],
  },
  {
    id: 2,
    name: "Sensex",
    currentValue: 64325.5,
    change: 0.8,
    trend: "up",
    data: [
      { date: "Aug 1", value: 63800 },
      { date: "Aug 2", value: 63900 },
      { date: "Aug 3", value: 64000 },
      { date: "Aug 4", value: 63950 },
      { date: "Aug 5", value: 64100 },
      { date: "Aug 6", value: 64200 },
      { date: "Aug 7", value: 64325 },
    ],
  },
  {
    id: 3,
    name: "Bank Nifty",
    currentValue: 43750.25,
    change: -0.5,
    trend: "down",
    data: [
      { date: "Aug 1", value: 44000 },
      { date: "Aug 2", value: 43900 },
      { date: "Aug 3", value: 43850 },
      { date: "Aug 4", value: 43800 },
      { date: "Aug 5", value: 43700 },
      { date: "Aug 6", value: 43650 },
      { date: "Aug 7", value: 43750 },
    ],
  },
  {
    id: 4,
    name: "Gold",
    currentValue: 5825.75,
    change: 2.1,
    trend: "up",
    data: [
      { date: "Aug 1", value: 5700 },
      { date: "Aug 2", value: 5720 },
      { date: "Aug 3", value: 5750 },
      { date: "Aug 4", value: 5780 },
      { date: "Aug 5", value: 5800 },
      { date: "Aug 6", value: 5810 },
      { date: "Aug 7", value: 5825 },
    ],
  },
]

export function MarketTrends({ detailed = false }) {
  if (!detailed) {
    return (
      <div className="space-y-4">
        {marketData.map((market) => (
          <div key={market.id} className="flex items-center gap-4">
            <div className={`rounded-full p-2 ${market.trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
              {market.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{market.name}</p>
                <div className="flex items-center">
                  <p className="text-sm font-medium">{market.currentValue.toLocaleString()}</p>
                  <div
                    className={`ml-2 flex items-center ${market.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {market.trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    <span className="text-xs">{market.change}%</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={40}>
                <LineChart data={market.data}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={market.trend === "up" ? "#22c55e" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {marketData.map((market) => (
        <Card key={market.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`rounded-full p-2 ${market.trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
                  {market.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <h4 className="text-sm font-medium">{market.name}</h4>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium">{market.currentValue.toLocaleString()}</p>
                <div className={`ml-2 flex items-center ${market.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {market.trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span className="text-xs">{market.change}%</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={market.data}>
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={market.trend === "up" ? "#22c55e" : "#ef4444"}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

