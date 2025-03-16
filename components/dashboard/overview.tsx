"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    income: 8000,
    expenses: 5500,
    savings: 2500,
  },
  {
    name: "Feb",
    income: 8200,
    expenses: 6000,
    savings: 2200,
  },
  {
    name: "Mar",
    income: 9000,
    expenses: 6500,
    savings: 2500,
  },
  {
    name: "Apr",
    income: 8700,
    expenses: 5800,
    savings: 2900,
  },
  {
    name: "May",
    income: 9500,
    expenses: 7000,
    savings: 2500,
  },
  {
    name: "Jun",
    income: 10000,
    expenses: 7500,
    savings: 2500,
  },
  {
    name: "Jul",
    income: 10500,
    expenses: 7000,
    savings: 3500,
  },
  {
    name: "Aug",
    income: 11000,
    expenses: 7200,
    savings: 3800,
  },
  {
    name: "Sep",
    income: 10800,
    expenses: 7500,
    savings: 3300,
  },
  {
    name: "Oct",
    income: 11200,
    expenses: 8000,
    savings: 3200,
  },
  {
    name: "Nov",
    income: 12000,
    expenses: 8500,
    savings: 3500,
  },
  {
    name: "Dec",
    income: 12500,
    expenses: 9000,
    savings: 3500,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#4f46e5" name="Income" />
        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
        <Bar dataKey="savings" fill="#22c55e" name="Savings" />
      </BarChart>
    </ResponsiveContainer>
  )
}

