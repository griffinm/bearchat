import { useEffect, useRef, useState } from "react"
import { createMessage, fetchConversations, fetchMessages } from "../../utils/ApiClient";
import { Conversation, Message } from "../../utils/types";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { NewMessage } from "./components/NewMessage";
import { Messages } from "./components/Messages";
import { useUser } from "../../providers/UserProvider";
import { useWS } from "../../providers/wsProvider";
const { useNavigate } = require("react-router-dom");

export function Chat() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useUser()
  const {
    newMessage,
    connected,
    setCurrentConversationId,
  } = useWS()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Check all conditions to make sure chat is ready
  useEffect(() => {
    if (connected && !loading && currentConversation && !ready) {
      setReady(true);
      scrollToBottom()
    }
  }, [connected, loading, currentConversation, ready])

  // Receive and append new messages to collection
  useEffect(() => {
    if (newMessage && currentConversation && newMessage.conversationId === currentConversation.id) {
      // Add this message if it is not already added
      const found = messages.find((message) => message.id === newMessage.id);
      if (!found) {
        setMessages([...messages, newMessage])
        scrollToBottom()
      }
    }
  }, [newMessage, currentConversation, messages])

  // Initial load of conversations
  useEffect(() => {
    setLoading(true)
    fetchConversations().then((response) => {
      const firstConversation = response.data[0];
      setCurrentConversation(firstConversation);
      setLoading(false);
    }).catch(() => {
      navigate('/login')
    })
  }, [])

  // Initial load of messages
  useEffect(() => {
    if (!currentConversation) {
      return
    }

    setCurrentConversationId(currentConversation.id);

    fetchMessages(currentConversation.id).then((response) => {
      setMessages(response.data);
      scrollToBottom()
    })
  }, [currentConversation, setCurrentConversationId])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  const handleNewMessage = (message: string) => {
    if (!currentConversation) {
      return
    }
    
    createMessage(message, currentConversation.id).then((response) => {
      const message = response.data;
      setMessages([...messages, message])
      scrollToBottom()
    })
  }

  if (!ready) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col">
      <div className="">
        <Messages
          messages={messages}
          participants={currentConversation!.users}
          currentUser={user!}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="flex justify-center fixed bottom-0 right-0 left-0 h-[140px] bg-white">
        <div className="grow p-5 max-w-[700px]">
          <NewMessage onSend={handleNewMessage} />
        </div>
      </div>

    </div>
  )
}