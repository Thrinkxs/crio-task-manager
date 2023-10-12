import React from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 h-screen">
      <ul>
        <li className="mb-2">
          <Link
            to="/"
            className="block p-2 hover:bg-gray-600 rounded transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/dashboard"
            className="block p-2 hover:bg-gray-600 rounded transition-colors duration-300"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/users"
            className="block p-2 hover:bg-gray-600 rounded transition-colors duration-300"
          >
            Users
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/tasks"
            className="block p-2 hover:bg-gray-600 rounded transition-colors duration-300"
          >
            Tasks
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
