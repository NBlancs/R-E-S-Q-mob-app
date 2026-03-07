// hooks/useAuth.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "admin" | "bfp" | null;

interface AuthContextProps {
  userRole: UserRole;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  userRole: null,
  login: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const login = (email: string, password: string) => {
    // Hard-coded credentials
    if (email === "admin@gmail.com" && password === "admin123") {
      setUserRole("admin");
      return true;
    } else if (email === "bfp@gmail.com" && password === "bfp123") {
      setUserRole("bfp");
      return true;
    }
    return false; // invalid credentials
  };

  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);