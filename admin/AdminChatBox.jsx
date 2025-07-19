import React, { useState } from 'react';
import styles from './AdminChatBox.module.css';

const AdminChatBox = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setShowChat(!showChat);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input }]);
      setInput('');
    }
  };

  return (
    <>
      <div className={styles.chatIcon} onClick={toggleChat}>💬</div>
      {showChat && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <span>Admin Support</span>
            <button onClick={toggleChat}>✖</button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <p key={idx}>{msg.text}</p>
            ))}
          </div>
          <div className={styles.chatInput}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminChatBox;
