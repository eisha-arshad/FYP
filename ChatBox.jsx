// import React, { useState } from 'react';
// import styles from './ChatBox.module.css';

// function ChatBox() {
//   const [messages, setMessages] = useState([
//     { from: 'student', text: 'Hello Sir, I submitted my proposal.' },
//     { from: 'supervisor', text: 'Thanks, I’ll review it by tomorrow.' },
//   ]);
//   const [newMessage, setNewMessage] = useState('');

//   const handleSend = () => {
//     if (newMessage.trim()) {
//       setMessages([...messages, { from: 'student', text: newMessage }]);
//       setNewMessage('');

//       // 🔒 Future Backend Integration
//       /*
//       fetch('/api/chat/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           to: 'supervisor-id',
//           from: 'student-id',
//           message: newMessage
//         })
//       });
//       */
//     }
//   };

//   return (
//     <div className={styles.chatWrapper}>
//       <div className={styles.chatHeader}>🗨️ Student–Supervisor Chat</div>

//       <div className={styles.chatMessages}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={
//               msg.from === 'student' ? styles.studentMessage : styles.supervisorMessage
//             }
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className={styles.chatInputRow}>
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className={styles.chatInput}
//         />
//         <button onClick={handleSend} className={styles.sendButton}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;


import React, { useState } from 'react';
import styles from './ChatBox.module.css';

function ChatPanel() {
  const [messages, setMessages] = useState([
    { from: 'student', text: 'Sir, I’ve uploaded my final file.', time: '1:40 PM' },
    { from: 'supervisor', text: 'Got it, I’ll review it shortly.', time: '1:45 PM' }
  ]);
  const [newMsg, setNewMsg] = useState('');

  const handleSend = () => {
    if (newMsg.trim()) {
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { from: 'student', text: newMsg, time: timeNow }]);
      setNewMsg('');

      // Future Django integration here
      /*
      fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          to: 'supervisor-id',
          message: newMsg
        })
      });
      */
    }
  };

  return (
    <div className={styles.slChatWrapper}>
      <div className={styles.slChatHeader}>💬 Chat With Supervisor</div>

      <div className={styles.slChatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.from === 'student' ? styles.slStudentBubble : styles.slSupervisorBubble
            }
          >
            <div className={styles.slChatMeta}>
              <span className={styles.slAvatar}>
                {msg.from === 'student' ? '👩‍🎓' : '🧑‍🏫'}
              </span>
              <span className={styles.slTime}>{msg.time}</span>
            </div>
            <div className={styles.slChatText}>{msg.text}</div>
          </div>
        ))}
      </div>

      <div className={styles.slChatInput}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className={styles.slInputField}
        />
        <button onClick={handleSend} className={styles.slSendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
