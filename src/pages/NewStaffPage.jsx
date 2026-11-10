import { useNavigate } from 'react-router-dom';
import StaffForm from '../components/StaffForm.jsx';
import { createStaff } from '../data/users.js';
import styles from './NewStaffPage.module.css';

export default function NewStaffPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const created = await createStaff(values);
    navigate(created?.id ? `/staff/${created.id}` : '/staff');
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Register Staff</h1>
        <p className="muted">Fields marked * are required.</p>
      </div>
      <StaffForm
        submitLabel="Register Staff"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/staff')}
      />
    </>
  );
}
