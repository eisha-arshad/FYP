// import React, { useState } from 'react';
// import styles from './ChatBox-sp.module.css';

// function SupervisorChatBox() {
//   const [messages, setMessages] = useState([
//     { from: 'student', text: 'Sir, I have uploaded my progress.' },
//     { from: 'supervisor', text: 'Thanks, I’ll check it shortly.' },
//   ]);
//   const [newMessage, setNewMessage] = useState('');

//   const handleSend = () => {
//     if (newMessage.trim()) {
//       setMessages([...messages, { from: 'supervisor', text: newMessage }]);
//       setNewMessage('');

//       // 🔐 Backend integration - Django endpoint (commented out for now)
//       /*
//       fetch('/api/chat/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           to: 'student-id',
//           from: 'supervisor-id',
//           message: newMessage
//         })
//       });
//       */
//     }
//   };

//   return (
//     <div className={styles.spChatWrapper}>
//       <div className={styles.spChatHeader}>🧑‍🏫 Supervisor–Student Chat</div>

//       <div className={styles.spChatMessages}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={
//               msg.from === 'supervisor'
//                 ? styles.spSupervisorMessage
//                 : styles.spStudentMessage
//             }
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className={styles.spChatInputRow}>
//         <input
//           type="text"
//           placeholder="Type your reply..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className={styles.spChatInput}
//         />
//         <button onClick={handleSend} className={styles.spSendButton}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SupervisorChatBox;


import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import styles from './ChatBox-sp.module.css';

function SupervisorChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'student', text: 'Sir, I’ve uploaded the final draft.', time: '9:30 AM' },
    { from: 'supervisor', text: 'Thanks, I’ll review it shortly.', time: '9:33 AM' }
  ]);
  const [newMsg, setNewMsg] = useState('');

  const handleSend = () => {
    if (newMsg.trim()) {
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { from: 'supervisor', text: newMsg, time: timeNow }]);
      setNewMsg('');

      // Future Django integration
      /*
      fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'student-id',
          message: newMsg
        })
      });
      */
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div className={styles.spChatIcon} onClick={() => setIsOpen(!isOpen)}>
        <FaCommentDots />
      </div>

      {/* Chat Panel Popup */}
      {isOpen && (
        <div className={styles.spChatPopup}>
          <div className={styles.spChatWrapper}>
            <div className={styles.spChatHeader}>🧑‍🏫 Supervisor Chat</div>

            <div className={styles.spMessageArea}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.from === 'supervisor' ? styles.spMsgRight : styles.spMsgLeft
                  }
                >
                  <div className={styles.spMeta}>
                    <span className={styles.spAvatar}>
                      {msg.from === 'supervisor' ? '👨‍🏫' : '🎓'}
                    </span>
                    <span className={styles.spTimestamp}>{msg.time}</span>
                  </div>
                  <div className={styles.spText}>{msg.text}</div>
                </div>
              ))}
            </div>

            <div className={styles.spInputRow}>
              <input
                type="text"
                placeholder="Type your message..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className={styles.spInput}
              />
              <button onClick={handleSend} className={styles.spSendBtn}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SupervisorChatWidget;
