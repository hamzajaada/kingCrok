import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "./Login";

export const getStateFromStorage = (key) => {
  try {
    const storedState = localStorage.getItem(key);
    if (!storedState) {
      return null;
    }

    // Check if the token is expired
    // const currentTime = Date.now() / 1000; // Convert to seconds
    // if (storedState.exp && storedState.exp < currentTime) {
    //   localStorage.removeItem(key); // Remove expired token from local storage
    //   return null;
    // }

    return storedState;
  } catch (error) {
    console.error("Error parsing state from local storage:", error);
    return null;
  }
};

export default function RoutePrivate() {
  const token = getStateFromStorage("auth_token");

  // Uncomment this line to enable the redirect to login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

// <Outlet /> : displays the page content that the user has access to.
