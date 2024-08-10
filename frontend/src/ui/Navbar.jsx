import { faMoon, faSun, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authReducer";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex py-2 px-4 items-center justify-between ">
      <div className="font-bold text-2xl text-violet-700 hover:text-violet-900 ease-in duration-300 dark:text-violet-400 hover:dark:text-violet-500">
        <NavLink to="/">iExpense</NavLink>
      </div>
      <div>
        <ul className="flex gap-20  text-perso-blue text-lg font-semibold ">
          <NavLink
            to="/"
            className="text-violet-700 hover:text-violet-900 dark:text-violet-400 hover:dark:text-violet-500 ease-in duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/expenses"
            className="text-violet-700 hover:text-violet-900 dark:text-violet-400 hover:dark:text-violet-500 ease-in duration-300"
          >
            Expenses
          </NavLink>
          <NavLink
            to="/incomes"
            className="text-violet-700 hover:text-violet-900 dark:text-violet-400 hover:dark:text-violet-500 ease-in duration-300"
          >
            Incomes
          </NavLink>
        </ul>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="text-violet-700 hover:text-violet-900 dark:text-violet-400 hover:dark:text-violet-500 ease-in duration-300"
        >
          {isDark ? (
            <FontAwesomeIcon
              icon={faSun}
              aria-hidden="true"
              className="text-xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              aria-hidden="true"
              className="text-xl"
            />
          )}
        </button>
        <button
          className="flex items-center justify-center gap-1 text-violet-700 hover:text-violet-900 dark:text-violet-400 hover:dark:text-violet-500 ease-in duration-300s"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faUser} className="text-xl" />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
}
