import { request } from './api.js';

export const TASK_STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

const SUPPORT_PATH = import.meta.env.VITE_SUPPORT_PATH || '/support';

function toPayload(values) {
  return {
    taskName: values.taskName.trim(),
    description: values.description.trim(),
    status: values.status,
    staff: { id: Number(values.staffId) },
  };
}

export const getAllTasks = () => request('/tasks');
export const getTask = (id) => request(`/tasks/${id}`);

export const createTask = (values) =>
  request('/tasks', { method: 'POST', body: JSON.stringify(toPayload(values)) });

export const updateTask = (id, values) =>
  request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(toPayload(values)) });

export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });

export const completeTask = (id) => request(`/tasks/${id}/complete`, { method: 'PUT' });

// AI support: GET {SUPPORT_PATH}?message=...
export async function askSupport(message) {
  const data = await request(`${SUPPORT_PATH}?message=${encodeURIComponent(message)}`);
  if (typeof data === 'string') return data;
  return data?.response || data?.answer || data?.message || JSON.stringify(data);
}

// Mirrors the backend validation rules; returns { field: message }
export function validateTask(values) {
  const errors = {};
  if (!values.taskName.trim()) errors.taskName = 'Task name cannot be blank';
  if (!values.description.trim()) errors.description = 'Description cannot be blank';
  if (!TASK_STATUSES.includes(values.status)) errors.status = 'Status cannot be null';
  if (!values.staffId) errors.staffId = 'Staff is required';
  return errors;
}
