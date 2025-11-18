import { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import type { AuthContextType, CurrentUserRes } from "./Types/Auth.types";
import Nav from "./Components/UI/Nav/Nav";
import axios from "axios";
import Routing from "./Routing/Routing";
import "./App.css";

function App() {
  useEffect(() => {
    async function checkAuth() {
      try {
        const check = await axios.get<CurrentUserRes>(
          "http://localhost:3001/current-user",
          {
            withCredentials: true,
          }
        );

        if (check.status === 200)
          setAuth({ AuthState: true, UserId: check.data.currentUser.UserId });
      } catch (error) {
        setAuth({ AuthState: false, UserId: null });
      }
    }

    checkAuth();
  }, []);

  const [auth, setAuth] = useState<AuthContextType>({
    AuthState: false,
    UserId: null,
  });

  const AuthContext = createContext<AuthContextType>(auth);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <Nav isAuth={auth.AuthState} setAuth={setAuth}></Nav>
        <Routing auth={auth} setAuth={setAuth} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
