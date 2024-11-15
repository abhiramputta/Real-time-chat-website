import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./chatWindow.module.css";


export default function ChatWindow({ userId, contact, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [contact]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/messages", {
        params: { userId, contactId: contact._id },
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage) return;
    try {
      const response = await axios.post("http://localhost:5000/api/messages", {
        senderId: userId,
        receiverId: contact._id,
        content: newMessage,
      });
      setMessages([...messages, response.data.newMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatclose}>
        <h3>Chat with {contact.username}</h3>
        <button onClick={onClose} className={styles.closebutton}>
          ❌
        </button>
      </div>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={msg.sender === userId ? styles.sent : styles.received}
          >
            {msg.content}
          </div>
        ))}
      </div >
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className={styles.inputContainer1}
        />
        <button onClick={handleSendMessage} className={styles.button}>Send</button>
      </div>
    </div>
  );
}
