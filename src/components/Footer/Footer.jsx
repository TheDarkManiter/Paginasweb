import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <img 
            src="/images/logo-bulls.jpeg" 
            alt="Fighting Bulls Academy" 
            className={styles.logo}
          />
          <p className={styles.name}>Fighting Bulls Academy</p>
          <p className={styles.copy}>© 2026 · Todos los derechos reservados</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.powered}>
          <span className={styles.poweredText}>Powered by</span>
          <img 
            src="/images/logo-cosmic-flow.png" 
            alt="Cosmic Flow Digital" 
            className={`${styles.logo} ${styles.cosmic}`}
          />
          <p className={styles.poweredName}>Cosmic Flow Digital</p>
        </div>
      </div>
    </footer>
  );
}
