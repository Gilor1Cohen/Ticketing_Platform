import type { TicketCardProps } from "../../../Types/UI.types";
import BtnOne from "../Btns/BtnOne/BtnOne";
import "./TicketCard.css";

function TicketCard({ Ticket, Auth }: TicketCardProps) {
  const date = new Date(Ticket.Date);

  return (
    <div className="ticket-card">
      <h3>{Ticket.Title}</h3>
      <p>Category: {Ticket.Type}</p>
      <p>
        Date:
        {date.toLocaleString()}
      </p>
      <p>Price: ${Ticket.Price}</p>
      <BtnOne
        Text={Auth ? "Buy Now" : "Login Or SignUp to buy"}
        Type="button"
        Disabled={!Auth}
        OnClick={() => {
          console.log("hey");
        }}
      />
    </div>
  );
}

export default TicketCard;
