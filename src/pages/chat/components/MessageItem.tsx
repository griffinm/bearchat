import { Message, User } from "../../../utils/types";
import classNames from "classnames";

interface Props {
  message: Message;
  isSender: boolean;
  user: User;
}

export function MessageItem({ message, isSender }: Props) {
  const containerClasses = classNames("flex items-center", {
    "justify-end": isSender,
    "justify-start": !isSender,
  });

  const bubbleClasses = classNames("p-4 rounded-xl my-1 text-lg", {
    "bg-blue-200": isSender,
    "bg-gray-200": !isSender,
  });

  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        {message.content}
      </div>
    </div>
  )
}