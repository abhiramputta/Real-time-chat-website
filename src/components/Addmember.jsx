import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import styles from "./Addmember.module.css"; // Import CSS module styles

export default function AddMember({ onClose }) {
  const [contactname, setContactname] = useState("");
  const { userId, isContactAdded, setContactAdded } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleOnSubmit() {
    if (!contactname) {
      setErrorMessage("Contact name cannot be empty");
      return;
    }
    setErrorMessage(""); // Clear any previous error message

    console.log("Adding member with:", { contactname, userId });

    try {
      const response = await axios.post("http://localhost:5000/api/addmember", {
        contactname,
        userId,
      });
      console.log("Member added successfully", response.data);
      setContactAdded(!isContactAdded);
      onClose();
    } catch (error) {
      console.error(
        "Error adding member:",
        error.response?.data || error.message
      );
      setErrorMessage(error.response?.data?.message || "Server error occurred");
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.addMemberContainer}>
        <input
          type="text"
          value={contactname}
          onChange={(e) => setContactname(e.target.value)}
          placeholder="Enter the user name"
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.onClose}>
          <button
            type="button"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={handleOnSubmit}
          >
            Submit
          </button>
          <button type="button" onClick={onClose}>
            ❌
          </button>
        </div>
      </div>
    </div>
  );
}
