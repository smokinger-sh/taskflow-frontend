import { useState } from 'react';
import { DEPARTMENTS, validateStaff } from '../data/users.js';
import { formatEnum } from '../data/format.js';
import styles from './Form.module.css';

const EMPTY = { name: '', email: '', department: '', position: '' };

// Shared by NewStaffPage and EditStaffPage
export default function StaffForm({ initialValues, onSubmit, submitLabel = 'Save', onCancel }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateStaff(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    setServerError('');
    try {
      await onSubmit(values);
    } catch (err) {
      setServerError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form className={`card ${styles.form}`} onSubmit={handleSubmit} noValidate>
      {serverError && <div className="alert alert-error">{serverError}</div>}

      <div className={styles.field}>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          className={errors.name ? styles.invalid : ''}
          value={values.name}
          onChange={update('name')}
          placeholder="Jane Tan"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={errors.email ? styles.invalid : ''}
          value={values.email}
          onChange={update('email')}
          placeholder="jane.tan@company.com"
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="department">Department *</label>
        <select
          id="department"
          className={errors.department ? styles.invalid : ''}
          value={values.department}
          onChange={update('department')}
        >
          <option value="">Select department…</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {formatEnum(d)}
            </option>
          ))}
        </select>
        {errors.department && <span className={styles.error}>{errors.department}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="position">Position</label>
        <input
          id="position"
          value={values.position}
          onChange={update('position')}
          placeholder="Software Engineer"
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
