/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";
import { LoginInputInterface } from "../interfaces/LoginInputInterface";
const BASE_URI = import.meta.env.VITE_PUBLIC_SERVER_URL;
import nookies from "nookies";
import { SignUpInputInterface } from "../interfaces/SignUpInputInterface";

export const UserState = ({ children }: { children: ReactNode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Login Function
  const LoginFunction = async (data: LoginInputInterface) => {
    try {
      const response = await fetch(`${BASE_URI}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        return toast.error(result?.message);
      }

      // Set the Cookies
      nookies.set(null, "TwtiterAuth", JSON.stringify(result?.data), {
        maxAge: 60 * 60,
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      localStorage.setItem("isLoggedIn", JSON.stringify(true));

      return toast.success(result?.message);
    } catch (e) {
      const err = e as Error;
      return toast.error(
        `Something went wrong. Please try again. : ${err?.message}`
      );
    }
  };

  // Sign Up Function
  const SignUpFunction = async (data: SignUpInputInterface) => {
    try {
      const response = await fetch(`${BASE_URI}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        return toast.error(result?.message);
      }
      return toast.success(result?.message);
    } catch (e) {
      const err = e as Error;
      return toast.error(
        `Something went wrong. Please try again. : ${err?.message}`
      );
    }
  };

  // Authenticaed Function
  const isAuthenticated = useMemo(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    setInterval(() => {}, 3600);
    return userLoggedIn;
  }, []);

  useEffect(() => {
    // Function to clear localStorage after 2 hours
    const clearLocalStorage = () => {
      localStorage.removeItem("isLoggedIn");
    };
  
    // Set interval to clear localStorage every 2 hours
    const interval = setInterval(clearLocalStorage, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
  
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs only once on mount
  

  return (
    <UserContext.Provider
      value={{ LoginFunction, isAuthenticated, SignUpFunction }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UseUserContext = () => {
  const userContextData = useContext(UserContext);
  if (!userContextData) {
    throw new Error("Context must be wrapped in the Provider.");
  }

  return userContextData;
};
