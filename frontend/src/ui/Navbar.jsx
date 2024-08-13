import React from "react";
import { NavLink } from "react-router-dom";
import { faMoon, faSun, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authReducer";
import { useNavigate } from "react-router-dom";
import {
  faPersonWalkingLuggage,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrencyDZD, formatCurrencyEUR } from "../utils/helpers";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const isDark = theme === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-zinc-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 flex justify-between items-center shadow">
      <div className="font-bold text-2xl text-blue-700 dark:text-blue-400">
        <NavLink
          to="/"
          className="hover:text-blue-900 dark:hover:text-blue-500"
        >
          iExpense
        </NavLink>
      </div>

      <div className="flex items-center gap-2">
        <p className="dark:text-white transition-colors">
          {user && (
            <p className="dark:text-white transition-colors">{user.username}</p>
          )}
        </p>

        <p className="dark:text-white transition-colors">
          {user && (
            <p className="dark:text-white transition-colors">
              {formatCurrencyDZD(user.balance_dzd)}
            </p>
          )}
        </p>
        <p className="dark:text-white transition-colors">
          {user && (
            <p className="dark:text-white transition-colors">
              {formatCurrencyEUR(user.balance_eur)}
            </p>
          )}
        </p>
        <button
          className="flex items-center gap-1 text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightToBracket} className="text-2xl" />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500"
        >
          {isDark ? (
            <FontAwesomeIcon
              icon={faSun}
              aria-hidden="true"
              className="text-2xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              aria-hidden="true"
              className="text-2xl"
            />
          )}
        </button>
      </div>
    </nav>
  );
}
