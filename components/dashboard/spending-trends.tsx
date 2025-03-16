"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Week 1",
    food: 1200,
    transportation: 800,
    utilities: 300,
    entertainment: 400,
    shopping: 600,
  },
  {
    name: "Week 2",
    food: 1500,
    transportation: 700,
    utilities: 200,
    entertainment: 600,
    shopping: 800,
  },
  {
    name: "Week 3",
    food: 1300,
    transportation: 900,
    utilities: 400,
    entertainment: 500,
    shopping: 700,
  },
  {
    name: "Week 4",
    food: 1400,
    transportation: 850,
    utilities: 350,
    entertainment: 450,
    shopping: 900,
  },
]

export function SpendingTrends() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`₹${value}`, ""]} />
        <Legend />
        <Line type="monotone" dataKey="food" stroke="#ef4444" name="Food & Dining" />
        <Line type="monotone" dataKey="transportation" stroke="#f97316" name="Transportation" />
        <Line type="monotone" dataKey="utilities" stroke="#3b82f6" name="Utilities" />
        <Line type="monotone" dataKey="entertainment" stroke="#8b5cf6" name="Entertainment" />
        <Line type="monotone" dataKey="shopping" stroke="#ec4899" name="Shopping" />
      </LineChart>
    </ResponsiveContainer>
  )
}

