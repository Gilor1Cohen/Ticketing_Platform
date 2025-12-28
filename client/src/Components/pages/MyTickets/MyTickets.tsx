import { useContext, useEffect, useState } from "react";
import "./MyTickets.css";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { OrderDto, Ticket } from "../../../Types/Tickets.types";
import TicketCard from "../../UI/TicketCard/TicketCard";

function MyTicketsPage() {
  const [isOrders, setIsOrders] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketsData, setTicketsData] = useState<Ticket[] | null>(null);
  const [ordersData, setOrdersData] = useState<OrderDto[] | null>(null);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.auth.AuthState) {
      navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setError(null);

        const endpoint = isOrders
          ? "http://localhost:3003/GetMyOrders"
          : " http://localhost:3002/GetMyTickets";

        const getData = await axios.get(endpoint, { withCredentials: true });

        if (getData.status === 200 && isOrders) {
          setOrdersData(getData.data);
          setLoading(false);
        }

        if (getData.status === 200 && !isOrders) {
          setTicketsData(getData.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          if (auth) auth.logout();
          navigate("/login");
          return;
        }

        setError("An error occurred while fetching data.");
      }
    }

    getData();
  }, [isOrders]);

  return (
    <div id="MyTicketsPage">
      <h1>My Tickets</h1>
      <label htmlFor="filter" className="switch" aria-label="Toggle Filter">
        <input
          type="checkbox"
          id="filter"
          checked={isOrders}
          onChange={() => setIsOrders((prev) => !prev)}
        />
        <span>My tickets</span>
        <span>My orders</span>
      </label>

      <div className="dataDiv">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && ordersData && isOrders && (
          <>
            {ordersData.map((order: OrderDto, index: number) => (
              <div className="OrderDiv" key={index}>
                <p>
                  Created At <span />
                  {new Date(order.CreatedAt).toLocaleString("he-IL", {
                    timeZone: "Asia/Jerusalem",
                    dateStyle: "short",
                    timeStyle: "medium",
                  })}
                </p>
                {order.Items.map((ticket: Ticket) => (
                  <TicketCard
                    key={ticket._id}
                    Ticket={ticket}
                    Auth={false}
                    isCart={false}
                  />
                ))}
              </div>
            ))}
          </>
        )}
        {!loading && !error && ticketsData && !isOrders && (
          <>
            {ticketsData.map((ticket: Ticket) => (
              <TicketCard
                key={ticket._id}
                Ticket={ticket}
                Auth={false}
                isCart={false}
                MyTicket={true}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default MyTicketsPage;
