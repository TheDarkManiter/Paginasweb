import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import styles from './Clases.module.css';

const classesData = [
  {
    name: 'Jiu-Jitsu Brasileño',
    description: 'Técnica, control y estrategia. Aprende defensa personal real, mejora tu condición y progresa por niveles con fundamentos sólidos, sparring controlado y coaching cercano.',
    tags: ['Principiantes & Avanzados', 'Gi / No-Gi', 'Progresión por nivel'],
    image: '/images/clases/jiujitsu.jpg',
    reverse: false,
  },
  {
    name: 'Muay Thai',
    description: 'La ciencia de las ocho armas. Potencia tu striking con técnica, acondicionamiento y combinación de golpes (puños, codos, rodillas y piernas) en un ambiente seguro y disciplinado.',
    tags: ['Técnica & Condición', 'Combinaciones', 'Trabajo con paos'],
    image: '/images/clases/muaythai.jpg',
    reverse: true,
  },
  {
    name: 'Box',
    description: 'Mejora tu coordinación, velocidad y resistencia. Aprende guardia, desplazamientos, defensa y combinaciones con enfoque técnico, trabajo de costal y pads.',
    tags: ['Footwork', 'Defensa', 'Costal & Pads'],
    image: '/images/clases/box.jpg',
    reverse: false,
  },
  {
    name: 'Kids',
    description: 'Clases para niños con enfoque en disciplina, coordinación y confianza. Actividades divertidas y seguras, con técnica básica, reglas y valores dentro y fuera del tatami.',
    tags: ['Disciplina', 'Coordinación', 'Confianza'],
    image: '/images/clases/kids.jpg',
    reverse: true,
  },
];

export function Clases() {
  return (
    <section id="clases" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle subtitle="Entrenamiento estructurado, seguro y progresivo. Elige tu disciplina y evoluciona.">
          Clases
        </SectionTitle>

        <div className={styles.grid}>
          {classesData.map((clase, idx) => (
            <article
              key={idx}
              className={`${styles.item} ${clase.reverse ? styles.reverse : ''}`}
            >
              <div className={styles.content}>
                <h3 className={styles.name}>{clase.name}</h3>
                <p className={styles.desc}>{clase.description}</p>
                <ul className={styles.tags}>
                  {clase.tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.media}>
                <img src={clase.image} alt={clase.name} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
