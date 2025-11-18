import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/pages/Home/HomePage";
import AuthPage from "../Components/pages/Auth/AuthPage";
import type { RoutingProps } from "../Types/UI.types";

export default function Routing({ auth, setAuth }: RoutingProps) {
  return (
    <Routes>
      {auth.AuthState ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<HomePage />} />
          <Route path="/cart" element={<HomePage />} />
          <Route path="/sell" element={<HomePage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<AuthPage setAuth={setAuth} />} />
          <Route path="/login" element={<AuthPage setAuth={setAuth} />} />
        </>
      )}
    </Routes>
  );
}
