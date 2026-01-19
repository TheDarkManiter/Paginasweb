import { useScrollTopButton } from '../../hooks/useScrollTopButton';
import { useDelayedPulse } from '../../hooks/useDelayedPulse';
import { useFormVisibility } from '../../hooks/useFormVisibility';
import { WHATSAPP_URL } from '../../config/contact';
import styles from './FloatingActions.module.css';

export function FloatingActions() {
  const { isVisible: showTopButton, scrollToTop } = useScrollTopButton();
  const shouldPulse = useDelayedPulse(5000);
  const formVisible = useFormVisibility('contacto');

  return (
    <div className={styles.container} aria-label="Acciones rápidas">
      {/* WhatsApp Flotante */}
      <a
        href={WHATSAPP_URL}
        className={`
          ${styles.fab}
          ${styles.whatsapp}
          ${shouldPulse && !formVisible ? styles.pulse : ''}
          ${formVisible ? styles.hidden : ''}
        `}
        target="_blank"
        rel="noopener"
        aria-label="Escríbenos por WhatsApp"
      >
        <img src="/images/redes/whatsapp.jpg" alt="WhatsApp" />
      </a>

      {/* Subir al inicio */}
      <button
        id="toTopBtn"
        className={`
          ${styles.fab}
          ${styles.top}
          ${!showTopButton ? styles.hidden : ''}
        `}
        onClick={scrollToTop}
        aria-label="Subir al inicio"
      >
        ↑
      </button>
    </div>
  );
}
