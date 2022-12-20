import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { socket } from './socket';
import { Message } from '../../interfaces/message';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('message', (message: Message) => {
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
      socket.off('disconnect');
    };
  }, [messages]);

  return (
    <div className="App flex flex-col h-full">
      <ul className="bg-white flex-1">
        {messages.map(message => (
          <li key="{message.id}" className="text-left text-black">{message.body}</li>
        ))}
      </ul>
      <div className="flex p-5 items-center">
        <input className="input input-bordered mr-5 w-full" type="text" />
        <button className="btn btn-primary" type="submit">Send</button>
      </div>
    </div>
  );
}

export default App;
