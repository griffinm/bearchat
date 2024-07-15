import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createConsumer } from "@rails/actioncable";
import { wsUrl } from "../utils/constants";
import { getToken } from "../utils/LocalStorage";
import { Cable } from "actioncable";

interface Props {
  children: React.ReactNode;
}

interface WsProps {
  consumer: Cable,
}

export const WSContext = createContext<WsProps>({
  consumer: {} as Cable,
});

export function WSProvider({ 
  children,
}: Props) {
  const token = encodeURIComponent(getToken());
  const url = `${wsUrl}?token=${token}`;
  const consumer = useMemo(() => {
    return createConsumer(url);
  }, [url]);

  return (
    <WSContext.Provider value={{
      consumer,
    }}>
      {children}
    </WSContext.Provider>
  );
}

export function useWS() {
  return useContext(WSContext);
}
