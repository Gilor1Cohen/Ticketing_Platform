import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/pages/Home/HomePage";
import AuthPage from "../Components/pages/Auth/AuthPage";
import { useContext } from "react";
import SaleTicketsPage from "../Components/pages/SaleTickets/SaleTickets";
import { AuthContext } from "../Context/AuthContext";
import MyTicketsPage from "../Components/pages/MyTickets/MyTickets";
import CartPage from "../Components/pages/Cart/CartPage";
import UpdatePage from "../Components/pages/Update/UpdatePage";

export default function Routing() {
  const Auth = useContext(AuthContext);

  return (
    <Routes>
      {Auth?.auth.AuthState ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sale" element={<SaleTicketsPage />} />
          <Route path="/my" element={<MyTicketsPage />} />
          <Route path="/update" element={<UpdatePage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
        </>
      )}
    </Routes>
  );
}
