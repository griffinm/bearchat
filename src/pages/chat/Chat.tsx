import { useEffect, useState } from "react"
import { createMessage, fetchConversations, fetchMessages } from "../../utils/ApiClient";
import { Conversation, Message } from "../../utils/types";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { NewMessage } from "./components/NewMessage";
import { Messages } from "./components/Messages";
import { useUser } from "../../providers/UserProvider";
import { useWS } from "../../providers/wsProvider";

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

  // Check all conditions to make sure chat is ready
  useEffect(() => {
    if (connected && !loading && currentConversation && !ready) {
      setReady(true);
    }
  }, [connected, loading, currentConversation, ready])

  // Receive and append new messages to collection
  useEffect(() => {
    if (newMessage && currentConversation && newMessage.conversationId === currentConversation.id) {
      // Add this message if it is not already added
      const found = messages.find((message) => message.id === newMessage.id);
      if (!found) {
        setMessages([...messages, newMessage])
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
    })
  }, [currentConversation, setCurrentConversationId])

  const handleNewMessage = (message: string) => {
    if (!currentConversation) {
      return
    }
    
    createMessage(message, currentConversation.id).then((response) => {
      const message = response.data;
      console.log(message)
      setMessages([...messages, message])
    })
  }

  if (!ready) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col absolute top-[70px] right-0 left-0 bottom-0">
      <div className="grow">
        <Messages
          messages={messages}
          participants={currentConversation!.users}
          currentUser={user!}
        />
      </div>
      <div className="">
        <NewMessage onSend={handleNewMessage} />
      </div>
    </div>
  )
}