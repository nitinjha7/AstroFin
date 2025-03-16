"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Mutual Funds", value: 250000, color: "#4f46e5" },
  { name: "Stocks", value: 150000, color: "#22c55e" },
  { name: "Fixed Deposits", value: 100000, color: "#eab308" },
  { name: "Savings", value: 50000, color: "#8b5cf6" },
]

export function InvestmentAllocation() {
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

