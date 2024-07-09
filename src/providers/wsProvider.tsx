import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createConsumer } from "@rails/actioncable";
import { Message } from "../utils/types";
import { wsChannelName, wsUrl } from "../utils/constants";


interface Props {
  children: React.ReactNode;
}

interface WsProps {
  consumer?: ActionCable.Cable;
  setCurrentConversationId: (id: number) => void;
  connected: boolean;
  newMessage?: Message,
}

export const WSContext = createContext<WsProps>({
  consumer: undefined,
  setCurrentConversationId: () => {},
  connected: false,
});

export function WSProvider({ 
  children,
}: Props) {
  const [currentConversationId, setCurrentConversationId] = useState<number>(0);
  const [connected, setConnected] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<Message | undefined>(undefined);

  const url = wsUrl;
  const consumer = useMemo(() => {
    return createConsumer(url);
  }, [url]);

  useEffect(() => {
    setConnected(false);
    if (!currentConversationId) return;
    
    consumer.subscriptions.create({ channel: wsChannelName}, {
      connected() {
        setConnected(true);
      },
      received(data: Message) {
        setNewMessage(data);
      },
    })
  }, [currentConversationId, consumer]);

  return (
    <WSContext.Provider value={{
      consumer,
      setCurrentConversationId,
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
