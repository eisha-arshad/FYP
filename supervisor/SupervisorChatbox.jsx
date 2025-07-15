import React, { useState, useRef, useEffect } from 'react';
import { FaCommentDots, FaPaperPlane, FaPaperclip } from 'react-icons/fa';
import styles from './SupervisorChatBox.module.css';
import studentAvatar from '../../../../assets/images/profile.png';
import supervisorAvatar from '../../../../assets/images/profile.png';

const StudentChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMsg, setNewMsg] = useState('');
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      from: 'student',
      name: 'Eisha',
      avatar: studentAvatar,
      text: 'Sir, I’ve uploaded the final draft.',
      time: '9:30 AM'
    },
    {
      from: 'supervisor',
      name: 'Dr. Aslam',
      avatar: supervisorAvatar,
      text: 'Thanks, I’ll review it shortly.',
      time: '9:33 AM'
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMsg.trim()) {
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage = {
        from: 'student',
        name: 'Eisha',
        avatar: studentAvatar,
        text: newMsg,
        time: timeNow
      };
      setMessages((prev) => [...prev, newMessage]);
      setNewMsg('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        from: 'student',
        name: 'Eisha',
        avatar: studentAvatar,
        text: `📎 Sent a file: ${file.name}`,
        time: timeNow
      }
    ]);
  };

  return (
    <>
      <div className={styles.chatIcon} onClick={() => setIsOpen(!isOpen)} title="Chat with Supervisor">
        <FaCommentDots />
      </div>

      {isOpen && (
        <div className={styles.chatPopup}>
          <div className={styles.chatWrapper}>
            <div className={styles.chatHeader}>🎓 Student Chat</div>

            <div className={styles.messageArea} ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.messageRow} ${
                    msg.from === 'student' ? styles.right : styles.left
                  }`}
                >
                  <img src={msg.avatar} className={styles.avatar} alt={`${msg.name}`} />
                  <div>
                    <div className={styles.nameTime}>
                      <span className={styles.name}>{msg.name}</span>
                      <span className={styles.time}>{msg.time}</span>
                    </div>
                    <div className={styles.bubble}>{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.inputRow}>
              <button
                className={styles.attachmentBtn}
                onClick={() => fileInputRef.current.click()}
                title="Upload file"
              >
                <FaPaperclip />
              </button>
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Type your message..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
              />
              <button className={styles.sendBtn} onClick={handleSend} title="Send">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentChatWidget;
