import styles from './Spinner.module.css';

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className={styles.wrapper} role="status">
      <div className={styles.spinner} />
      <p>{label}</p>
    </div>
  );
}
