import './App.scss';
import { ChatHeader } from '../ChatHeader';
import { Input } from '../Input';
import { useServer } from './customHooks/useServer';

function App() {
  const { state, stateUpdaters } = useServer();
  
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
