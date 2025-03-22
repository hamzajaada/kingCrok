import { Navigate, Outlet } from "react-router-dom";

export const getStateFromStorage = (key) => {
  try {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error("Error parsing state from local storage:", error);
    return null;
  }
};

export default function RoutePrivate() {
  const token = getStateFromStorage("token");
  // const token = localStorage.getItem("token");
  // const token = sessionStorage.getItem("token");

  // Uncomment this line to enable the redirect to login page
  // return token ? <Outlet /> : <Navigate to="/login" replace />;

  return <Outlet />; // For testing purposes, always allow access to the outlet
}

// <Outlet /> : displays the page content that the user has access to.
