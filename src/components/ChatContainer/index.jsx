import React from 'react';
import './ChatContainer.scss';

function ChatContainer({ children }) {
  //const chatContainer = document.querySelector('.chat-container');
  //chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
  return (
    <div className="chat-container">
      {children}
    </div>
  );
}

export { ChatContainer };
