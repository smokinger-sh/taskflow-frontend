import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const links = [
  { to: '/', label: '🏠 Dashboard & Tasks', end: true },
  { to: '/tasks/new', label: '➕ Add Task' },
  { to: '/staff', label: '👥 Staff' },
  { to: '/staff/new', label: '🧑‍💼 Register Staff' },
  { to: '/support', label: '🤖 AI Support' },
];

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
