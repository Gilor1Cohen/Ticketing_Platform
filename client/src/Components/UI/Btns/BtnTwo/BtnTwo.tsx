import type { BtnProps } from "../../../../Types/UI.types";
import "./BtnTwo.Style.css";

function BtnTwo({ Text, Type, Disabled }: BtnProps) {
  return (
    <button type={Type} className="BtnTwo" disabled={Disabled}>
      {Text}
    </button>
  );
}

export default BtnTwo;
