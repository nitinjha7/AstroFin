"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

const CATEGORIES = [
  { value: "food", label: "Food & Dining", color: "#ef4444" },
  { value: "transportation", label: "Transportation", color: "#f97316" },
  { value: "utilities", label: "Utilities", color: "#3b82f6" },
  { value: "entertainment", label: "Entertainment", color: "#8b5cf6" },
  { value: "shopping", label: "Shopping", color: "#ec4899" },
  { value: "housing", label: "Housing", color: "#10b981" },
  { value: "healthcare", label: "Healthcare", color: "#06b6d4" },
  { value: "education", label: "Education", color: "#6366f1" },
  { value: "personal", label: "Personal Care", color: "#f59e0b" },
  { value: "travel", label: "Travel", color: "#84cc16" },
  { value: "other", label: "Other", color: "#64748b" }
]

export function SpendingTrends() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spending-trends?period=weekly')
        const result = await response.json()
        
        // Transform transactions into weekly aggregated data
        const weeklyData = result.transactions.reduce((acc: any, tx: any) => {
          const week = new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          if (!acc[week]) {
            acc[week] = {
              name: week,
              ...Object.fromEntries(CATEGORIES.map(cat => [cat.value, 0]))
            }
          }
          const category = tx.category.toLowerCase()
          if (acc[week][category] !== undefined) {
            acc[week][category] += tx.amount
          }
          return acc
        }, {})

        setData(Object.values(weeklyData))
      } catch (error) {
        console.error('Failed to fetch spending trends:', error)
      }
    }

    fetchData()
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border text-xs">
          <p className="font-bold mb-1 text-sm">{label}</p>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {payload.map((entry: any) => (
              entry.value != 0 && (
                <div key={entry.dataKey} className="flex items-center">

                  <div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span>
                    {CATEGORIES.find(c => c.value === entry.dataKey)?.label}: 
                    <strong> ₹{entry.value.toLocaleString("en-IN")} </strong>
                  </span>
                </div>
              )
            ))}
          </div>

        </div>
      )
    }
    return null
  }
  

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />

        <Legend 
          layout="horizontal"
          verticalAlign="bottom"
          wrapperStyle={{ fontSize: '11px' }}
        />

        {CATEGORIES.map((category) => (
          <Line
            key={category.value}
            type="monotone"
            dataKey={category.value}
            stroke={category.color}
            name={category.label}
            strokeWidth={1.5}
            dot={{ r: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}


