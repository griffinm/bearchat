import { useEffect, useState } from "react"
import { createMessage, fetchConversations, fetchMessages } from "../../utils/ApiClient";
import { Conversation, Message } from "../../utils/types";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { NewMessage } from "./components/NewMessage";
import { Messages } from "./components/Messages";
import { useUser } from "../../providers/UserProvider";

export function Chat() {
  const [loading, setLoading] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useUser()

  useEffect(() => {
    setLoading(true)
    fetchConversations().then((response) => {
      const firstConversation = response.data[0];
      setCurrentConversation(firstConversation);
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    if (!currentConversation) {
      return
    }

    fetchMessages(currentConversation.id).then((response) => {
      setMessages(response.data);
    })
  }, [currentConversation])

  const handleNewMessage = (message: string) => {
    if (!currentConversation) {
      return
    }

    createMessage(message, currentConversation.id).then((response) => {
      const message = response.data;
      console.log(message)
    })
  }

  if (loading || !currentConversation) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col absolute top-[70px] right-0 left-0 bottom-0">
      <div className="grow">
        <Messages
          messages={messages}
          participants={currentConversation.users}
          currentUser={user!}
        />
      </div>
      <div className="">
        <NewMessage onSend={handleNewMessage} />
      </div>
    </div>
  )
}