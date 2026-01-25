import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import styles from './Horarios.module.css';

export function Horarios() {
  return (
    <section id="horarios" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle subtitle="Consulta nuestros horarios y encuentra el mejor momento para entrenar.">
          Horarios
        </SectionTitle>

        <div className={styles.imageWrapper}>
          <img
            src="/images/horarios/horarios.jpg"
            alt="Horarios Fighting Bulls Academy"
            title="Horarios Fighting Bulls Academy"
          />
        </div>
      </div>
    </section>
  );
}
