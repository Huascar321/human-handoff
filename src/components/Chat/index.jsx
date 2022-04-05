import React from 'react';

function Chat({ socket }) {
  const [messages, setMessages] = React.useState([]); 
  React.useEffect(() => {
    socket.on("message", (data) => {
      let temp = messages;
      temp.push({
        text: data.text,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  return (
    <div className="chat-container">
      {messages.map((i) => {
        return (
          <div className="message">
            <p style={{color: "black"}}>{i.text}</p>
            <span style={{color: "gray"}}>Cliente</span>
          </div>
        );
      })}
    </div>
  );
}

export { Chat }
