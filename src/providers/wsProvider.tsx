import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createConsumer } from "@rails/actioncable";
import { Message, User, WsNotification } from "../utils/types";
import { wsChannelName, wsUrl } from "../utils/constants";
import { getToken } from "../utils/LocalStorage";
import { useUser } from "./UserProvider";

interface Props {
  children: React.ReactNode;
}

interface WsProps {
  connected: boolean;
  newMessage?: Message,
}

export const WSContext = createContext<WsProps>({
  connected: false,
});

export function WSProvider({ 
  children,
}: Props) {
  const [connected, setConnected] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<Message | undefined>(undefined);
  const [userTyping, setUserTyping] = useState<User | undefined>();
  const userId = useUser().user?.id;
  const [subscription, setSubscription] = useState<any>(null);

  const token = encodeURIComponent(getToken());
  const url = `${wsUrl}?token=${token}`;
  const consumer = useMemo(() => {
    return createConsumer(url);
  }, [url]);

  useEffect(() => {
    setConnected(false);
    if (!userId) {
      return;
    }
    console.log("going this")
    const newSubscription = consumer.subscriptions.create({ channel: wsChannelName }, {
      connected() {
        setConnected(true);
      },
      received(data: WsNotification) {
        console.log(data)
        if (data.type === 'message') {
          setNewMessage(data.data as Message);
        }

        if (data.type === 'typing') {
          // Do something with typing notification
          setUserTyping(data.data as User);
        }
      },
    })

    setSubscription(newSubscription);
  }, [userId]);

  return (
    <WSContext.Provider value={{
      connected,
      newMessage,
    }}>
      {children}
    </WSContext.Provider>
  );
}

export function useWS() {
  return useContext(WSContext);
}
