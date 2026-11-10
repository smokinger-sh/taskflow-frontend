import { Link } from 'react-router-dom';
import { formatDate, formatEnum } from '../data/format.js';
import styles from './TaskCard.module.css';

export function StatusBadge({ status }) {
  const cls = status ? styles[status.toLowerCase()] : '';
  return <span className={`${styles.badge} ${cls}`}>{formatEnum(status)}</span>;
}

export default function TaskCard({ task }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.top}>
        <h3>{task.taskName}</h3>
        <StatusBadge status={task.status} />
      </div>
      <p className={styles.desc}>{task.description}</p>
      <p className={styles.meta}>
        {task.staff?.name || 'Unknown staff'}
        {task.staff?.department && ` · ${formatEnum(task.staff.department)}`}
      </p>
      <p className={styles.meta}>Logged: {formatDate(task.logtime)}</p>
      <Link to={`/tasks/${task.id}`} className="btn">
        View task
      </Link>
    </div>
  );
}
