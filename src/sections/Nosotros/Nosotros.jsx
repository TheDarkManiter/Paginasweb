import { useRef } from 'react';
import styles from './Nosotros.module.css';

export function Nosotros() {
  const carouselRef = useRef(null);
  const values = [
    { icon: '🔥', label: 'Disciplina' },
    { icon: '🤝', label: 'Respeto' },
    { icon: '🛡️', label: 'Lealtad' },
  ];
  const carouselImages = [
    {
      src: '/images/nosotros/carousel/cambio-grado-muay-thai.webp',
      alt: 'Cambio de grado en Muay Thai',
    },
    { src: '/images/nosotros/carousel/chicas-fba-2.webp', alt: 'Chicas FBA' },
    {
      src: '/images/nosotros/carousel/clase-muay-thai.webp',
      alt: 'Clase de Muay Thai',
    },
    {
      src: '/images/nosotros/carousel/graduacion-bulls.webp',
      alt: 'Graduación Bulls',
    },
    {
      src: '/images/nosotros/carousel/graduaciones-bulls.webp',
      alt: 'Graduaciones Bulls',
    },
    {
      src: '/images/nosotros/carousel/maestros-en-graduacion.webp',
      alt: 'Maestros durante ceremonia de graduación en Fighting Bulls Academy',
    },
    {
      src: '/images/nosotros/carousel/clase-jiujitsu-fba.webp',
      alt: 'Clase de Jiu Jitsu en Fighting Bulls Academy',
    },
    {
      src: '/images/nosotros/carousel/clase-muay-thai-llena.webp',
      alt: 'Clase llena de Muay Thai en Fighting Bulls Academy',
    },
  ];
  const handleCarouselScroll = (direction) => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    const nearStart = scrollLeft <= 5;
    const nearEnd = scrollLeft >= maxScroll - 5;

    if (direction > 0 && nearEnd) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction < 0 && nearStart) {
      carouselRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
      return;
    }

    const scrollAmount = Math.round(clientWidth * 0.8);
    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

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

        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            aria-label="Ver imágenes anteriores"
            onClick={() => handleCarouselScroll(-1)}
          >
            ‹
          </button>
          <div ref={carouselRef} className={styles.carouselTrack}>
            {carouselImages.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                draggable="false"
              />
            ))}
          </div>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            aria-label="Ver imágenes siguientes"
            onClick={() => handleCarouselScroll(1)}
          >
            ›
          </button>
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
