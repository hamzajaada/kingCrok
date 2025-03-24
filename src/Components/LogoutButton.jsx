import { useState } from "react";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// ...existing imports...

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth token
    localStorage.removeItem("auth_token");
    // Redirect to home page
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white font-semibold "
    >
      <div className="flex items-center gap-3">
        <h3 className="">Déconnexion</h3>
        <LockOpenIcon className="h-6 w-6" />
      </div>
    </button>
  );
};

export default LogoutButton;
