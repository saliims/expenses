import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useExpenses, useDeleteExpense } from "./useExpense";
import AddExpenseForm from "./AddExpense";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

export default function ExpenseList() {
  const [searchParams] = useSearchParams();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const params = {
    skip: searchParams.get("skip") || 0,
    limit: searchParams.get("limit") || 100,
    type: searchParams.get("type") || "",
    currency: searchParams.get("currency") || "",
    sort_by_amount: searchParams.get("amount") || "asc",
  };

  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;

  const { data, error, isLoading } = useExpenses(params);
  const { mutate: deleteExpense } = useDeleteExpense();

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setIsFormOpen(true);
  };

  const handleDelete = (expenseId) => {
    setIsDeleteConfirmOpen(true);
    setSelectedExpense({ id: expenseId });
  };

  const confirmDelete = () => {
    deleteExpense(selectedExpense.id);
    setIsDeleteConfirmOpen(false);
  };

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
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
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="inline-flex justify-center w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500">
                    <span className="sr-only">Open options</span>
                    &#x2022;&#x2022;&#x2022;
                  </MenuButton>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      className={`z-10 absolute ${
                        index === data.length - 1
                          ? "bottom-full mb-2"
                          : "top-full mt-2"
                      } right-0 w-56 rounded-md shadow-lg bg-zinc-50 dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    >
                      <MenuItems>
                        {({ active }) => (
                          <button
                            onClick={() => handleEdit(expense)}
                            className={`${
                              active
                                ? "bg-gray-100 dark:bg-gray-700"
                                : "text-gray-900 dark:text-gray-300"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Edit
                          </button>
                        )}
                      </MenuItems>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => handleDelete(expense.id)}
                            className={`${
                              active
                                ? "bg-gray-100 dark:bg-gray-700"
                                : "text-gray-900 dark:text-gray-300"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Delete
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Update Expense Form */}
      {isFormOpen && (
        <AddExpenseForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialValues={selectedExpense}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70">
          <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this expense?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="mr-4 px-4 py-2 bg-gray-300 dark:bg-gray-400 dark:text-white text-gray-950 rounded-md hover:bg-gray-500 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-800 dark:hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
