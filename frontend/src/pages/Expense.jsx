import ExpenseList from "../features/expenses/ExpenseList";
import ExpenseTableOperations from "../features/expenses/ExpenseTableOperations";
import { useState } from "react";
import AddExpense from "../features/expenses/AddExpense";

export default function Expense() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <ExpenseTableOperations />
      <ExpenseList />
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
      >
        Add Expense
      </button>

      <AddExpense isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
