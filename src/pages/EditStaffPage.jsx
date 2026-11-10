import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StaffForm from '../components/StaffForm.jsx';
import Spinner from '../components/Spinner.jsx';
import { getStaffById, updateStaff } from '../data/users.js';
import styles from './EditStaffPage.module.css';

export default function EditStaffPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getStaffById(id)
      .then(setStaff)
      .catch((err) => setError(err.message));
  }, [id]);

  const handleSubmit = async (values) => {
    await updateStaff(id, values);
    navigate(`/staff/${id}`);
  };

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!staff) return <Spinner label="Loading staff…" />;

  return (
    <>
      <div className={styles.header}>
        <h1>Edit Staff</h1>
        <p className="muted">Update details for {staff.name}.</p>
      </div>
      <StaffForm
        initialValues={{
          name: staff.name || '',
          email: staff.email || '',
          department: staff.department || '',
          position: staff.position || '',
        }}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/staff/${id}`)}
      />
    </>
  );
}
