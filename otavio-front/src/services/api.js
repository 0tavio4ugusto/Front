import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function getTarefas() {
  const response = await api.get("/tarefas");
  return response.data;
}

export async function createTarefa(tarefa) {
  const response = await api.post("/tarefas", tarefa);
  return response.data;
}

export async function updateTarefa(id, tarefa) {
  const response = await api.put(`/tarefas/${id}`, tarefa);
  return response.data;
}

export async function deleteTarefa(id) {
  const response = await api.delete(`/tarefas/${id}`);
  return response.data;
}
