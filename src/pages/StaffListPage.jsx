import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStaff } from '../data/users.js';
import StaffSearchBar from '../components/StaffSearchBar.jsx';
import StaffCard from '../components/StaffCard.jsx';
import Spinner from '../components/Spinner.jsx';

export default function StaffListPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ email: '', department: '' });

  useEffect(() => {
    getAllStaff()
      .then(setStaff)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const query = filters.email.trim().toLowerCase();
  const filtered = staff.filter(
    (s) =>
      (!query || (s.email || '').toLowerCase().includes(query)) &&
      (!filters.department || s.department === filters.department)
  );

  return (
    <>
      <div className="page-header">
        <h1>Staff</h1>
        <Link to="/staff/new" className="btn btn-primary">
          🧑‍💼 Register Staff
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <StaffSearchBar filters={filters} onChange={setFilters} />

      {loading ? (
        <Spinner label="Loading staff… (the server may take ~30s to wake up)" />
      ) : filtered.length === 0 ? (
        <div className="card empty">No staff match your search.</div>
      ) : (
        <div className="grid">
          {filtered.map((s) => (
            <StaffCard key={s.id} staff={s} />
          ))}
        </div>
      )}
    </>
  );
}
