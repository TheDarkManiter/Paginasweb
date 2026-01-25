import { useEffect, useState } from 'react';

/**
 * Hook que detecta si una sección está visible usando Intersection Observer
 * Útil para ocultar WhatsApp cuando el formulario de contacto está a la vista
 */
export function useFormVisibility(sectionId) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, [sectionId]);

  return isVisible;
}
