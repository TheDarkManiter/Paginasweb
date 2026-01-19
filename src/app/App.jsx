import { useScrollToHash } from '../hooks/useScrollToHash';
import { Header } from '../components/Header/Header';
import { Hero } from '../sections/Hero/Hero';
import { Nosotros } from '../sections/Nosotros/Nosotros';
import { Horarios } from '../sections/Horarios/Horarios';
import { Clases } from '../sections/Clases/Clases';
import { Contacto } from '../sections/Contacto/Contacto';
import { Footer } from '../components/Footer/Footer';
import { FloatingActions } from '../components/FloatingActions/FloatingActions';

export function App() {
  // Hook para scroll suave a secciones
  useScrollToHash();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Nosotros />
        <Horarios />
        <Clases />
        <Contacto />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
