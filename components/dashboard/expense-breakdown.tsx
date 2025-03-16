"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Food & Dining", value: 2500, color: "#ef4444" },
  { name: "Transportation", value: 1800, color: "#f97316" },
  { name: "Utilities", value: 1200, color: "#3b82f6" },
  { name: "Entertainment", value: 800, color: "#8b5cf6" },
  { name: "Shopping", value: 1500, color: "#ec4899" },
  { name: "Others", value: 1000, color: "#6b7280" },
]

export function ExpenseBreakdown() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

