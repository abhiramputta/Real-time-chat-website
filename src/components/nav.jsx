import { React, useContext, useState } from "react";
import styles from "./nav.module.css";
import { UserContext } from "../UserContext";
import AddMember from "./AddMember.jsx";
import Aboutus from "./Aboutus.jsx";
import Contactus from "./Contactus.jsx";

export default function Nav() {
  const { userId } = useContext(UserContext);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isaboutOpen, setaboutOpen] = useState(false);
  const [iscontactOpen, setcontactOpen] = useState(false);

  function handleaddmem() {
    console.log("Add member clicked");
    if (!userId) {
      console.log("Make sure the user is logged in first");
    } else {
      setIsAddMemberOpen(true);
    }
  }

  return (
    <div className={styles.navdiv}>
      <div className={styles.headingdiv}>
        <h1>Chat App</h1>
      </div>
      <div className={styles.navlist}>
        <ul>
          <li>
            <button onClick={handleaddmem}>Add member</button>
          </li>
          <li>
            <button onClick={(e) => setaboutOpen(true)}>About</button>
          </li>
          <li>
            <button onClick={(e) => setcontactOpen(true)}>Contactus</button>
          </li>
        </ul>
        {/* Pass a function that sets isAddMemberOpen to false */}
        {isAddMemberOpen && (
          <AddMember onClose={() => setIsAddMemberOpen(false)} />
        )}

        {isaboutOpen && <Aboutus onClose={() => setaboutOpen(false)} />}
        {iscontactOpen && <Contactus onClose={() => setcontactOpen(false)} />}
      </div>
    </div>
  );
}
