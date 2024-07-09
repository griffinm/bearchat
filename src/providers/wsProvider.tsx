import { createContext, useContext, useEffect, useState } from "react";
import { createConsumer } from "@rails/actioncable";
import { Message } from "../utils/types";

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

  const url = "ws://localhost:3001/ws";
  const consumer = createConsumer(url);

  useEffect(() => {
    setConnected(false);
    if (!currentConversationId) return;
    
    consumer.subscriptions.create({ channel: "ChatChannel" }, {
      connected() {
        console.log("connected")
        setConnected(true);
      },
      received(data: Message) {
        console.log("received", data)
        setNewMessage(data);
      },
    })
  }, [currentConversationId]);

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
