import { ReactNode, useEffect } from "react";
import AuthenticatedOrNot from "../helpers/Cookie";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // let id;
  const navigate = useNavigate();
  useEffect(() => {
    const value = AuthenticatedOrNot();
    const parsedValue = value.TwtiterAuth;
    if (parsedValue === undefined) {
      return navigate("/login");
    }
    const parsedValue2 = JSON.parse(parsedValue);
    localStorage.setItem("CurrentUserId", parsedValue2.userId);
    // console.log("id", parsedValue2.userId);
  }, [navigate]);

  return <section>{children}</section>;
};
