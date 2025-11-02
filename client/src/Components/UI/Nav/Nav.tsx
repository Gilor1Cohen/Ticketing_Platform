import type { NavProps } from "../../../Types/UI.types";
import BtnOne from "../Btns/BtnOne/BtnOne";
import BtnTwo from "../Btns/BtnTwo/BtnTwo";
import "./Nav.Style.css";

function Nav({ isAuth }: NavProps) {
  return (
    <nav>
      <div className="nav-container">
        <h1 className="nav-logo">TICKETLY</h1>
        <ul id="nav-ul">
          <li className="nav-li">Sports</li>
          <li className="nav-li">Concerts</li>
          <li className="nav-li">Festivals</li>
        </ul>
      </div>

      <div className="nav-container">
        {isAuth ? <NavContainerAuth /> : <NavContainerUnauth />}
      </div>
    </nav>
  );
}

function NavContainerAuth() {
  return (
    <>
      <BtnTwo Text="My orders" />
      <BtnTwo Text="Cart" />
      <BtnOne Text="Sale a ticket" />
    </>
  );
}

function NavContainerUnauth() {
  return (
    <>
      <BtnTwo Text="Log In" />
      <BtnOne Text="Sign up" />
    </>
  );
}

export default Nav;
