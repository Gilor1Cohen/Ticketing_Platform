import type { BtnProps } from "../../../../Types/UI.types";
import "./BtnTwo.Style.css";

function BtnTwo({ Text, Type, Disabled, OnClick }: BtnProps) {
  return (
    <button
      className="BtnTwo"
      type={Type}
      disabled={Disabled}
      onClick={OnClick}
    >
      {Text}
    </button>
  );
}

export default BtnTwo;
