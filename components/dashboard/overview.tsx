"use client";

import { ITransaction } from "@/models/transaction";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IChartData {
  name: string;
  income: number;
  expenses: number;
  savings: number;
}
export function Overview() {
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    async function fetchChartData() {
      const response = await fetch("/api/dashboard");
      const data = await response.json();

      // Group transactions by month
      const monthlyData: {
        [key: string]: { income: number; expenses: number; savings: number };
      } = {};
      data.transactions.forEach((transaction: ITransaction) => {
        const month = new Date(transaction.date).toLocaleString("default", {
          month: "short",
        });

        if (!monthlyData[month]) {
          monthlyData[month] = { income: 0, expenses: 0, savings: 0 };
        }

        if (transaction.type === "income") {
          monthlyData[month].income += transaction.amount;
        } else {
          monthlyData[month].expenses += Math.abs(transaction.amount);
        }

        monthlyData[month].savings = monthlyData[month].income * 0.1; // Example: 10% savings
      });

      // Convert to array format for chart
      const formattedData = Object.keys(monthlyData).map((month) => ({
        name: month,
        income: monthlyData[month].income,
        expenses: monthlyData[month].expenses,
        savings: monthlyData[month].savings,
      }));

      setChartData(formattedData);
    }

    fetchChartData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
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
  );
}
