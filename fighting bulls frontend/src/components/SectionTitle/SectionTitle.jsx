import styles from './SectionTitle.module.css';

export function SectionTitle({ children, subtitle = '' }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{children}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
