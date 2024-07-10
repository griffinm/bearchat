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
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [messages])

  const renderMessage = (message: Message) => {
    let isLastOfSender = false
    if (sortedMessages.length > sortedMessages.indexOf(message)) {
      const nextMessage = sortedMessages[sortedMessages.indexOf(message) + 1]
      if (nextMessage) {
        isLastOfSender = nextMessage.userId !== message.userId
      } else {
        isLastOfSender = true
      }
    }

    return (
      <MessageItem
        showTimestamp={isLastOfSender}
        key={message.id}
        message={message}
        isSender={message.userId === currentUser.id}
        user={participants.find((user) => user.id === message.userId)!}
      />
    )
  }

  return (
    <div className="grow flex justify-center">
      <div className="flex flex-col-reverse grow p-5 max-w-[700px] [overflow-anchor:auto] overflow-auto h-svh pb-[180px]">
        {sortedMessages.map((message) => renderMessage(message) )}
      </div>
    </div>
  )
}