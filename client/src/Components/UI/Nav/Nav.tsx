import { Link, useNavigate } from "react-router-dom";
import type { NavProps } from "../../../Types/UI.types";
import BtnOne from "../Btns/BtnOne/BtnOne";
import BtnTwo from "../Btns/BtnTwo/BtnTwo";
import axios from "axios";
import type { signoutRes } from "../../../Types/Auth.types";
import "./Nav.Style.css";

function Nav({ isAuth, logout }: NavProps) {
  return (
    <nav id="nav">
      <div className="nav-container nav-left">
        <Link to={"/"} className="nav-logo">
          TICKETLY
        </Link>
      </div>

      <div className="nav-container nav-right">
        {isAuth ? <NavContainerAuth logout={logout} /> : <NavContainerUnauth />}
      </div>
    </nav>
  );
}

function NavContainerAuth({ logout }: { logout: (() => void) | null }) {
  const navigate = useNavigate();
  return (
    <>
      <Link to="/my">
        <BtnTwo Text="My tickets" Type="button" Disabled={false} />
      </Link>
      <Link to="/sale">
        <BtnTwo Text="Sale a ticket" Type="button" Disabled={false} />
      </Link>
      <Link to="/cart">
        <BtnTwo Text="Cart" Type="button" Disabled={false} />
      </Link>

      <BtnOne
        Text="Delete Profile"
        Type="button"
        Disabled={false}
        OnClick={async () => {
          try {
            const signout = await axios.post<signoutRes>(
              "http://localhost:3001/DeleteProfile",
              {},
              { withCredentials: true }
            );

            if (signout.status === 200) {
              logout ? logout() : null;
              navigate("/");
              window.location.reload();
            }
          } catch (error) {
            return;
          }
        }}
      />

      <BtnOne
        Text="Sign Out"
        Type="button"
        Disabled={false}
        OnClick={async () => {
          try {
            const signout = await axios.post<signoutRes>(
              "http://localhost:3001/signout",
              {},
              { withCredentials: true }
            );

            if (signout.status === 200) {
              logout ? logout() : null;
              navigate("/");
              window.location.reload();
            }
          } catch (error) {
            return;
          }
        }}
      />
    </>
  );
}

function NavContainerUnauth() {
  return (
    <>
      <Link to="/login">
        <BtnTwo Text="Log In" Type="button" Disabled={false} />
      </Link>

      <Link to="/signup">
        <BtnOne Text="Sign up" Type="button" Disabled={false} />
      </Link>
    </>
  );
}

export default Nav;
