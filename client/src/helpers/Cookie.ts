import nookies, { parseCookies } from "nookies";

const AuthenticatedOrNot = () => {
  // const cookieName = "TwtiterAuth";
  const cookieValue = nookies.get(null, "TwtiterAuth");
  const cookieValueFound = cookieValue.TwtiterAuth;
  const parsedValue = parseCookies(null, cookieValueFound);
  // console.log("Cookie Found", parsedValue);
  return parsedValue;
};

export default AuthenticatedOrNot;
