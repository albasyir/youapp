import Button from 'components/atoms/button';
import InputField from 'components/molecules/input-field';
import React, { useState } from 'react';

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const handleMessageChange = (data: string) => {
    setMessage(data);
  };

  const handleSendMessage = () => {
    const newmsg = {
      sender: "you",
      text: message
    }

    messages.push(newmsg)
    
    setMessages(messages);
    setMessage('');
  };

  return (
    <div className="min-h-screen-platform flex flex-col justify-between">
      <div className="flex-grow overflow-auto">
        {messages.map(msg => {
          return (
            <div>{msg.sender}: {msg.text}</div>
          )
        })}
      </div>
      <div>
        <div className="flex items-center">
          <InputField
            type="text"
            placeholder="Type your message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={message}
            onChange={handleMessageChange}
          />
          <Button
            className="ml-2"
            disabled={!message}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
