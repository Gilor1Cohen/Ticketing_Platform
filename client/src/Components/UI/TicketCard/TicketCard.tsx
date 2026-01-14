import { useContext } from "react";
import type { TicketCardProps } from "../../../Types/UI.types";
import BtnOne from "../Btns/BtnOne/BtnOne";
import { CartContext } from "../../../Context/CartContext";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import type { Ticket } from "../../../Types/Tickets.types";
import BtnTwo from "../Btns/BtnTwo/BtnTwo";
import "./TicketCard.css";
import type { CartDataResponse } from "../../../Types/Cart.types";
import { useNavigate } from "react-router-dom";

function TicketCard({ Ticket, Auth, isCart, MyTicket }: TicketCardProps) {
  const date = new Date(Ticket.Date);
  const Cart = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  async function SaveCart(Ticket: Ticket) {
    try {
      const add = await axios.post<CartDataResponse>(
        "http://localhost:3004/SaveCart",
        { Ticket },
        { withCredentials: true }
      );

      if (add.status === 401) {
        authContext?.logout();
      }

      if (add.status === 409) {
        alert("Ticket already added to cart");
      }

      if (add.status === 200) {
        alert("Added to cart");
        Cart?.addCart(add.data.Data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 401) {
        authContext?.logout();
      }

      if (axios.isAxiosError(error) && error.status === 409) {
        alert("Ticket already added to cart");
      }
    }
  }

  async function removeFromCart(TicketId: string) {
    try {
      const remove = await axios.post<CartDataResponse>(
        "http://localhost:3004/RemoveFromCart",
        { TicketId },
        { withCredentials: true }
      );

      if (remove.status === 401) {
        authContext?.logout();
      }

      if (remove.status === 200) {
        Cart?.addCart(remove.data.Data);
        alert("Removed to cart");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 401) {
        authContext?.logout();
      }
    }
  }

  async function DeleteMyTicket(TicketId: string) {
    try {
      const deleteTicket = await axios.delete<string>(
        "http://localhost:3002/DeleteMyTicket",
        {
          withCredentials: true,
          params: { TicketId },
        }
      );

      if (deleteTicket.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 401) {
        authContext?.logout();
      }

      if (axios.isAxiosError(error) && error.status === 409) {
        alert("Ticket already added to cart");
      }
    }
  }

  return (
    <div className="ticket-card">
      <h3>{Ticket.Title}</h3>
      <p>Category: {Ticket.Type}</p>
      <p>
        Date:
        {date.toLocaleString()}
      </p>
      <p>Price: ${Ticket.Price}</p>
      {Auth && !isCart && (
        <BtnOne
          Text={Auth ? "Buy Now" : "Login Or SignUp to buy"}
          Type="button"
          Disabled={!Auth}
          OnClick={() => {
            Cart?.addToCart(Ticket);
            SaveCart(Ticket);
          }}
        />
      )}

      {Auth && isCart && (
        <BtnTwo
          Text={"Remove"}
          Type={"button"}
          Disabled={false}
          OnClick={() => {
            removeFromCart(Ticket._id);
          }}
        />
      )}

      {MyTicket && (
        <>
          <BtnTwo
            Text="DELETE"
            Type="button"
            Disabled={false}
            OnClick={() => {
              DeleteMyTicket(Ticket._id);
            }}
          />
          <span></span>
          <span></span>
          <BtnTwo
            Text="UPDATE"
            Type="button"
            Disabled={false}
            OnClick={() => {
              navigate(`/update`, { state: { Ticket } });
            }}
          />
        </>
      )}
    </div>
  );
}

export default TicketCard;
