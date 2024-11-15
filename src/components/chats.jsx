import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./chats.module.css";
import ChatWindow from "./ChatWindow";
import { UserContext } from "../UserContext";

export default function Chats() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const { userId, isContactAdded } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      axios
        .get("http://localhost:5000/getcontacts", { params: { userId } })
        .then((response) => setContacts(response.data.contacts))
        .catch((error) => {
          console.error("Error fetching contacts:", error);
        });
    }
  }, [userId, isContactAdded]);

  return (
    <div className={styles.maindiv}>
      <div className={styles.innerdiv1}>
        <h2 className={styles.head}>Contacts</h2>
      
        {contacts.length > 0 ? (
          <div className={styles.contactsList}>
            {contacts.map((contact) => (
              <button
                key={contact._id}
                className={styles.contactButton}
                onClick={() => setSelectedContact(contact)}
              >
                {contact.username}
              </button>
            ))}
          </div>
        ) : (
          <p>No contacts available.</p>
        )}
      </div>

      {selectedContact && (
        <ChatWindow
          userId={userId}
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
      {!selectedContact && (
        <div className={styles.chatdiv}> SELECT SOMEONE TO START THE CHAT</div>
      )}
    </div>
  );
}
