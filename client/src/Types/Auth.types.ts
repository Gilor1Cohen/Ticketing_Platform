import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface AuthContextType {
  auth: AuthProviderUseState;
  login: (userId: string) => void;
  logout: () => void;
}

interface AuthProviderUseState {
  AuthState: boolean;
  UserId: string | null;
}

interface AuthFormType {
  UserName: string;
  Email: string;
  Password: string;
}

interface AuthFormInputProps {
  formType: "Auth";
  type: string;
  placeholder: string;
  register: UseFormRegister<AuthFormType>;
  name: keyof AuthFormType;
  options: RegisterOptions<AuthFormType, keyof AuthFormType>;
  errors?: string;
  value?: string;
}

interface AuthRes {
  UserId: string;
}

interface CurrentUser {
  UserId: string;
  iat: number;
  exp: number;
}

interface CurrentUserRes {
  currentUser: CurrentUser;
}

interface signoutRes {
  message: string;
}

export type {
  AuthContextType,
  AuthFormType,
  AuthRes,
  CurrentUserRes,
  signoutRes,
  AuthFormInputProps,
  AuthProviderUseState,
};
