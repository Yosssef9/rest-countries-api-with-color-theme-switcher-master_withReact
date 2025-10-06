import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
export default function Header({ darkMode, setDarkMode }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Where in the world?</h1>
        <div
          onClick={() => setDarkMode((prev) => !prev)}
          className={styles.darkModeIcon}
        >
          <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
          <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </header>
    </>
  );
}
