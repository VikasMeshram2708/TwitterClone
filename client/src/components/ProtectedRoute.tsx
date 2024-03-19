import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseCookies } from "nookies";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = document.cookie;
  const cookieValue = parseCookies(null, isLoggedIn);
  const isAuthenticated = cookieValue?.twitterAuth;
  console.log("cookies", cookieValue.twitterAuth);

  // console.log(isAuthenticated);
  const navigate = useNavigate();
  // console.log(pathname);
  useEffect(() => {
    if (isAuthenticated === undefined) {
      return navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <section>{children}</section>;
};
