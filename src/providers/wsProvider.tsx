import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createConsumer } from "@rails/actioncable";
import { wsUrl } from "../utils/constants";
import { getToken } from "../utils/LocalStorage";
import { Cable } from "actioncable";
import { useUser } from "./UserProvider";

interface Props {
  children: React.ReactNode;
}

interface WsProps {
  consumer?: Cable,
  ready: boolean,
}

export const WSContext = createContext<WsProps>({
  consumer: undefined,
  ready: false,
});

export function WSProvider({ 
  children,
}: Props) {
  const token = encodeURIComponent(getToken());
  const [ready, setReady] = useState(false);
  const url = `${wsUrl}?token=${token}`;
  const { user } = useUser();
  const consumer = useMemo(() => {
    if (!user) return
    return createConsumer(url);

  }, [url, user]);

  useEffect(() => {
    if (consumer) {
      setReady(true);
    }
  }, [consumer])

  return (
    <WSContext.Provider value={{
      consumer,
      ready,
    }}>
      {children}
    </WSContext.Provider>
  );
}

export function useWS() {
  return useContext(WSContext);
}
