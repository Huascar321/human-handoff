import React from 'react';
import './Input.scss';

function Input({ socket, messages, setMessages }) {
  const [text, setText] = React.useState("");

  const sendData = () => {
    //let temp = messages;
    //temp.push({
    //  id: messages.length+1,
    //  user: "admin",
    //  text: text
    //});
    //setMessages([...temp])
    console.log(messages);
    socket.emit("message", {
      text: text
    });
  };
  return(
    <div className="general_submit_container">
      <div className="submit-container">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
              setText("");
            }
          }} 
          className="submit-container__textarea" placeholder="Escribe tu mensaje..."/>
        <button className="submit-container__submit" onClick={sendData}>Enviar</button>
      </div>
    </div>
  );
}

export { Input };
