import { createContext } from "react";
import { LoginInputInterface } from "../interfaces/LoginInputInterface";

interface ContextDataType {
  LoginFunction: (data: LoginInputInterface) => Promise<string>;
  isAuthenticated: string | null
}
export const UserContext = createContext<ContextDataType | null>(null);
