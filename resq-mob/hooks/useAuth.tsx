// hooks/useAuth.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiError, fetchProfile, loginWithEmail, type UserProfile } from "../services/api";

type UserRole = "admin" | "bfp" | null;

const AUTH_SESSION_STORAGE_KEY = "resq:auth:session";

interface StoredAuthSession {
  token: string;
  profile: UserProfile;
}

interface LoginResult {
  success: boolean;
  message: string;
}

interface AuthContextProps {
  isLoading: boolean;
  userRole: UserRole;
  token: string | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoading: true,
  userRole: null,
  token: null,
  profile: null,
  login: async () => ({ success: false, message: "Auth context unavailable" }),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const hydrateSession = async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_SESSION_STORAGE_KEY);
        if (!raw) {
          setIsLoading(false);
          return;
        }

        const parsed = JSON.parse(raw) as StoredAuthSession;
        const latestProfile = await fetchProfile(parsed.token);

        setToken(parsed.token);
        setProfile(latestProfile);
        setUserRole(latestProfile.role);
      } catch {
        await AsyncStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
        setToken(null);
        setProfile(null);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    void hydrateSession();
  }, []);

  const persistSession = async (nextSession: StoredAuthSession) => {
    try {
      await AsyncStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(nextSession));
    } catch {
      // Keep active session in memory even if persistence fails.
    }
  };

  const login: AuthContextProps["login"] = async (email: string, password: string) => {
    try {
      const response = await loginWithEmail({ email: email.trim(), password });
      const session: StoredAuthSession = {
        token: response.token,
        profile: response.user,
      };

      setToken(response.token);
      setProfile(response.user);
      setUserRole(response.user.role);
      await persistSession(session);

      return { success: true, message: response.message || "Login successful." };
    } catch (error) {
      if (error instanceof ApiError) {
        return { success: false, message: error.message };
      }
      return { success: false, message: "Unable to connect to the server." };
    }
  };

  const logout = () => {
    void AsyncStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    setToken(null);
    setProfile(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoading, userRole, token, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);