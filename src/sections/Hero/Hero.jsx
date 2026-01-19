import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="inicio" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.image}>
          <img 
            src="/images/hero/maestro-jiu-jitsu.jpg" 
            alt="Maestro de Jiu Jitsu en Fighting Bulls Academy"
          />
        </div>

        <div className={styles.text}>
          <h2>Encuentra tu fortaleza</h2>
          <p>Mantente en forma. Mantente sano. Siéntete bien.</p>
          <p>
            Nuestras instalaciones están adecuadas a las necesidades de todas nuestras clases y alumnos.
            Nuestros coaches están altamente capacitados para entrenarte, ayudarte y apoyarte en cada clase.
          </p>
          <p>
            Ven a entrenar en un ambiente agradable, cómodo y seguro.
            Buscamos que tengas la mejor experiencia posible en cada visita a nuestra academia.
          </p>
        </div>
      </div>
    </section>
  );
}
