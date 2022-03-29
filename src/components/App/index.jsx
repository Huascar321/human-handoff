import './App.scss';
import { ChatHeader } from '../ChatHeader';
import { Input } from '../Input';

function App() {
  return (
    <>
      <div className="app-container">
        <ChatHeader/>
        <Input/>
      </div>
    </>
  );
}

export default App;
