import { Link, useNavigate } from "react-router-dom";
import type { NavProps } from "../../../Types/UI.types";
import BtnOne from "../Btns/BtnOne/BtnOne";
import BtnTwo from "../Btns/BtnTwo/BtnTwo";
import axios from "axios";
import type { AuthContextType, signoutRes } from "../../../Types/Auth.types";
import "./Nav.Style.css";

function Nav({ isAuth, setAuth }: NavProps) {
  return (
    <nav>
      <div className="nav-container nav-left">
        <Link to={"/"} className="nav-logo">
          TICKETLY
        </Link>
      </div>

      <div className="nav-container nav-right">
        {isAuth ? (
          <NavContainerAuth setAuth={setAuth} />
        ) : (
          <NavContainerUnauth />
        )}
      </div>
    </nav>
  );
}

function NavContainerAuth({
  setAuth,
}: {
  setAuth: React.Dispatch<React.SetStateAction<AuthContextType>>;
}) {
  const navigate = useNavigate();
  return (
    <>
      <Link to="/">
        <BtnTwo Text="My orders" Type="button" Disabled={false} />
      </Link>
      <Link to="/">
        <BtnTwo Text="Cart" Type="button" Disabled={false} />
      </Link>
      <Link to="/">
        <BtnTwo Text="Sale a ticket" Type="button" Disabled={false} />
      </Link>

      <button
        id="signout-btn"
        onClick={async () => {
          try {
            const signout = await axios.post<signoutRes>(
              "http://localhost:3001/signout",
              {},
              { withCredentials: true }
            );

            if (signout.status === 200) {
              setAuth({ AuthState: false, UserId: null });
              navigate("/");
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        sign out
      </button>
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
