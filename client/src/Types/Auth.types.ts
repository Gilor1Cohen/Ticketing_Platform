import type React from "react";

interface AuthContextType {
  AuthState: boolean;
  UserId: string | null;
}

interface AuthFormType {
  UserName: string;
  Email: string;
  Password: string;
}

interface AuthPageProps {
  setAuth: React.Dispatch<React.SetStateAction<AuthContextType>>;
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
  AuthPageProps,
  AuthRes,
  CurrentUserRes,
  signoutRes,
};
