import { DEPARTMENTS } from '../data/users.js';
import { TASK_STATUSES } from '../data/tasks.js';
import { formatEnum } from '../data/format.js';
import styles from './Form.module.css';

export default function TaskSearchBar({ filters, onChange }) {
  const update = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  return (
    <div className={`card ${styles.searchBar}`}>
      <div className={styles.field}>
        <label htmlFor="taskStatus">Status</label>
        <select id="taskStatus" value={filters.status} onChange={update('status')}>
          <option value="">All statuses</option>
          {TASK_STATUSES.map((s) => (
            <option key={s} value={s}>
              {formatEnum(s)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="taskDept">Department</label>
        <select id="taskDept" value={filters.department} onChange={update('department')}>
          <option value="">All departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {formatEnum(d)}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="btn"
        onClick={() => onChange({ status: '', department: '' })}
      >
        Clear
      </button>
    </div>
  );
}
