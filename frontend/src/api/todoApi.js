import { API_URL } from '../config';

async function request(path = '', options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

export const getTodos = () => request();

export const createTodo = (title) =>
  request('', { method: 'POST', body: JSON.stringify({ title }) });

export const updateTodo = (id, changes) =>
  request(`/${id}`, { method: 'PUT', body: JSON.stringify(changes) });

export const deleteTodo = (id) => request(`/${id}`, { method: 'DELETE' });
