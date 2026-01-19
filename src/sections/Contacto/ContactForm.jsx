import { useState } from 'react';
import {
  normalizePhone,
  isValidMXPhone,
  toWhatsAppPhone,
  isValidEmail,
  isValidName,
  buildWhatsAppMessage,
} from '../../utils/validators';
import { Button } from '../../components/Button/Button';
import styles from './ContactForm.module.css';

const WHATSAPP_NUMBER = '5215578296609';

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
          telefono: 'Teléfono inválido. Usa 10 dígitos o +52.',
        }));
      }
    } else if (name === 'nombre') {
      if (value.trim() && !isValidName(value)) {
        setErrors((prev) => ({
          ...prev,
          nombre: 'Escribe tu nombre (mínimo 2 caracteres).',
        }));
      }
    } else if (name === 'email') {
      const v = value.trim();
      if (v && !isValidEmail(v)) {
        setErrors((prev) => ({
          ...prev,
          email: 'Correo inválido. Revisa el formato.',
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
      newErrors.nombre = 'Escribe tu nombre (mínimo 2 caracteres).';
    }

    if (!telDigits) {
      newErrors.telefono = 'Escribe tu teléfono / WhatsApp.';
    } else if (!isValidMXPhone(telDigits)) {
      newErrors.telefono = 'Teléfono inválido. Usa 10 dígitos o +52.';
    }

    if (!interesVal) {
      newErrors.interes = 'Selecciona la clase que te interesa.';
    }

    const emailVal = formData.email.trim();
    if (emailVal && !isValidEmail(emailVal)) {
      newErrors.email = 'Correo inválido. Revisa el formato.';
    }

    setErrors(newErrors);
    return { ok: Object.keys(newErrors).length === 0, telDigits };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validate();
    if (!result.ok) return;

    const data = {
      nombre: formData.nombre.trim(),
      telefono: toWhatsAppPhone(result.telDigits),
      email: formData.email.trim(),
      interes: formData.interes, // Podrías obtener el texto de la opción aquí
      edad: formData.edad,
      horario: formData.horario,
      mensaje: formData.mensaje.trim(),
    };

    const text = encodeURIComponent(buildWhatsAppMessage(data));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank');

    // Reset form
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
        <label htmlFor="telefono">Teléfono / WhatsApp *</label>
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
        <label htmlFor="email">Correo electrónico (opcional)</label>
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
        <label htmlFor="interes">¿Qué clase te interesa? *</label>
        <select
          id="interes"
          name="interes"
          required
          value={formData.interes}
          onChange={handleChange}
          className={errors.interes ? styles.invalid : ''}
        >
          <option value="">Selecciona una opción</option>
          <option value="Jiu-Jitsu">Jiu-Jitsu</option>
          <option value="Muay Thai">Muay Thai</option>
          <option value="Box">Box</option>
          <option value="Clases para niños">Clases para niños</option>
          <option value="Varias disciplinas">Varias disciplinas</option>
          <option value="Solo información">Solo información</option>
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
          <option value="6 – 10 años">6 – 10 años</option>
          <option value="11 – 14 años">11 – 14 años</option>
          <option value="15 – 17 años">15 – 17 años</option>
          <option value="18 años o más">18 años o más</option>
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
          <option value="Mañana">Mañana</option>
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
          placeholder="Cuéntanos si tienes experiencia previa y tu disponibilidad de horario"
          value={formData.mensaje}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className={styles.fullWidth}>
        <Button type="submit" size="lg">
          Enviar mensaje
        </Button>
      </div>
    </form>
  );
}
