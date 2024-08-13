import React from "react";
import ExpenseList from "../features/expenses/ExpenseList";
import ExpenseTableOperations from "../features/expenses/ExpenseTableOperations";

export default function Expense() {
  return (
    <div>
      <ExpenseTableOperations />
      <ExpenseList />
    </div>
  );
}
