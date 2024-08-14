import React from "react";
import IncomeList from "../features/incomes/IncomeList";
import IncomeTableOperations from "../features/incomes/IncomeTableOperations";

export default function Income() {
  return (
    <div>
      <IncomeTableOperations />
      <IncomeList />
    </div>
  );
}
