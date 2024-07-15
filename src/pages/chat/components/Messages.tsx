import { useEffect, useMemo } from "react"
import { Conversation, Message, User } from "../../../utils/types"
import { MessageItem } from "./MessageItem"
import { markMessageAsRead } from "../../../utils/ApiClient"

interface Props {
  messages: Message[],
  participants: User[],
  currentUser: User,
  conversation: Conversation,
}

export function Messages({
  messages,
  participants,
  currentUser,
  conversation,
}: Props) {
  const sortedMessages = useMemo(() => {
    return messages.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [messages])

  // Mark all messages as read on the initial load
  useEffect(() => {
    const lastMessage = sortedMessages[sortedMessages.length - 1]
    if (lastMessage) {
      markMessageAsRead(lastMessage.id, conversation.id)
    }
  }, [sortedMessages])

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
      <div className="flex grow flex-col-reverse p-5 max-w-[700px] [overflow-anchor:auto] overflow-scroll pb-[130px]">
        {sortedMessages.map((message) => renderMessage(message) )}
      </div>
    </div>
  )
}