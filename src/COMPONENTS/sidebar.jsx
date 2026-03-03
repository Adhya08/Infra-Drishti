import React from "react";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-6 font-bold text-xl border-b">
        InfraDrishti
      </div>

      <ul className="p-6 space-y-4">
        <li className="cursor-pointer hover:text-blue-600">Dashboard</li>

        <li className="cursor-pointer hover:text-blue-600">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
