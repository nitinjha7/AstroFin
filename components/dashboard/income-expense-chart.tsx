"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    income: 8000,
    expenses: 5500,
  },
  {
    name: "Feb",
    income: 8200,
    expenses: 6000,
  },
  {
    name: "Mar",
    income: 9000,
    expenses: 6500,
  },
  {
    name: "Apr",
    income: 8700,
    expenses: 5800,
  },
  {
    name: "May",
    income: 9500,
    expenses: 7000,
  },
  {
    name: "Jun",
    income: 10000,
    expenses: 7500,
  },
]

export function IncomeExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`₹${value}`, ""]} />
        <Legend />
        <Area type="monotone" dataKey="income" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} name="Income" />
        <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} name="Expenses" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

