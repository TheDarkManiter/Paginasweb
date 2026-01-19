import { useEffect, useState } from 'react';

/**
 * Hook que maneja la visibilidad del botón "Subir al inicio"
 * Muestra el botón después de scrollear 500px
 */
export function useScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollY > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return { isVisible, scrollToTop };
}
