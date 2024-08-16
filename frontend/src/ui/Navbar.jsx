import React from "react";
import { NavLink } from "react-router-dom";
import { faMoon, faSun, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authReducer";
import { useNavigate } from "react-router-dom";
import {
  faRightToBracket,
  faMoneyBill,
  faEuroSign,
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
      <div className="hidden sm:block font-bold text-2xl text-blue-700 dark:text-blue-400">
        <NavLink
          to="/"
          className="hover:text-blue-900 dark:hover:text-blue-500"
        >
          JibTracker
        </NavLink>
      </div>

      <div className="flex items-center gap-6">
        {/* User Info */}
        {user && (
          <div className="flex items-center gap-4">
            <p className="hidden sm:block text-lg font-medium text-gray-900 dark:text-gray-200">
              {user.username}
            </p>

            {/* DZD Balance */}
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <FontAwesomeIcon icon={faMoneyBill} className="text-xl" />
              <span className="text-lg font-semibold">
                {formatCurrencyDZD(user.balance_dzd)}
              </span>
            </div>

            {/* EUR Balance */}
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <FontAwesomeIcon icon={faMoneyBill} className="text-xl" />
              <span className="text-lg font-semibold">
                {formatCurrencyEUR(user.balance_eur)}
              </span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          className="flex items-center gap-1 text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightToBracket} className="text-2xl" />
        </button>

        {/* Theme Toggle Button */}
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
