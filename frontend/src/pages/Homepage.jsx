import React from "react";
import { useExpenses } from "../features/expenses/useExpense";
import { useIncomes } from "../features/incomes/useIncome";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Homepage() {
  const { data: expenses, isLoading, error } = useExpenses();
  const {
    data: incomes,
    isLoading: incomeLoading,
    error: incomeError,
  } = useIncomes();

  if (isLoading || incomeLoading) return <p>Loading...</p>;
  if (error || incomeError) return <p>Error loading data.</p>;

  // Process data for the bar chart (grouping by month)
  const expensesByMonth = expenses.reduce((acc, expense) => {
    const month = new Date(expense.created_at).toLocaleString("default", {
      month: "long",
    });
    if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
    acc[month].expenses += expense.amount;
    return acc;
  }, {});

  const incomesByMonth = incomes.reduce((acc, income) => {
    const month = new Date(income.created_at).toLocaleString("default", {
      month: "long",
    });
    if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
    acc[month].income += income.amount;
    return acc;
  }, expensesByMonth);

  const barChartData = Object.keys(incomesByMonth).map((month) => ({
    month,
    ...incomesByMonth[month],
  }));

  // Process data for the pie chart (grouping by expense type)
  const expensesByType = expenses.reduce((acc, expense) => {
    if (!acc[expense.type]) acc[expense.type] = 0;
    acc[expense.type] += expense.amount;
    return acc;
  }, {});

  const pieChartData = Object.keys(expensesByType).map((type) => ({
    name: type,
    value: expensesByType[type],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-2 sm:p-4">
        <h2 className="text-base sm:text-lg font-semibold mb-4 dark:text-gray-100">
          Expenses/Income by Month
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip contentStyle={{ fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expenses" fill="#f13d3d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-2 sm:p-4">
        <h2 className="text-base sm:text-lg font-semibold mb-4 dark:text-gray-100">
          Expense Distribution by Type
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
