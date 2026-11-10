import { Link } from 'react-router-dom';
import { formatEnum } from '../data/format.js';
import styles from './StaffCard.module.css';

export default function StaffCard({ staff }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.top}>
        <h3>{staff.name}</h3>
        <span className={styles.dept}>{formatEnum(staff.department)}</span>
      </div>
      <p className={styles.line}>{staff.email || <span className="muted">No email</span>}</p>
      <p className={styles.line}>{staff.position || <span className="muted">No position</span>}</p>
      <div className={styles.actions}>
        <Link to={`/staff/${staff.id}`} className="btn">
          View
        </Link>
        <Link to={`/staff/${staff.id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </div>
  );
}
