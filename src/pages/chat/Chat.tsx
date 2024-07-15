import { useEffect, useRef } from "react"
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { NewMessage } from "./components/NewMessage";
import { Messages } from "./components/Messages";
import { useUser } from "../../providers/UserProvider";
import { useMessages } from "../../providers/messageProvider";

export function Chat() {
  const { user } = useUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { 
    messages,
    loading,
    sendMessage,
    participants,
    conversation,
  } = useMessages()   

  useEffect(() => {
    if (!loading) {
      scrollToBottom()
    }
  }, [messages, loading])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col">
      <div className="">
        <Messages
          messages={messages}
          participants={participants}
          currentUser={user!}
          conversation={conversation!}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="flex justify-center fixed bottom-0 right-0 left-0 h-[140px] bg-white">
        <div className="grow p-5 max-w-[700px]">
          <NewMessage onSend={sendMessage} />
        </div>
      </div>

    </div>
  )
}