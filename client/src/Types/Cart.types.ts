import type { Ticket } from "./Tickets.types";

interface CartContextType {
  cart: Ticket[];
  addToCart: (item: Ticket) => void;
  removeFromCart: (itemId: string) => void;
  addCart: (cart: Ticket[]) => void;
  removeCart: () => void;
}

interface CartDataResponse {
  Data: Ticket[];
}

export type { CartContextType, CartDataResponse };
