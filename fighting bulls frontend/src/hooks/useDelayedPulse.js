import { useEffect, useState } from 'react';

/**
 * Hook que activa un pulso/animación después de N segundos
 * Útil para llamadas a la acción (ej: WhatsApp con pulso después de 5s)
 */
export function useDelayedPulse(delayMs = 5000) {
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPulse(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  return shouldPulse;
}
