import { createContext, useMemo, useState } from "react";
import type {
  AuthContextType,
  AuthProviderUseState,
} from "../Types/Auth.types";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthProviderUseState>({
    AuthState: false,
    UserId: null,
  });

  function login(userId: string) {
    setAuth({ AuthState: true, UserId: userId });
  }

  function signout() {
    setAuth({ AuthState: false, UserId: null });
  }

  const value = useMemo<any>(
    () => ({
      auth,
      login,
      signout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
