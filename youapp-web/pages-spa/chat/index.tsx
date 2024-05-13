import Button from 'components/atoms/button';
import InputField from 'components/molecules/input-field';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { LoginResponseDto } from 'sdk/youapp-service';
import { Socket } from 'socket.io-client';

const ChatPage: React.FC = () => {
  const context: Partial<{
    session: LoginResponseDto,
    socket: Socket
  }> = useOutletContext();

  if (!context.session || !context.socket) throw Error("this page require session and socket context");

  const socket = context.socket;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const handleMessageChange = (data: string) => {
    setMessage(data);
  };

  useEffect(() => {
    socket.on('chat.world.reply', (data) => {
      const newmsg = {
        sender: data.username,
        text: data.text
      }

      messages.push(newmsg);
      setMessages(messages);
      setMessage('');
    })
  }, [])

  const handleSendMessage = () => {
    socket.emit('chat.world', message);
  };

  return (
    <div className="min-h-screen-platform flex flex-col justify-between">
      <div className="flex-grow overflow-auto">
        {messages.map((msg, key) => {
          return (
            <div key={key}>{msg.sender}: {msg.text}</div>
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
