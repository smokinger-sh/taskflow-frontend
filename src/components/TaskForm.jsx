import { useEffect, useState } from 'react';
import { getAllStaff } from '../data/users.js';
import { TASK_STATUSES, validateTask } from '../data/tasks.js';
import { formatEnum } from '../data/format.js';
import Spinner from './Spinner.jsx';
import styles from './Form.module.css';

const EMPTY = { taskName: '', description: '', status: 'PENDING', staffId: '' };

// Shared by NewTaskPage and EditTaskPage
export default function TaskForm({ initialValues, onSubmit, submitLabel = 'Save', onCancel }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(true);

  useEffect(() => {
    getAllStaff()
      .then(setStaffList)
      .catch((err) => setServerError(`Could not load staff: ${err.message}`))
      .finally(() => setLoadingStaff(false));
  }, []);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateTask(values);
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

  if (loadingStaff) return <Spinner label="Loading staff…" />;

  return (
    <form className={`card ${styles.form}`} onSubmit={handleSubmit} noValidate>
      {serverError && <div className="alert alert-error">{serverError}</div>}

      <div className={styles.field}>
        <label htmlFor="taskName">Task name *</label>
        <input
          id="taskName"
          className={errors.taskName ? styles.invalid : ''}
          value={values.taskName}
          onChange={update('taskName')}
          placeholder="Install Microsoft Word"
        />
        {errors.taskName && <span className={styles.error}>{errors.taskName}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          rows={4}
          className={errors.description ? styles.invalid : ''}
          value={values.description}
          onChange={update('description')}
          placeholder="Describe the request…"
        />
        {errors.description && <span className={styles.error}>{errors.description}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          className={errors.status ? styles.invalid : ''}
          value={values.status}
          onChange={update('status')}
        >
          {TASK_STATUSES.map((s) => (
            <option key={s} value={s}>
              {formatEnum(s)}
            </option>
          ))}
        </select>
        {errors.status && <span className={styles.error}>{errors.status}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="staffId">Staff *</label>
        <select
          id="staffId"
          className={errors.staffId ? styles.invalid : ''}
          value={values.staffId}
          onChange={update('staffId')}
        >
          <option value="">Select staff…</option>
          {staffList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({formatEnum(s.department)})
            </option>
          ))}
        </select>
        {errors.staffId && <span className={styles.error}>{errors.staffId}</span>}
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
