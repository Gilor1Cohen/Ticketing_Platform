import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import type { Ticket } from "../../../Types/Tickets.types";
import TicketCard from "../../UI/TicketCard/TicketCard";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import BtnOne from "../../UI/Btns/BtnOne/BtnOne";
import axios from "axios";
import "./CartPage.css";

function CartPage() {
  const Cart = useContext(CartContext);
  const Auth = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Auth?.auth.AuthState) {
      navigate("/login");
    }
  }, [Auth]);

  async function OrderNow() {
    try {
      setLoading(true);
      setError(null);
      const order = await axios.post<any>(
        "http://localhost:3003/Order",
        { Cart },
        { withCredentials: true }
      );

      if (order.status === 200) {
        Cart?.removeCart();
        setLoading(false);
        navigate("/my");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response?.status === 401) {
          if (Auth) Auth.logout();
          navigate("/login");
          return;
        }

        setError(error.response.data.message);
      }
    }
  }

  return (
    <div id="CartPage">
      <h1 id="CartPage-h">Cart</h1>

      {Cart?.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div id="CartPage-info">
          {Cart?.cart.map((item: Ticket, index: number) => (
            <TicketCard Ticket={item} Auth={true} isCart={true} key={index} />
          ))}
        </div>
      )}

      {Auth?.auth.AuthState && Cart && Cart.cart.length > 0 && (
        <BtnOne
          Text={"ORDER NOW"}
          Type={"button"}
          Disabled={Cart?.cart.length === 0 || loading}
          OnClick={() => {
            OrderNow();
          }}
        />
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CartPage;
