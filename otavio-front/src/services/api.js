const API_URL = "http://localhost:8080";

export async function getTarefas() {
  const response = await fetch(`${API_URL}/tarefas`);
  if (!response.ok) {
    throw new Error("Não foi possível carregar as tarefas.");
  }
  return response.json();
}

export async function createTarefa(tarefa) {
  const response = await fetch(`${API_URL}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });
  if (!response.ok) {
    throw new Error("Não foi possível cadastrar a tarefa.");
  }
  return response.json();
}