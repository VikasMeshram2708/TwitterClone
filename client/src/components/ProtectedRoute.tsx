import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // console.log(isAuthenticated);
  const navigate = useNavigate();
  // console.log(pathname);
  useEffect(() => {
    if (isAuthenticated === null) {
      return navigate("/login");
    }
    if (isAuthenticated === "true") {
      return navigate("/tweets");
    }
  },[isAuthenticated, navigate]);

  return <section>{children}</section>;
};
