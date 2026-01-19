import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <img 
          className={styles.logo} 
          src="/images/logo-bulls.jpeg" 
          alt="Logo Fighting Bulls Academy"
        />
        <h1>Fighting Bulls Academy</h1>
      </div>

      <p className={styles.subtitle}>Academia de Artes Marciales Mixtas</p>

      <div className={styles.headerActions}>
        <nav className={styles.nav}>
          <a href="#inicio">Inicio</a>
          <a href="#nosotros" title="Sección sobre información de la academia">Nosotros</a>
          <a href="#horarios" title="Sección donde puedes ver los horarios">Horarios</a>
          <a href="#clases">Clases</a>
          <a href="#contacto" title="Sección para contactarnos">Contacto</a>
        </nav>

        <div className={styles.socialLinks}>
          <span className={styles.socialTitle}>Síguenos en redes sociales</span>
          <div className={styles.socialIcons}>
            <a 
              className={`${styles.socialIcon} ${styles.facebook}`}
              href="https://www.facebook.com/mmaFightingBullsAcademy/?locale=es_LA"
              target="_blank"
              rel="noopener"
              aria-label="Facebook Fighting Bulls Academy"
            >
              <img src="/images/redes/facebook.jpg" alt="Facebook" />
            </a>

            <a 
              className={`${styles.socialIcon} ${styles.instagram}`}
              href="https://www.instagram.com/fightingbulls/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram Fighting Bulls Academy"
            >
              <img src="/images/redes/instagram.jpg" alt="Instagram" />
            </a>

            <a 
              className={`${styles.socialIcon} ${styles.whatsapp}`}
              href="https://wa.me/5215578296609"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp Fighting Bulls Academy"
            >
              <img src="/images/redes/whatsapp.jpg" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
