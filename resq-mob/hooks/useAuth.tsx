// hooks/useAuth.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserRole = "admin" | "bfp" | null;
type ManagedRole = "admin" | "bfp";

interface RoleCredentials {
  email: string;
  password: string;
}

type CredentialsMap = Record<ManagedRole, RoleCredentials>;

const DEFAULT_CREDENTIALS: CredentialsMap = {
  admin: {
    email: "admin@gmail.com",
    password: "admin123",
  },
  bfp: {
    email: "bfp@gmail.com",
    password: "bfp123",
  },
};

interface AuthContextProps {
  userRole: UserRole;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  credentials: CredentialsMap;
  updateCredentials: (params: {
    role: ManagedRole;
    currentPassword: string;
    newEmail?: string;
    newPassword?: string;
  }) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextProps>({
  userRole: null,
  login: () => false,
  logout: () => {},
  credentials: DEFAULT_CREDENTIALS,
  updateCredentials: () => ({ success: false, message: "Auth context unavailable" }),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [credentials, setCredentials] = useState<CredentialsMap>(DEFAULT_CREDENTIALS);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const raw = await AsyncStorage.getItem("resq:auth:credentials");
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw) as Partial<CredentialsMap>;
        setCredentials((prev) => ({
          admin: {
            email: parsed.admin?.email || prev.admin.email,
            password: parsed.admin?.password || prev.admin.password,
          },
          bfp: {
            email: parsed.bfp?.email || prev.bfp.email,
            password: parsed.bfp?.password || prev.bfp.password,
          },
        }));
      } catch {
        // Ignore malformed credential cache and keep defaults.
      }
    };

    void loadCredentials();
  }, []);

  const persistCredentials = async (next: CredentialsMap) => {
    try {
      await AsyncStorage.setItem("resq:auth:credentials", JSON.stringify(next));
    } catch {
      // Keep session state even if persistence fails.
    }
  };

  const login = (email: string, password: string) => {
    if (email === credentials.admin.email && password === credentials.admin.password) {
      setUserRole("admin");
      return true;
    } else if (email === credentials.bfp.email && password === credentials.bfp.password) {
      setUserRole("bfp");
      return true;
    }
    return false; // invalid credentials
  };

  const logout = () => {
    setUserRole(null);
  };

  const updateCredentials: AuthContextProps["updateCredentials"] = ({
    role,
    currentPassword,
    newEmail,
    newPassword,
  }) => {
    const current = credentials[role];
    if (current.password !== currentPassword) {
      return { success: false, message: "Current password is incorrect." };
    }

    const next: CredentialsMap = {
      ...credentials,
      [role]: {
        email: (newEmail || current.email).trim(),
        password: (newPassword || current.password).trim(),
      },
    };

    setCredentials(next);
    void persistCredentials(next);
    return { success: true, message: "Credentials updated." };
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout, credentials, updateCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);