import { Message, User } from "../../../utils/types";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

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

  const bubbleClasses = classNames("px-2 py-3 min-w-[100px] rounded-xl my-1 text-lg", {
    "bg-blue-200 text-right": isSender,
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

  const readIcon = (message: Message) => {
    if (!isSender) {
      return
    }

    return (
      <div className="text-xs text-gray-500">
        {message.readAt ? <MarkEmailReadIcon /> : <MailOutlineIcon />}
      </div>
)
  }

  return (
    <div className={containerClasses}>
      <div className="flex flex-col">
        <div className={bubbleClasses} onClick={toggleShowTime}>
          {message.content}
          {readIcon(message)}
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