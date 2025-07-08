// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { isAuthenticated } from "../store/hooks";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = isAuthenticated();
  // console.log("Authenticated?", auth);
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
