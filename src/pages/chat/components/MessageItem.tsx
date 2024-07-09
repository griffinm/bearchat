import { Message, User } from "../../../utils/types";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";

interface Props {
  message: Message;
  isSender: boolean;
  user: User;
  showTimestamp: boolean;
}

export function MessageItem({
  message,
  isSender,
  showTimestamp,
  user,
}: Props) {
  const [showTime, setShowTime] = useState(showTimestamp);

  const containerClasses = classNames("flex items-center", {
    "justify-end": isSender,
    "justify-start": !isSender,
  });

  const bubbleClasses = classNames("p-4 rounded-xl my-1 text-lg", {
    "bg-blue-200": isSender,
    "bg-gray-200": !isSender,
  });

  const timeClasses = classNames("mb-4 text-xs text-gray-500", {
    "text-right": isSender,
    "text-left": !isSender,
  });

  const toggleShowTime = () => {
    if (showTimestamp) {
     // The parent told this to show the time
      return
    }

    setShowTime(!showTime);
  }

  return (
    <div className={containerClasses}>
      <div className="flex flex-col">
        <div className={bubbleClasses} onClick={toggleShowTime}>
          {message.content}
        </div>
        {showTime && (
          <div className={timeClasses}>
            {format(new Date(message.createdAt), "h:mm aaa")}
          </div>
        )}
      </div>
    </div>
  )
}