import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-grow">
        <Sidebar />
        <div className="flex-grow overflow-y-auto p-4 bg-zinc-100 dark:bg-zinc-950 dark:text-white transition-colors">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
