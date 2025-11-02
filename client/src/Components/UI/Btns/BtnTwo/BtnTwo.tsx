import type { BtnProps } from "../../../../Types/UI.types";
import "./BtnTwo.Style.css";

function BtnTwo({ Text }: BtnProps) {
  return <button id="BtnTwo">{Text}</button>;
}

export default BtnTwo;
