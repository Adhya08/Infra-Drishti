import React from "react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="flex justify-between items-center p-5 bg-white shadow-md">

      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="text-xl font-bold"
      >
        ☰
      </button>

      <h1 className="text-xl font-bold text-blue-600">
        InfraDrishti
      </h1>

      <ul className="flex gap-6 font-medium">
        <li>Home</li>
        <li>Features</li>
        <li>About</li>
      </ul>
    </nav>
  );
};

export default Navbar;
