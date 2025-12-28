import { createContext, useMemo, useState } from "react";
import type { CartContextType } from "../Types/Cart.types";
import type { Ticket } from "../Types/Tickets.types";

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Ticket[]>([]);

  function addToCart(item: Ticket): void {
    setCart((prevCart) =>
      prevCart.find((cartItem: Ticket) => cartItem._id === item._id)
        ? prevCart
        : [...prevCart, item]
    );
  }

  function removeFromCart(itemId: string): void {
    setCart((prevCart) =>
      prevCart.filter((item: Ticket) => item._id !== itemId)
    );
  }

  function addCart(cart: Ticket[]): void {
    setCart(cart);
  }

  function removeCart(): void {
    setCart([]);
  }

  const value = useMemo<CartContextType>(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      addCart,
      removeCart,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext };
