import { useEffect } from 'react';

/**
 * Hook que maneja el scroll suave a secciones por hash
 * Permite navegación con links #inicio, #contacto, etc.
 */
export function useScrollToHash() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const element = document.getElementById(hash);
      if (element) {
        // Espera un frame para que el DOM esté listo
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    };

    // Al montar y cuando el hash cambia
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
}
