"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

const categories = [
  { value: "food", label: "Food & Dining" },
  { value: "transportation", label: "Transportation" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "housing", label: "Housing" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "personal", label: "Personal Care" },
  { value: "travel", label: "Travel" },
  { value: "other", label: "Other" },
];

function BudgetDashboard() {
  const [budgets, setBudgets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"));

  useEffect(() => {
    fetchBudgets();
  }, [month]); // Fetch budgets when month changes

  async function fetchBudgets() {
    try {
      const response = await fetch(`/api/budgets?month=${month}`);
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  }

  async function setBudgetAmount() {
    if (!selectedCategory || !amount) {
      toast.error("Please select a category and set a budget amount!");
      return;
    }

    try {
      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month,
          category: selectedCategory,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Budget set successfully!");
        fetchBudgets();
        // Reset form fields
        setSelectedCategory("");
        setAmount("");
      } else {
        toast.error(data.error || "Failed to set budget.");
      }
    } catch (error) {
      console.error("Error setting budget:", error);
    }
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-bold">Budget Dashboard</h1>
      <h2 className="text-lg font-semibold">{format(new Date(month), "MMMM yyyy")}</h2>

      {/* Month Selector */}
      <div className="flex gap-2">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Budget Input Form */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-bold mb-2">Set Budget</h2>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
          />
          <Button onClick={setBudgetAmount} className="col-span-2">Set Budget</Button>
        </div>
      </div>

      {/* Display Budgets */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-bold mb-2">Budget Overview</h2>
        {budgets.length > 0 ? (
          <ul className="space-y-2">
            {budgets.map((budget, index) => (
              <li key={index} className="border p-2 rounded flex justify-between">
                <span className="font-medium">
                  {categories.find(c => c.value === budget.category)?.label || budget.category}
                </span>
                <span>₹{budget.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No budgets set for this month.</p>
        )}
      </div>
    </div>
  );
}

export default BudgetDashboard;