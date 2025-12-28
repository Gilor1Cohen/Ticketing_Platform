import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { CartProvider } from "./Context/CartContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
