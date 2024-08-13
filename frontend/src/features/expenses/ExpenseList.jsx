import React from "react";
import { useExpenses } from "./useExpense";

export default function ExpenseList() {
  const params = { skip: 0, limit: 100 };
  const { data, error, isLoading } = useExpenses(params);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading expenses.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-zinc-50 dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((expense, index) => (
            <tr
              key={expense.id}
              className={`${
                index % 2 === 0
                  ? "bg-zinc-100 dark:bg-zinc-700"
                  : "bg-zinc-50 dark:bg-zinc-800"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                {expense.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {expense.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {expense.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(expense.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
