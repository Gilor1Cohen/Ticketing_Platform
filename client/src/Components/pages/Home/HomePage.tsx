import { useContext, useEffect, useState } from "react";
import axios from "axios";
import type {
  Ticket,
  TicketsRes,
  TicketType,
} from "../../../Types/Tickets.types";
import TicketCard from "../../UI/TicketCard/TicketCard";
import SelectBox from "../../UI/SelectBox/SelectBox";
import { AuthContext } from "../../../Context/AuthContext";
import "./HomePage.style.css";

function HomePage() {
  const [page, setPage] = useState<number>(1);
  const [pagesInTotal, setPagesInTotal] = useState<number>(1);
  const [category, setCategory] = useState<TicketType>("All");

  const [data, setData] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const Auth = useContext(AuthContext);

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        setLoading(true);
        const res = await axios.get<TicketsRes>(
          "http://localhost:3002/GetTickets",
          {
            params: { page, category },
          }
        );

        setPagesInTotal(res.data.numberOfPages);
        setData(res.data.data);

        setLoading(false);
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    }

    getData();
  }, [page, category]);

  return (
    <section id="HomePage-section">
      <div className="btns">
        {page > 1 && (
          <button onClick={() => setPage((page) => page - 1)}>
            {page - 1}
          </button>
        )}
        <p id="p-page">{page}</p>
        {page < pagesInTotal && (
          <button onClick={() => setPage((page) => page + 1)}>
            {page + 1}
          </button>
        )}

        <SelectBox setPage={setPage} setCategory={setCategory} />
      </div>

      <div className="PageDiv">
        <div className="data">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && data.length === 0 && <p>No tickets found.</p>}
          {!loading &&
            !error &&
            data.map((ticket: Ticket) => {
              return (
                <TicketCard
                  Ticket={ticket}
                  Auth={Auth ? Auth.auth.AuthState : false}
                  key={ticket._id}
                  isCart={false}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
