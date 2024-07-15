import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Conversation, Message, TypingNotificationData, User, WsNotification } from "../utils/types";
import { useWS } from "./wsProvider";
import { wsChannelName } from "../utils/constants";
import { createMessage, fetchConversations, fetchMessages } from "../utils/ApiClient";
import { useUser } from "./UserProvider";
import { Channel } from "actioncable";

const TYPING_TIMEOUT = 2000;

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
  setIsTyping: (isTyping: boolean) => void,
  participantTyping: boolean,
}

export const MessageContext = createContext<MessageProviderProps>({
  conversation: {} as Conversation,
  isTyping: false,
  setIsTyping: () => {},
  loading: false,
  messages: [],
  messagesLoading: false,
  participants: [],
  sendMessage: () => {},
  unreadMessages: [],
  participantTyping: false,
});

export function MessageProvider({
  children,
}: Props) {
  const { consumer, ready: socketReady } = useWS();
  const [subscription, setSubscription] = useState<Channel | undefined>();
  const [participantTyping, setParticipantTyping] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<User[]>([]);
  const [conversation, setConversation] = useState<Conversation>();
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const unreadMessages = useMemo(() => {
    return messages.filter((message) => !message.readAt);
  }, [messages]);
  const [channelConnected, setChannelConnected] = useState(false);
  const isReady = !messagesLoading;
  const sortedMessages = useMemo(() => {
    return messages.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [messages])
  const { user } = useUser();
  const messagesRef = useRef<Message[]>(messages);
  messagesRef.current = messages;
  const typingRef = useRef(isTyping);


  // Subscribe to the conversation channel
  useEffect(() => {
    setChannelConnected(false)
    if (!user) return
    if (!consumer) return;
    if (!socketReady) return;
    if (subscription) return;
    if (channelConnected) return;

    const sub = consumer.subscriptions.create({ channel: wsChannelName }, {
      received(data) {
        handleNewData(data)
      },
      connected() {
        setChannelConnected(true)
      }
    })
    setSubscription(sub)

  }, [socketReady, consumer, user])
  // Initial load of conversation
  useEffect(() => {
    if (!user) return;

    fetchConversations().then((resp) => {
      setConversation(resp.data[0])
      setParticipants(resp.data[0].users)
    })
  }, [fetchConversations, user])

  // Initial Load of messages
  useEffect(() => {
    if (!conversation) return;
    if (!user) return;

    setMessagesLoading(true);
    fetchMessages(conversation.id).then((resp) => {
      setMessages(resp.data)
      setMessagesLoading(false)
    })
  }, [conversation, user, fetchMessages, setMessages, setMessagesLoading])


  // Let server know when user is typing
  useEffect(() => {
    if (!subscription) return;
    if (!isTyping) return;

    subscription.send({ event_name: "typing", conversation_id: conversation?.id })
    setIsTyping(false)

    typingRef.current = isTyping;
  }, [isTyping])

  const handleNewData = (data: WsNotification) => {
    const messageArray = messagesRef.current;
    switch (data.type) {
      case "message":
        setMessages([...messageArray, data.data as Message])
        break;
      case "typing":
        handleIsTyping(data.data as TypingNotificationData)
        break;
      case "mark_as_read":
        setMessages(messageArray.map((message) => {
          return {...message, readAt: new Date()}
        }))
        break;
      default:
        break
    }
  }
  
  const handleIsTyping = (data: TypingNotificationData) => {
    if (data.userId === user?.id) return;

    setParticipantTyping(true)

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    setTypingTimeout(setTimeout(() => {
      setParticipantTyping(false)
    }, TYPING_TIMEOUT))
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
      setIsTyping,
      participantTyping: participantTyping,
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessageContext);
}