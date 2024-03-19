import { ReactNode, useContext } from "react";
import { UserContext } from "./UserContext";
import { UserLoginSchemaType } from "../Schemas/UserLoginSchema";
import { ZodError } from "zod";
import toast from "react-hot-toast";
const BASE_URI = import.meta.env.VITE_PUBLIC_SERVER_URL;
import nookies from "nookies";

export const UserState = ({ children }: { children: ReactNode }) => {
  const LoginFunction = async (data: UserLoginSchemaType) => {
    try {
      const response = await fetch(`${BASE_URI}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      // console.log("res", result.data);

      if (!response.ok) {
        return toast.error(result?.message);
      }

      // Set Cookies
      nookies.set(null, "twitterAuth", JSON.stringify(result.data), {
        maxAge: 60 * 60,
        secure: true,
        path: "/",
        sameSite: "strict",
      });
      return toast.success(result?.message);
    } catch (e) {
      const err = e as Error;
      if (e instanceof ZodError) {
        return toast.error(e?.errors[0]?.message);
      }
      return toast.error(err?.message);
    }
  };
  return (
    <UserContext.Provider value={{ LoginFunction }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userContextData = useContext(UserContext);
  if (!userContextData) {
    throw new Error("Context must be wrapped in the Provider.");
  }

  return userContextData;
};
