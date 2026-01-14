import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import type { CurrentUserRes } from "./Types/Auth.types";
import Nav from "./Components/UI/Nav/Nav";
import axios from "axios";
import Routing from "./Routing/Routing";
import { AuthContext } from "./Context/AuthContext";
import { CartContext } from "./Context/CartContext";
import type { Ticket } from "./Types/Tickets.types";
import "./App.css";

function App() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  useEffect(() => {
    async function checkAuth() {
      try {
        const check = await axios.get<CurrentUserRes>(
          "http://localhost:3001/current-user",
          {
            withCredentials: true,
          }
        );

        if (check.status === 200) {
          auth ? auth.login(check.data.currentUser.UserId) : null;
        }
      } catch (error) {
        auth ? auth.logout : null;
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    async function checkCart() {
      try {
        const check = await axios.get<{ cart: Ticket[] }>(
          "http://localhost:3004/GetCart",
          {
            withCredentials: true,
          }
        );

        if (check.status === 200) {
          cart?.addCart(check.data.cart);
        }

        if (check.status === 401) {
          auth?.logout();
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 401) {
          auth?.logout();
        }
      }
    }
    if (auth?.auth.AuthState) checkCart();
  }, [auth]);

  return (
    <BrowserRouter>
      <Nav
        isAuth={auth ? auth.auth.AuthState : null}
        logout={auth ? auth.logout : null}
      />
      <Routing />;
    </BrowserRouter>
  );
}

export default App;
