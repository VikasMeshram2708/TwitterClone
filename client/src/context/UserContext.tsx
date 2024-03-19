import { createContext } from "react";
import { UserLoginSchemaType } from "../Schemas/UserLoginSchema";

interface ContextDataType {
  LoginFunction: (data: UserLoginSchemaType) => Promise<string>;
}
export const UserContext = createContext<ContextDataType | null>(null);
