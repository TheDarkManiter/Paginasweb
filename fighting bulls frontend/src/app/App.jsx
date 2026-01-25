import { useScrollToHash } from '../hooks/useScrollToHash';
import { Header } from '../components/Header/Header';
import { Hero } from '../sections/Hero/Hero';
import { Nosotros } from '../sections/Nosotros/Nosotros';
import { Horarios } from '../sections/Horarios/Horarios';
import { Clases } from '../sections/Clases/Clases';
import { Contacto } from '../sections/Contacto/Contacto';
import { Footer } from '../components/Footer/Footer';
import { FloatingActions } from '../components/FloatingActions/FloatingActions';
import styles from './App.module.css';

export function App() {
  // Hook para scroll suave a secciones
  useScrollToHash();

  return (
    <>
      <Header />
      <main>
        <div className={styles.heroNosotros}>
          <Hero />
          <Nosotros />
        </div>
        <Horarios />
        <Clases />
        <Contacto />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
