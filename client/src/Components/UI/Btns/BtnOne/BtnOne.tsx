import type { BtnProps } from "../../../../Types/UI.types";
import "./BtnOne.Style.css";

function BtnOne({ Text, Type, Disabled }: BtnProps) {
  return (
    <button type={Type} className="BtnOne" disabled={Disabled}>
      {Text}
      <div className="arrow-wrapper">
        <div className="arrow" />
      </div>
    </button>
  );
}

export default BtnOne;
