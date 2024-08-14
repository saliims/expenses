import React from "react";
import { useSearchParams } from "react-router-dom";
import { useIncomes } from "./useIncome";

export default function IncomeList() {
  const [searchParams] = useSearchParams();

  // Convert searchParams to a params object
  const params = {
    skip: searchParams.get("skip") || 0,
    limit: searchParams.get("limit") || 100,
    type: searchParams.get("type") || "",
    currency: searchParams.get("currency") || "",
    sort_by_amount: searchParams.get("amount") || "asc",
  };

  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  if (startDate) {
    params.start_date = startDate;
  }

  if (endDate) {
    params.end_date = endDate;
  }

  const { data, error, isLoading } = useIncomes(params);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading incomes.</p>;

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
          {data.map((income, index) => (
            <tr
              key={income.id}
              className={`${
                index % 2 === 0
                  ? "bg-zinc-100 dark:bg-zinc-700"
                  : "bg-zinc-50 dark:bg-zinc-800"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                {income.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {income.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {income.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(income.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
