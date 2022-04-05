import React from 'react';
import './Input.scss';

function Input({ socket, messages, setMessages }) {
  const [text, setText] = React.useState("");

  const sendData = () => {
    socket.emit("message", {
      text: text
    });
    let temp = messages;
    temp.push({
      user: "client",
      text: text
    });
    setMessages([...temp])
  };
  return(
    <div className="submit-container">
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendData();
          }
        }} 
        className="submit-container__textarea" placeholder="Escribe tu mensaje..."/>
      <button className="submit-container__submit" onClick={sendData}>Enviar</button>
    </div>
  );
}

export { Input };
