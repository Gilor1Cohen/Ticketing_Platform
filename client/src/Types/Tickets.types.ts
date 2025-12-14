import type { RegisterOptions, UseFormRegister } from "react-hook-form";

type TicketType = "All" | "Sport" | "Music" | "Lecture" | "Comedy";

interface Ticket {
  _id: string;
  Price: number;
  Type: TicketType;
  UserId: string;
  OrderId: string | null;
  Date: string;
  Title: string;
}

interface TicketsRes {
  data: Ticket[];
  numberOfPages: number;
}

interface TicketForm {
  Title: string;
  Price: number;
  Type?: TicketType;
  Date: string;
}

interface TicketsFormInputProps {
  formType: "Ticket";
  type: string;
  placeholder: string;
  register: UseFormRegister<TicketForm>;
  name: keyof TicketForm;
  options: RegisterOptions<TicketForm, keyof TicketForm>;
  errors?: string;
}

export type {
  Ticket,
  TicketsRes,
  TicketForm,
  TicketsFormInputProps,
  TicketType,
};
