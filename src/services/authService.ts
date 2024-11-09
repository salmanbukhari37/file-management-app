import axios from "axios";

// Interface for user credentials
interface Credentials {
  username: string;
  password: string;
}

// Register a new user
export const register = async (credentials: Credentials): Promise<any> => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/register`,
    credentials
  );
  return response;
};

// Log in an existing user and save the token to localStorage
export const login = async (credentials: Credentials): Promise<any> => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    credentials
  );
  localStorage.setItem("token", response.data._token); // Save the JWT token to localStorage
  return response;
};

// Log out the user and remove the token from localStorage
export const logout = (): void => {
  localStorage.removeItem("token");
};

// Check if the user is authenticated by verifying the token
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};
