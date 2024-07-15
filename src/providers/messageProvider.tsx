import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Conversation, Message, User, WsNotification } from "../utils/types";
import { useWS } from "./wsProvider";
import { wsChannelName } from "../utils/constants";
import { channel } from "diagnostics_channel";
import { createMessage, fetchConversations, fetchMessages } from "../utils/ApiClient";
import { BreakfastDiningOutlined } from "@mui/icons-material";

interface Props {
  children: React.ReactNode,
}

interface MessageProviderProps {
  conversation?: Conversation,
  isTyping: boolean,
  loading: boolean,
  messages: Message[],
  messagesLoading: boolean,
  participants: User[],
  sendMessage: (message: string) => void,
  unreadMessages: Message[],
}

export const MessageContext = createContext<MessageProviderProps>({
  conversation: {} as Conversation,
  isTyping: false,
  loading: false,
  messages: [],
  messagesLoading: false,
  participants: [],
  sendMessage: () => {},
  unreadMessages: [],
});

export function MessageProvider({
  children,
}: Props) {
  const { consumer } = useWS();
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<User[]>([]);
  const [conversation, setConversation] = useState<Conversation>();
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const unreadMessages = useMemo(() => {
    return messages.filter((message) => !message.readAt);
  }, [messages]);
  const [channelConnected, setChannelConnected] = useState(false);
  const isReady = !messagesLoading && channelConnected;
  const sortedMessages = useMemo(() => {
    return messages.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [messages])

  // Subscribe to the conversation channel
  useEffect(() => {
    setChannelConnected(false)
    consumer.subscriptions.create({ channel: wsChannelName }, {
      connected: () => setChannelConnected(true),
      received: (data) => handleNewData(data),
    });
  }, [])

  // Initial load of conversation
  useEffect(() => {
    fetchConversations().then((resp) => {
      setConversation(resp.data[0])
      setParticipants(resp.data[0].users)
    })
  }, [fetchConversations])

  // Initial Load of messages
  useEffect(() => {
    if (!conversation) return;
    setMessagesLoading(true);
    fetchMessages(conversation.id).then((resp) => {
      setMessages(resp.data)
      setMessagesLoading(false)
    })
  }, [conversation, fetchMessages, setMessages, setMessagesLoading])

  const handleNewData = (data: WsNotification) => {
    switch (data.type) {
      case "message":

        break;
      case "typing":

        break;
      case "mark_as_read":

        break;
      default:
        break
    }
  }
  
  const sendMessage = (message: string) => {
    if (!conversation) return;

    createMessage(message, conversation.id).then((resp) => {
      setMessages([...messages, resp.data])
    })
  }

  return (
    <MessageContext.Provider value={{
      conversation,
      isTyping,
      loading: !isReady,
      messages: sortedMessages,
      messagesLoading,
      participants,
      sendMessage,
      unreadMessages,
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessageContext);
}