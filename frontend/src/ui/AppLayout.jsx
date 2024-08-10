import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <div className="bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 h-screen transition-colors">
      <Navbar />
      <Outlet />
    </div>
  );
}
