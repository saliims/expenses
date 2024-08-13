import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 border-t md:border-t-0 md:border-r border-gray-200 dark:border-gray-700 fixed bottom-0 left-0 right-0 md:static md:bottom-auto md:left-auto md:right-auto h-16 md:h-full w-full md:w-60 flex md:flex-col justify-around items-center p-4 dark:text-white transition-colors">
      <NavLink to="/" className="hover:text-blue-500 transition-colors">
        Home
      </NavLink>
      <NavLink to="/expenses" className="hover:text-blue-500 transition-colors">
        Expenses
      </NavLink>
      <NavLink to="/incomes" className="hover:text-blue-500 transition-colors">
        Incomes
      </NavLink>
    </nav>
  );
}
