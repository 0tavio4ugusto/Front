import { useState } from "react";
import Header from "./components/Header/Header";
import TarefaForm from "./components/TarefaForm/TarefaForm";
import TarefaList from "./components/TarefaList/TarefaList";
import styles from "./App.module.css";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [editing, setEditing] = useState(null);

  function handleTarefaSaved() {
    setEditing(null);
    setRefresh((previous) => previous + 1);
  }

  function handleEdit(tarefa) {
    setEditing(tarefa);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditing(null);
  }

  function handleDelete() {
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

        <TarefaForm
          onTarefaSaved={handleTarefaSaved}
          editing={editing}
          onCancelEdit={handleCancelEdit}
        />

        <TarefaList
          refresh={refresh}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </>
  );
}

export default App;
