import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import styles from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <div className={styles.shell}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
