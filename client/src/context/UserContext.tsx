import { createContext } from "react";
import { LoginInputInterface } from "../interfaces/LoginInputInterface";
import { SignUpInputInterface } from "../interfaces/SignUpInputInterface";

interface ContextDataType {
  LoginFunction: (data: LoginInputInterface) => Promise<string>;
  SignUpFunction: (data: SignUpInputInterface) => Promise<string>;
}
export const UserContext = createContext<ContextDataType | null>(null);
