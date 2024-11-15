import styles from "./Addmember.module.css";
export default function Aboutus({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.addMemberContainer}>
        <div class={styles.onClose}>
          <h1>Contact info</h1>
          <button onClick={() => onClose()}>❌</button>
        </div>

        <div>
          <button
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/abhiram-putta/",
                "_blank"
              );
            }}
          >
            Linkdeln
          </button>
          <button
            onClick={() => {
              window.open(
                "https://abhiramputta.github.io/Portfolio/",
                "_blank"
              );
            }}
          >
            Portfolio
          </button>
          <button
            onClick={() => {
              window.open("https://github.com/abhiramputta", "_blank");
            }}
          >
            Github
          </button>
          <button
            onClick={() => {
              window.location.href = "mailto:abhiramputta3113@gmail.com";
            }}
          >
            Gmail
          </button>
        </div>
      </div>
    </div>
  );
}
