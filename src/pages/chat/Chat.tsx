import { useEffect, useMemo, useRef } from "react"
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
    participantTyping,
  } = useMessages()   

  useEffect(() => {
    if (!loading) {
      scrollToBottom()
    }
  }, [messages, loading, participantTyping])

  const otherParticipant = useMemo(() => {
    return participants.find((participant) => participant.id !== user?.id)
  }, [participants])

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
      <div className="pb-[130px]">
        <Messages
          messages={messages}
          participants={participants}
          currentUser={user!}
          conversation={conversation!}
          />
        {!participantTyping && (
          <div className="p-2 text-center text-gray-500">
            {otherParticipant?.firstName} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div>
      </div>
      <div className="flex justify-center fixed bottom-0 right-0 left-0 h-[140px] bg-white">
        <div className="grow p-5 max-w-[700px]">
          <NewMessage onSend={sendMessage} />
        </div>
      </div>

    </div>
  )
}