import { DEPARTMENTS } from '../data/users.js';
import { formatEnum } from '../data/format.js';
import styles from './Form.module.css';

export default function StaffSearchBar({ filters, onChange }) {
  const update = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  return (
    <div className={`card ${styles.searchBar}`}>
      <div className={styles.field}>
        <label htmlFor="staffEmail">Search by email</label>
        <input
          id="staffEmail"
          type="search"
          placeholder="e.g. jane@company.com"
          value={filters.email}
          onChange={update('email')}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="staffDept">Department</label>
        <select id="staffDept" value={filters.department} onChange={update('department')}>
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
        onClick={() => onChange({ email: '', department: '' })}
      >
        Clear
      </button>
    </div>
  );
}
