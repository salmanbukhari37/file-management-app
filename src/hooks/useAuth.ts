import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface UseAuthReturn {
  isAuthenticated: boolean;
  logout: () => void;
  login?: (username: string, password: string) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  // Set initial state based on the presence of the token
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("token");
    return !!token; // Initialize as true if token exists, false otherwise
  });

  const navigate = useNavigate();

  // Check authentication status based on the presence of the token
  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return { isAuthenticated, logout };
};
