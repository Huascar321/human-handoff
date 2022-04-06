import React from 'react';
import './App.scss';
import { ChatHeader } from '../ChatHeader';
import { Input } from '../Input';
import { useServer } from './customHooks/useServer';
import { Chat } from '../Chat';
import io from 'socket.io-client';


const SERVER = "http://localhost:5000";
const socket = io(SERVER);

function App() {
  const { state, stateUpdaters } = useServer();
  const [messages, setMessages] = React.useState([]);

  socket.on('connection', () => {
    console.log(`I'm connected with the backend`);
  });
  
  const {
    dataValue,
  } = state;

  const {
    setDataValue,
  } = stateUpdaters;

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }; // <--- Placebo

  return (
    <>
      <div className="app-container">
        <p style={{color: "black"}}>dato: {dataValue}</p>
        <ChatHeader/>
        <Chat
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          getRandomInt={getRandomInt}
        />
        <Input
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          getRandomInt={getRandomInt}
        />
      </div>
    </>
  );
}

export default App;
