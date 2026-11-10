import { request } from './api.js';

export const DEPARTMENTS = ['HR', 'ENGINEERING', 'SALES', 'MARKETING'];

// Same pattern as the backend @Pattern on Staff.email
export const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;

// GET /staff
export const getAllStaff = () => request('/staff');

// The API has no GET /staff/{id}, so find it in the full list
export async function getStaffById(id) {
  const all = await getAllStaff();
  const found = all.find((s) => String(s.id) === String(id));
  if (!found) throw new Error('Staff member not found');
  return found;
}

function toPayload(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim() || null,
    department: values.department,
    position: values.position.trim() || null,
  };
}

// POST /staff
export const createStaff = (values) =>
  request('/staff', { method: 'POST', body: JSON.stringify(toPayload(values)) });

// PUT /staff/{id}  (not in the documented API list - see README note)
export const updateStaff = (id, values) =>
  request(`/staff/${id}`, { method: 'PUT', body: JSON.stringify(toPayload(values)) });

// Mirrors the backend validation rules; returns { field: message }
export function validateStaff(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is mandatory';
  if (values.email.trim() && !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Invalid email format';
  }
  if (!DEPARTMENTS.includes(values.department)) {
    errors.department = 'Invalid department';
  }
  return errors;
}
