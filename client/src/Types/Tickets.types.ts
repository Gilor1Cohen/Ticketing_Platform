import type { RegisterOptions, UseFormRegister } from "react-hook-form";

type TicketType = "All" | "Sport" | "Music" | "Lecture" | "Comedy";

interface Ticket {
  _id: string;
  Price: number;
  Type: TicketType;
  Date: string;
  Title: string;
  OrderId?: string;
  Available?: boolean;
  LockedIn?: null | Date;
}

interface TicketsRes {
  data: Ticket[];
  numberOfPages: number;
}

interface TicketForm {
  _id?: string;
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
  value?: string;
}

interface TicketAddRes {
  message: string;
}

interface OrderDto {
  Items: Ticket[];
  CreatedAt: string;
}

export type {
  Ticket,
  TicketsRes,
  TicketForm,
  TicketsFormInputProps,
  TicketType,
  TicketAddRes,
  OrderDto,
};
