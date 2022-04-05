import './App.scss';
import { ChatHeader } from '../ChatHeader';
import { Input } from '../Input';
import { useServer } from './customHooks/useServer';
import io from 'socket.io-client';


const SERVER = "http://localhost:5000";

function App() {
  const { state, stateUpdaters } = useServer();

  const socket = io(SERVER);
  socket.on('connection', () => {
    console.log(`I'm connected with the backend`);
  });
  
  const {
    dataValue,
  } = state;

  const {
    setDataValue,
  } = stateUpdaters;

  return (
    <>
      <div className="app-container">
        <p style={{color: "black"}}>dato: {dataValue}</p>
        <ChatHeader/>
        <Input/>
      </div>
    </>
  );
}

export default App;
