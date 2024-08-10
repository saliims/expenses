import { Outlet } from "react-router-dom";
import React from "react";

export default function AppLayout() {
  return (
    <div className="bg-red-300 h-screen">
      <Outlet />
    </div>
  );
}
