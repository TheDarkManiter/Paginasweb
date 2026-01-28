import { useState } from 'react';
import {
  normalizePhone,
  isValidMXPhone,
  toWhatsAppPhone,
  isValidEmail,
  isValidName,
  buildWhatsAppMessage,
} from '../../utils/validators';
import { getWhatsAppLink } from '../../config/contact';
import { apiPost } from '../../services/api';
import { Button } from '../../components/Button/Button';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    interes: '',
    edad: '',
    horario: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', o null

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) clearError(name);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'telefono') {
      const digits = normalizePhone(value);
      if (value.trim() && !isValidMXPhone(digits)) {
        setErrors((prev) => ({
          ...prev,
          telefono: 'TelÃ©fono invÃ¡lido. Usa 10 dÃ­gitos o +52.',
        }));
      }
    } else if (name === 'nombre') {
      if (value.trim() && !isValidName(value)) {
        setErrors((prev) => ({
          ...prev,
          nombre: 'Escribe tu nombre (mÃ­nimo 2 caracteres).',
        }));
      }
    } else if (name === 'email') {
      const v = value.trim();
      if (v && !isValidEmail(v)) {
        setErrors((prev) => ({
          ...prev,
          email: 'Correo invÃ¡lido. Revisa el formato.',
        }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    const nombreVal = formData.nombre.trim();
    const telRaw = formData.telefono.trim();
    const telDigits = normalizePhone(telRaw);
    const interesVal = formData.interes;

    if (!isValidName(nombreVal)) {
      newErrors.nombre = 'Escribe tu nombre (mÃ­nimo 2 caracteres).';
    }

    if (!telDigits) {
      newErrors.telefono = 'Escribe tu telÃ©fono / WhatsApp.';
    } else if (!isValidMXPhone(telDigits)) {
      newErrors.telefono = 'TelÃ©fono invÃ¡lido. Usa 10 dÃ­gitos o +52.';
    }

    if (!interesVal) {
      newErrors.interes = 'Selecciona la clase que te interesa.';
    }

    const emailVal = formData.email.trim();
    if (emailVal && !isValidEmail(emailVal)) {
      newErrors.email = 'Correo invÃ¡lido. Revisa el formato.';
    }

    setErrors(newErrors);
    return { ok: Object.keys(newErrors).length === 0, telDigits };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = validate();
    if (!result.ok) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const data = {
      nombre: formData.nombre.trim(),
      telefono: toWhatsAppPhone(result.telDigits),
      email: formData.email.trim(),
      interes: formData.interes,
      edad: formData.edad,
      horario: formData.horario,
      mensaje: formData.mensaje.trim(),
    };

    try {
      const { data: responseBody, status, ok } = await apiPost('/api/leads', data);
      const success = ok && (status === 200 || status === 201) && responseBody?.ok !== false;

      if (success) {
        const message = responseBody?.message || 'Â¡Solicitud registrada exitosamente!';
        setSubmitStatus({ type: 'success', message });

        const whatsappUrl = getWhatsAppLink(buildWhatsAppMessage(data));
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        setFormData({
          nombre: '',
          telefono: '',
          email: '',
          interes: '',
          edad: '',
          horario: '',
          mensaje: '',
        });
        setErrors({});
        return;
      }

      setSubmitStatus({
        type: 'error',
        message: responseBody?.error || responseBody?.message || 'Error al procesar tu solicitud. Intenta de nuevo.',
      });
    } catch (error) {
      // âŒ Error de red o parsing
      console.error('[ContactForm] Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Error de conexiÃ³n. Por favor, intenta de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre"
          required
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.nombre ? styles.invalid : ''}
        />
        {errors.nombre && <small className={styles.error}>{errors.nombre}</small>}
      </div>

      <div>
        <label htmlFor="telefono">TelÃ©fono / WhatsApp *</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          placeholder="55 1234 5678"
          required
          value={formData.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.telefono ? styles.invalid : ''}
        />
        {errors.telefono && <small className={styles.error}>{errors.telefono}</small>}
      </div>

      <div>
        <label htmlFor="email">Correo electrÃ³nico (opcional)</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tucorreo@email.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email ? styles.invalid : ''}
        />
        {errors.email && <small className={styles.error}>{errors.email}</small>}
      </div>

      <div>
        <label htmlFor="interes">Â¿QuÃ© clase te interesa? *</label>
        <select
          id="interes"
          name="interes"
          required
          value={formData.interes}
          onChange={handleChange}
          className={errors.interes ? styles.invalid : ''}
        >
          <option value="">Selecciona una opciÃ³n</option>
          <option value="Jiu-Jitsu">Jiu-Jitsu</option>
          <option value="Muay Thai">Muay Thai</option>
          <option value="Box">Box</option>
          <option value="Clases para niÃ±os">Clases para niÃ±os</option>
          <option value="Varias disciplinas">Varias disciplinas</option>
          <option value="Solo informaciÃ³n">Solo informaciÃ³n</option>
        </select>
        {errors.interes && <small className={styles.error}>{errors.interes}</small>}
      </div>

      <div>
        <label htmlFor="edad">Edad</label>
        <select
          id="edad"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
        >
          <option value="">Selecciona un rango</option>
          <option value="6 â€“ 10 aÃ±os">6 â€“ 10 aÃ±os</option>
          <option value="11 â€“ 14 aÃ±os">11 â€“ 14 aÃ±os</option>
          <option value="15 â€“ 17 aÃ±os">15 â€“ 17 aÃ±os</option>
          <option value="18 aÃ±os o mÃ¡s">18 aÃ±os o mÃ¡s</option>
        </select>
      </div>

      <div>
        <label htmlFor="horario">Horario preferido</label>
        <select
          id="horario"
          name="horario"
          value={formData.horario}
          onChange={handleChange}
        >
          <option value="">Selecciona un horario</option>
          <option value="MaÃ±ana">MaÃ±ana</option>
          <option value="Tarde">Tarde</option>
          <option value="Noche">Noche</option>
        </select>
      </div>

      <div className={styles.fullWidth}>
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          placeholder="CuÃ©ntanos si tienes experiencia previa y tu disponibilidad de horario"
          value={formData.mensaje}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Mostrar estado de envÃ­o (Ã©xito o error) */}
      {submitStatus && (
        <div 
          className={`${styles.fullWidth} ${styles.submitMessage} ${styles[submitStatus.type]}`}
          role="alert"
        >
          {submitStatus.type === 'success' ? 'âœ…' : 'âŒ'} {submitStatus.message}
        </div>
      )}

      <div className={styles.fullWidth}>
        <Button 
          type="submit" 
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </Button>
      </div>
    </form>
  );
}
