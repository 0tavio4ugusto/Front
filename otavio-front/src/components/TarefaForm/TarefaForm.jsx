import { useState } from "react";
import { createTarefa } from "../../services/api";
import styles from "./TarefaForm.module.css";

function TarefaForm({ onTarefaCreated }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    prioridade: "",
    categoria: "",
    data: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await createTarefa(formData);

      setSuccess("Tarefa cadastrada com sucesso!");

      setFormData({
        titulo: "",
        descricao: "",
        prioridade: "",
        categoria: "",
        data: "",
      });

      if (onTarefaCreated) {
        onTarefaCreated();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.title}>
        <h2>Nova Tarefa</h2>
        <p>Preencha os dados da tarefa</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Digite o título"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              name="descricao"
              type="text"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Digite a descrição"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="prioridade">Prioridade</label>
            <select
              id="prioridade"
              name="prioridade"
              value={formData.prioridade}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Alta">Alta</option>
              <option value="Media">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Estudos">Estudos</option>
              <option value="Saude">Saúde</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="data">Data de Vencimento</label>
            <input
              id="data"
              name="data"
              type="date"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {success && <div className={styles.success}>{success}</div>}
        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Cadastrando..." : "Cadastrar tarefa"}
        </button>
      </form>
    </section>
  );
}

export default TarefaForm;