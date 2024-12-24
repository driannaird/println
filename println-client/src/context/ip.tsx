import { createContext, useContext } from "react";

export interface IpContextType {
  name: string | null;
  update: (name: string | null) => void;
}

export const IpContext = createContext<IpContextType>({
  name: null,
  update: () => {},
});

export const useIpContext = () => useContext(IpContext);
