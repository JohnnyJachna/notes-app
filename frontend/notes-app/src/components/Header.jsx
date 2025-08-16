import { Link } from "react-router";
import DarkThemeToggle from "../../flowbite-react";
import styles from "./css-modules/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h2>Notes App</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sets">Sets</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <DarkThemeToggle />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
