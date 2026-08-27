import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1>Organização Pessoal</h1>
      <p>Gerencie suas tarefas do dia a dia</p>
    </header>
  );
}

export default Header;