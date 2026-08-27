import { useState } from "react";
import Header from "./components/Header/Header";
import TarefaForm from "./components/TarefaForm/TarefaForm";
import TarefaList from "./components/TarefaList/TarefaList";
import styles from "./App.module.css";

function App() {
  const [refresh, setRefresh] = useState(0);

  function handleTarefaCreated() {
    setRefresh((previous) => previous + 1);
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.introduction}>
          <h2>Gerencie suas Tarefas</h2>
          <p>Cadastre novas tarefas e acompanhe suas atividades do dia a dia.</p>
        </section>

        <TarefaForm onTarefaCreated={handleTarefaCreated} />

        <TarefaList refresh={refresh} />
      </main>
    </>
  );
}

export default App;