import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStaffById } from '../data/users.js';
import { getAllTasks } from '../data/tasks.js';
import { formatEnum } from '../data/format.js';
import TaskCard from '../components/TaskCard.jsx';
import Spinner from '../components/Spinner.jsx';
import styles from './StaffDetailPage.module.css';

export default function StaffDetailPage() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getStaffById(id), getAllTasks()])
      .then(([s, allTasks]) => {
        setStaff(s);
        setTasks(allTasks.filter((t) => String(t.staff?.id) === String(id)));
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!staff) return <Spinner label="Loading staff…" />;

  return (
    <>
      <div className="page-header">
        <h1>{staff.name}</h1>
        <div className={styles.actions}>
          <Link to={`/staff/${staff.id}/edit`} className="btn btn-primary">
            ✏️ Edit
          </Link>
          <Link to={`/tasks/new?staffId=${staff.id}`} className="btn">
            ➕ Add Task
          </Link>
        </div>
      </div>

      <dl className={`card ${styles.details}`}>
        <dt>Email</dt>
        <dd>{staff.email || '—'}</dd>
        <dt>Department</dt>
        <dd>{formatEnum(staff.department)}</dd>
        <dt>Position</dt>
        <dd>{staff.position || '—'}</dd>
      </dl>

      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <div className="card empty">This staff member has no tasks yet.</div>
      ) : (
        <div className="grid">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>
      )}
    </>
  );
}
