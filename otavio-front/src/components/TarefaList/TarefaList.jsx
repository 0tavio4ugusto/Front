import { useState, useEffect } from "react";
import { getTarefas } from "../../services/api";
import styles from "./TarefaList.module.css";

function TarefaList({ refresh }) {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getTarefas()
      .then(setTarefas)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) {
    return <p className={styles.message}>Carregando tarefas...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (tarefas.length === 0) {
    return <p className={styles.message}>Nenhuma tarefa cadastrada.</p>;
  }

  return (
    <section className={styles.section}>
      <h2>Tarefas Cadastradas ({tarefas.length})</h2>

      <div className={styles.list}>
        {tarefas.map((tarefa) => (
          <div key={tarefa.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <strong>{tarefa.titulo}</strong>
              <span className={styles[tarefa.prioridade.toLowerCase()]}>
                {tarefa.prioridade}
              </span>
            </div>
            <p>{tarefa.descricao}</p>
            <div className={styles.meta}>
              <span>📁 {tarefa.categoria}</span>
              <span>📅 {tarefa.data}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TarefaList;