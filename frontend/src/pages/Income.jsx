import React, { useState } from "react";
import IncomeList from "../features/incomes/IncomeList";
import IncomeTableOperations from "../features/incomes/IncomeTableOperations";
import AddIncome from "../features/incomes/AddIncome";

export default function Income() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <IncomeTableOperations />
      <IncomeList />
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
      >
        Add Income
      </button>

      <AddIncome isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
