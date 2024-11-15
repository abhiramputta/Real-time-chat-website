import styles from "./Addmember.module.css";

export default function Aboutus({ onClose }) {
  function handleabout() {
    window.open("https://abhiramputta.github.io/Portfolio/", "_blank"); // Replace with your URL
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.addMemberContainer}>
        <div className={styles.onClose}>
          <h4>About Us</h4>
          <button onClick={() => onClose()}>❌</button>
        </div>

        <p>Click here to know about the developer</p>
        <div>
          <button onClick={handleabout}>Visit my page</button>
        </div>
      </div>
    </div>
  );
}
