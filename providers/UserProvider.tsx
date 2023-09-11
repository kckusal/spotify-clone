import { MyUserContextProvider } from "@/hooks/useUser";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};
