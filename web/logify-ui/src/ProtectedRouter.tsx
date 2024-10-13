import React from "react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  const location = useLocation();
  const cookie = Cookies.get("OAuth");

  return cookie != null ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRouter;
