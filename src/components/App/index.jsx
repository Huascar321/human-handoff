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
        <ChatHeader/>
        <Input/>
        <p>{dataValue.data}</p>
      </div>
    </>
  );
}

export default App;
