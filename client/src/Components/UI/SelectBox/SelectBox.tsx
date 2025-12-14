import type { TicketType } from "../../../Types/Tickets.types";
import type { SelectBoxProps } from "../../../Types/UI.types";
import "./SelectBox.css";

function SelectBox({ setPage, setCategory }: SelectBoxProps) {
  const categories = ["Sport", "Music", "Lecture", "Comedy"];

  return (
    <select
      id="SelectBox"
      onChange={(e) => {
        if (setPage) setPage(1);
        setCategory(e.target.value as TicketType);
      }}
    >
      {setPage && <option value="All">All</option>}
      {categories.map((cat) => (
        <option className="SelectBox-option" key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
