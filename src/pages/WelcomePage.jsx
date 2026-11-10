import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, TASK_STATUSES } from '../data/tasks.js';
import { formatEnum } from '../data/format.js';
import TaskSearchBar from '../components/TaskSearchBar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import Spinner from '../components/Spinner.jsx';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: '', department: '' });

  useEffect(() => {
    getAllTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const counts = TASK_STATUSES.reduce((acc, s) => {
    acc[s] = tasks.filter((t) => t.status === s).length;
    return acc;
  }, {});

  const filtered = tasks.filter(
    (t) =>
      (!filters.status || t.status === filters.status) &&
      (!filters.department || t.staff?.department === filters.department)
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Welcome to TaskFlow</h1>
          <p className="muted">Log, track and search staff tasks in one place.</p>
        </div>
        <Link to="/tasks/new" className="btn btn-primary">
          ➕ Add Task
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <section className={styles.stats}>
        {TASK_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            className={`${styles.stat} ${styles[s.toLowerCase()]} ${
              filters.status === s ? styles.selected : ''
            }`}
            onClick={() =>
              setFilters((f) => ({ ...f, status: f.status === s ? '' : s }))
            }
          >
            <span className={styles.count}>{loading ? '…' : counts[s]}</span>
            <span className={styles.label}>{formatEnum(s)}</span>
          </button>
        ))}
      </section>

      <h2>Search tasks</h2>
      <TaskSearchBar filters={filters} onChange={setFilters} />

      {loading ? (
        <Spinner label="Loading tasks… (the server may take ~30s to wake up)" />
      ) : filtered.length === 0 ? (
        <div className="card empty">No tasks match your search.</div>
      ) : (
        <div className="grid">
          {filtered.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>
      )}
    </>
  );
}
