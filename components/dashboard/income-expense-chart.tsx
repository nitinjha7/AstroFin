"use client";
import { ITransaction } from "@/models/transaction";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface IMonthData {
  name: string;
  income: number;
  expenses: number;
}
interface IGroupedDataByMonth {
  [key: string]: IMonthData;
}
export function IncomeExpenseChart() {
  const [chartData, setChartData] = useState<IMonthData[]>([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  async function fetchChartData() {
    const response = await fetch("/api/transactions");
    const data = await response.json();

    // Process transactions into a format suitable for recharts
    const groupedData: IGroupedDataByMonth = {};
    data.transactions.forEach((transaction: ITransaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "short",
      });
      if (!groupedData[month])
        groupedData[month] = { name: month, income: 0, expenses: 0 };
      if (transaction.type === "income")
        groupedData[month].income += transaction.amount;
      else groupedData[month].expenses += Math.abs(transaction.amount);
    });

    let tempGroupedData: IMonthData[] = [];

    for (let key in groupedData) {
      tempGroupedData.push(groupedData[key]);
    }
    setChartData(tempGroupedData);
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#4f46e5"
          fill="#4f46e5"
          fillOpacity={0.2}
          name="Income"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.2}
          name="Expenses"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
