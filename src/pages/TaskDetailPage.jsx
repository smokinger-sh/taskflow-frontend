import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { completeTask, deleteTask, getTask } from '../data/tasks.js';
import { formatDate, formatEnum } from '../data/format.js';
import { StatusBadge } from '../components/TaskCard.jsx';
import Spinner from '../components/Spinner.jsx';
import styles from './TaskDetailPage.module.css';

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getTask(id)
      .then(setTask)
      .catch((err) => setError(err.message));
  }, [id]);

  const handleComplete = async () => {
    setBusy(true);
    setError('');
    try {
      await completeTask(id);
      setTask(await getTask(id)); // refresh so status + data are accurate
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete task "${task.taskName}"? This cannot be undone.`)) return;
    setBusy(true);
    setError('');
    try {
      await deleteTask(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  if (!task && error) return <div className="alert alert-error">{error}</div>;
  if (!task) return <Spinner label="Loading task…" />;

  return (
    <>
      <div className="page-header">
        <h1>{task.taskName}</h1>
        <StatusBadge status={task.status} />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <dl className={`card ${styles.details}`}>
        <dt>Task ID</dt>
        <dd>{task.id}</dd>
        <dt>Description</dt>
        <dd>{task.description}</dd>
        <dt>Status</dt>
        <dd>{formatEnum(task.status)}</dd>
        <dt>Raised by</dt>
        <dd>
          {task.staff ? (
            <Link to={`/staff/${task.staff.id}`}>{task.staff.name}</Link>
          ) : (
            '—'
          )}
          {task.staff?.department && ` · ${formatEnum(task.staff.department)}`}
        </dd>
        <dt>Logged</dt>
        <dd>{formatDate(task.logtime)}</dd>
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleComplete}
          disabled={busy || task.status === 'COMPLETED'}
        >
          ✔ Mark Complete
        </button>
        <Link to={`/tasks/${task.id}/edit`} className="btn">
          ✏️ Edit
        </Link>
        <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={busy}>
          🗑 Delete
        </button>
      </div>
    </>
  );
}
