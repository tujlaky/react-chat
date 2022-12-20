import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { sendMessage, socket } from './socket';
import { Message } from '../../interfaces/message';
import { useAxios } from './api/useAxios';
import { useMessages } from './api/messages';

function App() {
  const [messages, setMessages] = useState<Message[]>([]); // TODO: REFACTOR
  const [messageBody, setMessageBody] = useState<string>('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    sendMessage(messageBody);
    setMessageBody('');
  };

  const { data: previousMessages } = useMessages()

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('new-message', (message: Message) => {
      setMessages([
        ...messages,
        message
      ])
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    
    return () => {
      socket.off('connect');
      socket.off('new-message');
      socket.off('disconnect');
    };
  }, [messages]);

  return (
    <div className="App flex flex-col h-full">
      <ul className="bg-white flex-1">
        {[...previousMessages, ...messages].map(message => (
          <li key={message.id} className="text-left text-black"><b style={{color: message.user.color}}>{message.user.name}:</b> {message.body}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex p-5 items-center">
        <input value={messageBody} onChange={e => setMessageBody(e.target.value)} name="messageBody" className="input input-bordered mr-5 w-full" type="text" />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
