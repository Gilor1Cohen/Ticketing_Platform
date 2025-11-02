import type { BtnProps } from "../../../../Types/UI.types";
import "./BtnOne.Style.css";

function BtnOne({ Text }: BtnProps) {
  return (
    <button id="BtnOne">
      {Text}
      <div className="arrow-wrapper">
        <div className="arrow" />
      </div>
    </button>
  );
}

export default BtnOne;
