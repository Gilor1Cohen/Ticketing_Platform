import type { AuthFormInputProps } from "./Auth.types";
import type React from "react";
import type {
  Ticket,
  TicketsFormInputProps,
  TicketType,
} from "./Tickets.types";

interface NavProps {
  isAuth: boolean | null;
  logout: (() => void) | null;
}

interface BtnProps {
  Text: string;
  Type: "button" | "submit" | "reset";
  Disabled: boolean;
  OnClick?: () => void;
}

interface FormInputOptions {
  required: string;
  minLength?: { value: number | string; message: string };
  maxLength?: { value: number | string; message: string };
  pattern?: { value: RegExp; message: string };
}

type FormInputProps = AuthFormInputProps | TicketsFormInputProps;

interface TicketCardProps {
  Ticket: Ticket;
  Auth: boolean;
  isCart: boolean;
  MyTicket?: boolean;
}

interface SelectBoxProps {
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<TicketType>>;
}

export type {
  NavProps,
  BtnProps,
  FormInputProps,
  TicketCardProps,
  FormInputOptions,
  SelectBoxProps,
};
