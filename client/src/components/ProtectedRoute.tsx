import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../context/UserState";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  
  const {isAuthenticated} = UseUserContext();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <section>{children}</section>;
};
