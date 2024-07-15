import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { useMessages } from '../../../providers/messageProvider';

const lightGrey = grey[700];

interface Props {
  onSend: (message: string) => void;
}

export function NewMessage({
  onSend,
}: Props) {
  const [newMessage, setNewMessage] = useState<string>('')
  const { setIsTyping } = useMessages()

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      onSend(newMessage);
      setNewMessage('');
    }
  }

  const onMessageKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && newMessage.trim() !== '') {
      sendMessage();
    } else {
      setIsTyping(true)
    }
  }

  return (
    <div className="py-2 px-4 m-5 h-[80px] border rounded-xl shadow-xl">
      <div className="flex">
        <div className="pr-3 grow">
          <textarea
            className="w-full h-full resize-none p-2"
            placeholder="New Message"
            value={newMessage}
            onKeyUp={onMessageKeyUp}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="pt-2">
          <IconButton
            size="large" 
            aria-label="send"
            sx={{ color: lightGrey }}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}