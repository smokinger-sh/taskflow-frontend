import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx';
import Spinner from '../components/Spinner.jsx';
import { getTask, updateTask } from '../data/tasks.js';
import styles from './EditTaskPage.module.css';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getTask(id)
      .then(setTask)
      .catch((err) => setError(err.message));
  }, [id]);

  const handleSubmit = async (values) => {
    await updateTask(id, values);
    navigate(`/tasks/${id}`);
  };

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!task) return <Spinner label="Loading task…" />;

  return (
    <>
      <div className={styles.header}>
        <h1>Edit Task #{task.id}</h1>
      </div>
      <TaskForm
        initialValues={{
          taskName: task.taskName || '',
          description: task.description || '',
          status: task.status || 'PENDING',
          staffId: task.staff?.id ? String(task.staff.id) : '',
        }}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/tasks/${id}`)}
      />
    </>
  );
}
