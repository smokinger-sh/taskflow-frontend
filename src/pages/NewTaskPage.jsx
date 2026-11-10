import { useNavigate, useSearchParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx';
import { createTask } from '../data/tasks.js';
import styles from './NewTaskPage.module.css';

export default function NewTaskPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleSubmit = async (values) => {
    const created = await createTask(values);
    navigate(created?.id ? `/tasks/${created.id}` : '/');
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Add Task</h1>
        <p className="muted">Fields marked * are required.</p>
      </div>
      <TaskForm
        initialValues={{ staffId: params.get('staffId') || '' }}
        submitLabel="Add Task"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </>
  );
}
