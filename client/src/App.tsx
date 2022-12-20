import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { sendMessage, socket } from './socket';
import { Message } from '../../interfaces/message';
import { useAxios } from './api/useAxios';

function App() {
  const [messages, setMessages] = useState<Message[]>([]); // TODO: REFACTOR

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      messageBody: { value: string };
    };
    
    sendMessage(target.messageBody.value);
  };

  const { data: previousMessages }  = useAxios<Message[]>('http://localhost:3001/message')

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
        {previousMessages?.map(message => (
          <li key={message.id} className="text-left text-black">{message.body}</li>
        ))}
        {messages.map(message => (
          <li key={message.id} className="text-left text-black">{message.body}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex p-5 items-center">
        <input name="messageBody" className="input input-bordered mr-5 w-full" type="text" />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
