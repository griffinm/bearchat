import { useMemo } from "react"
import { Message, User } from "../../../utils/types"
import { MessageItem } from "./MessageItem"

interface Props {
  messages: Message[],
  participants: User[],
  currentUser: User,
}

export function Messages({
  messages,
  participants,
  currentUser,
}: Props) {
  const sortedMessages = useMemo(() => {
    return messages.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  }, [messages])

  return (
    <div className="grow flex justify-center">
      <div className="grow p-5 max-w-[700px]">
        {sortedMessages.map((message) => (
          <MessageItem 
            key={message.id}
            message={message}
            isSender={message.userId === currentUser.id}
            user={participants.find((user) => user.id === message.userId)!}
          />
        ))}
      </div>
    </div>
  )
}