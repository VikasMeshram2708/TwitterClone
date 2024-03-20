import { ReactNode, useEffect } from "react";
import AuthenticatedOrNot from "../helpers/Cookie";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const value = AuthenticatedOrNot();
    const parsedValue = value.TwtiterAuth;
    if (parsedValue === undefined) {
      return navigate("/login");
    }
    console.log("protected", parsedValue);
    // if(!parsedValue) {
    // }
  }, [navigate]);

  return <section>{children}</section>;
};
