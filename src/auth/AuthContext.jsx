import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Update localStorage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    // Check if userData is an object and has the expected properties
    if (userData && userData.status === "success" && userData.username) {
      console.log(userData.username);
      setUser(userData); // Set the entire user object
    } else {
      return "error";
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
