import React from 'react';

function Chat({ socket, messages, setMessages }) { 
  React.useEffect(() => {
    socket.on("message", (data) => {
      let temp = messages;
      console.log(messages);
      if (data.user === "client") {
        temp.push({
          id: messages.length+1,
          user: data.user,
          text: data.text,
        });
      } else {
        temp.push({
          id: messages.length+1,
          user: "admin",
          text: data.text,
        });
      }
      setMessages([...temp]);
    });
  }, [socket]);

  return (
    <div className="chat-container">
      {messages.map((i) => {
        return (
          <div key={i.id} className="message">
            <p style={{color: "black"}}>{i.text}</p>
            {(i.user === "client") && <span style={{color: "gray"}}>Cliente</span>}
            {(i.user === "admin") && <span style={{color: "red"}}>Admin</span>}
          </div>
        );
      })}
    </div>
  );
}

export { Chat }
