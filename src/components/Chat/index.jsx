import React from "react";
import "./Chat.scss";

function Chat({ socket, messages, setMessages }) {
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    socket.on("message", (data) => {
      let temp = messages;
      console.log(messages);
      if (data.user === "client") {
        temp.push({
          id: messages.length + 1,
          user: data.user,
          text: data.text,
        });
      } else {
        temp.push({
          id: messages.length + 1,
          user: "admin",
          text: data.text,
        });
      }
      setMessages([...temp]);
    });
    socket.on("handoff", () => {
      socket.emit("handoff", messages);
    });
    scrollToBottom()
  }, [socket]);

  return (
    <>
      {messages.map((i) => {
        return (
          <div
            key={i.id}
            className={i.user === "admin" ? "message-admin" : "message-client"}
          >
            <div className="message-container">
              <p>{i.text}</p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
}

export { Chat };
