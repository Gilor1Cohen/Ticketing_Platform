import type { UseFormRegister } from "react-hook-form";
import type { AuthContextType, AuthFormType } from "./Auth.types";
import type React from "react";

interface NavProps {
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<AuthContextType>>;
}

interface BtnProps {
  Text: string;
  Type: "button" | "submit" | "reset";
  Disabled: boolean;
}

interface FormInputOptions {
  required: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

interface FormInputProps {
  type: string;
  placeholder: string;
  register: UseFormRegister<AuthFormType>;
  name: "Email" | "Password" | "UserName";
  options: FormInputOptions;
  error?: string;
}

interface RoutingProps {
  auth: AuthContextType;
  setAuth: React.Dispatch<React.SetStateAction<AuthContextType>>;
}

export type { NavProps, BtnProps, FormInputProps, RoutingProps };
