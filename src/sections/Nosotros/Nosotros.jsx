import styles from './Nosotros.module.css';

export function Nosotros() {
  const values = [
    { icon: '🔥', label: 'Disciplina' },
    { icon: '🤝', label: 'Respeto' },
    { icon: '🛡️', label: 'Lealtad' },
  ];

  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.joinBlock}>
          <img 
            className={styles.joinImg}
            src="/images/nosotros/clase-llena.jpg"
            alt="Clase llena en Fighting Bulls Academy"
            title="Clase llena en Fighting Bulls Academy"
          />

          <div className={styles.joinText}>
            <h2>Únete a nuestro equipo</h2>
            <p>
              Con más de 10 años de experiencia, fundamos nuestra academia con el fin de que sea una segunda casa 
              para nuestros alumnos. Creemos que la salud y la seguridad no son un hobby, sino un estilo de vida.
            </p>
            <p>
              Nuestras clases son para personas de todas las edades. Ya hayas entrenado antes o sea tu primera vez, 
              aquí te ayudamos a formar a tu nuevo yo.
            </p>
          </div>
        </div>

        <h3>Valores</h3>
        <ul className={styles.valuesList}>
          {values.map((value, idx) => (
            <li key={idx} style={{ '--icon': `'${value.icon}'` }}>
              {value.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
