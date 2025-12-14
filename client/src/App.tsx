import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import type { CurrentUserRes } from "./Types/Auth.types";
import Nav from "./Components/UI/Nav/Nav";
import axios from "axios";
import Routing from "./Routing/Routing";
import { AuthContext } from "./Context/AuthContext";
import "./App.css";

function App() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function checkAuth() {
      try {
        const check = await axios.get<CurrentUserRes>(
          "http://localhost:3001/current-user",
          {
            withCredentials: true,
          }
        );

        if (check.status === 200) {
          auth ? auth.login(check.data.currentUser.UserId) : null;
        }
      } catch (error) {
        auth ? auth.logout : null;
      }
    }

    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Nav
        isAuth={auth ? auth.auth.AuthState : null}
        logout={auth ? auth.logout : null}
      />
      <Routing />;
    </BrowserRouter>
  );
}

export default App;
