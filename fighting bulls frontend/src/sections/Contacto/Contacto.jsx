import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { ContactForm } from './ContactForm';
import styles from './Contacto.module.css';

export function Contacto() {
  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle subtitle="Déjanos tus datos y te contactamos para agendar tu clase de prueba.">
          Contacto
        </SectionTitle>

        <ContactForm />
      </div>
    </section>
  );
}
