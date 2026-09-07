import { useState, useEffect } from "react";
import { createTarefa, updateTarefa } from "../../services/api";
import styles from "./TarefaForm.module.css";

const emptyForm = {
  titulo: "",
  descricao: "",
  prioridade: "",
  categoria: "",
  data: "",
};

function TarefaForm({ onTarefaSaved, editing, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setFormData({
        titulo: editing.titulo,
        descricao: editing.descricao,
        prioridade: editing.prioridade,
        categoria: editing.categoria,
        data: editing.data,
      });
      setSuccess("");
      setError("");
    } else {
      setFormData(emptyForm);
    }
  }, [editing]);

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
      if (editing) {
        await updateTarefa(editing.id, formData);
        setSuccess("Tarefa atualizada com sucesso!");
      } else {
        await createTarefa(formData);
        setSuccess("Tarefa cadastrada com sucesso!");
      }

      setFormData(emptyForm);

      if (onTarefaSaved) {
        onTarefaSaved();
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
        <h2>{editing ? "Editar Tarefa" : "Nova Tarefa"}</h2>
        <p>{editing ? "Atualize os dados da tarefa" : "Preencha os dados da tarefa"}</p>
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

        <div className={styles.actions}>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading
              ? editing ? "Salvando..." : "Cadastrando..."
              : editing ? "Salvar alterações" : "Cadastrar tarefa"}
          </button>

          {editing && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TarefaForm;
