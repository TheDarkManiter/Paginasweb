# 📍 Índice de Documentación: Payload del Formulario de Contacto

## 🎯 Resumen Ejecutivo

El formulario de Contacto del Fighting Bulls Academy recolecta **7 campos** del usuario que se transforman en un **JSON de 9 campos** (incluyendo `source` y `created_at` agregados por servidor) y se envían a `/.netlify/functions/create-lead` para guardar en Supabase.

---

## 📚 Archivos de Documentación Generados

### 1. **[FORM_PAYLOAD_MAPPING.md](./FORM_PAYLOAD_MAPPING.md)** 
**Uso:** Referencia técnica completa del mapeo  
**Contiene:**
- Tabla detallada de campos HTML → JSON
- Transformaciones paso a paso por campo
- Ejemplos con datos reales mexicanos
- Validaciones (cliente y servidor)
- Flujo completo de datos
- Notas de seguridad

**Mejor para:** Desarrolladores que necesitan entender el sistema a fondo

---

### 2. **[PAYLOAD_QUICK_REFERENCE.md](./PAYLOAD_QUICK_REFERENCE.md)**
**Uso:** Guía rápida de consulta  
**Contiene:**
- Resumen de 30 segundos
- Tabla de mapeo compacta
- Payload ejemplo completo y mínimo
- Opciones de select
- Testing en DevTools
- Referencia rápida

**Mejor para:** Consulta rápida mientras se codifica

---

### 3. **[src/utils/payloadExamples.js](./src/utils/payloadExamples.js)**
**Uso:** Ejemplos de payloads para testing  
**Contiene:**
- `payload_completo` - Con todos los campos
- `payload_minimo` - Solo requeridos
- `payload_jiujitsu`, `payload_muaythai`, etc. - Por clase
- `payload_edad_*` - Por rango de edad
- `testSubmitPayload()` - Función para testing
- Respuestas esperadas (success/error)

**Mejor para:** Testing y QA

**Uso en código:**
```javascript
import { testSubmitPayload, payload_completo } from './utils/payloadExamples.js';
testSubmitPayload(payload_completo);
```

---

### 4. **[src/utils/payloadTransformationDiagram.js](./src/utils/payloadTransformationDiagram.js)**
**Uso:** Visualización y diagramas  
**Contiene:**
- Diagrama ASCII del flujo completo
- Paso a paso de transformación
- Estados antes/después
- Tabla de transformaciones visuales
- Flujo HTTP completo

**Mejor para:** Entender el flujo visual y presentar a stakeholders

---

### 5. **[src/utils/payloadSpecification.js](./src/utils/payloadSpecification.js)**
**Uso:** Especificación técnica formal  
**Contiene:**
- `PAYLOAD_SCHEMA` - Estructura formal de cada campo
- `VALIDACIONES` - Reglas por campo
- `MAPEO_DIRECTO` - Mapeo directo HTML → JSON
- `FLUJO_PASO_A_PASO` - Proceso detallado
- `TESTING_SCRIPT` - Script para DevTools

**Mejor para:** Especificaciones técnicas y validación

---

## 🔗 Mapeo Rápido HTML → JSON

```
nombre      → nombre        (.trim())
telefono    → telefono      (normalize + prefijo +52)
email       → email         (.trim())
interes     → interes       (sin cambios)
edad        → edad          (sin cambios)
horario     → horario       (sin cambios)
mensaje     → mensaje       (.trim())
(servidor)  → source        ("contact-form")
(servidor)  → created_at    (timestamp ISO)
```

---

## 📤 Payload Ejemplo Completo

```json
{
  "nombre": "Juan García López",
  "telefono": "+5215515938286",
  "email": "juan.garcia@example.com",
  "interes": "Muay Thai",
  "edad": "18 años o más",
  "horario": "Noche",
  "mensaje": "Tengo experiencia en boxeo y quiero aprender Muay Thai.",
  "source": "contact-form"
}
```

---

## 🔄 Transformaciones Clave

### Tipo 1: .trim() - Elimina espacios
- `nombre`: " Juan García " → "Juan García"
- `email`: "user@example.com " → "user@example.com"
- `mensaje`: "  Mi texto  " → "Mi texto"

### Tipo 2: normalize + prefijo - Teléfono
```javascript
" 55 1593 8286 " 
  → normalizePhone() → "5515938286"
  → toWhatsAppPhone() → "+5215515938286"
```

### Tipo 3: Sin cambios - Selects
- `interes`: "Muay Thai" → "Muay Thai"
- `edad`: "18 años o más" → "18 años o más"
- `horario`: "Noche" → "Noche"

---

## ✅ Validaciones

### Requeridos (bloquean envío)
- `nombre`: mín 2 caracteres, sin números
- `telefono`: exactamente 10 dígitos (MX)
- `interes`: debe ser opción válida

### Opcionales (se envían aunque estén vacíos)
- `email`: si se completa, debe ser válido
- `edad`: cualquier opción o vacío
- `horario`: cualquier opción o vacío
- `mensaje`: cualquier texto o vacío

---

## 🧪 Testing Rápido

### En DevTools Console (F12):
```javascript
const testPayload = {
  nombre: "Test User",
  telefono: "+5215515938286",
  email: "test@example.com",
  interes: "Box",
  edad: "18 años o más",
  horario: "Noche",
  mensaje: "Test",
  source: "contact-form"
};

fetch('/.netlify/functions/create-lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testPayload)
})
.then(r => r.json())
.then(data => console.log('Respuesta:', data));
```

### Con payloadExamples.js:
```javascript
import { testSubmitPayload, payload_jiujitsu } from './utils/payloadExamples.js';
testSubmitPayload(payload_jiujitsu);
```

---

## 📊 Estadísticas

| Métrica | Cantidad |
|---------|----------|
| Campos HTML | 7 |
| Campos JSON (cliente) | 7 |
| Campos agregados (servidor) | 2 |
| Total campos JSON | 9 |
| Campos requeridos | 3 |
| Campos opcionales | 4 |
| Transformaciones aplicadas | 4 |
| Opciones de select | 13 |
| Ejemplos de payload | 10+ |
| Documentos generados | 5 |

---

## 🎯 Casos de Uso Documentados

1. **Payload Completo** - Todos los campos completados
2. **Payload Mínimo** - Solo requeridos
3. **Por Clase** - Jiu-Jitsu, Muay Thai, Box, Clases para niños, Varias, Info
4. **Por Edad** - 6-10, 11-14, 15-17, 18+
5. **Diferentes formatos teléfono** - Espacios, guiones, paréntesis, etc.

---

## 🔐 Seguridad

- ✅ `source` agregado en servidor (no confiar en cliente)
- ✅ `created_at` generado en servidor (timestamp no falsificable)
- ✅ Validación en 2 niveles: cliente + servidor
- ✅ Teléfono normalizado para evitar duplicados
- ✅ Secrets guardados en Netlify (SUPABASE_URL, SUPABASE_SECRET_KEY)
- ✅ Payload enviado por POST con JSON

---

## 📱 Opciones de Select

### Interes (requerido)
```
Jiu-Jitsu
Muay Thai
Box
Clases para niños
Varias disciplinas
Solo información
```

### Edad (opcional)
```
6 – 10 años
11 – 14 años
15 – 17 años
18 años o más
```

### Horario (opcional)
```
Mañana
Tarde
Noche
```

---

## 🔗 Archivos Relacionados en el Proyecto

### Frontend Components
- `src/sections/Contacto/ContactForm.jsx` - Componente React (valida y transforma)
- `src/sections/Contacto/Contacto.jsx` - Sección envolvente
- `src/sections/Contacto/Contacto.module.css` - Estilos (success/error messages)

### Backend
- `netlify/functions/create-lead.js` - Función que recibe y valida payload
- Inserta en: Supabase tabla `Leads`

### Utilidades
- `src/utils/validators.js` - Funciones de validación (normalizePhone, toWhatsAppPhone, etc.)
- `src/config/contact.js` - Configuración de WhatsApp

### Configuración
- `netlify.toml` - Configuración de Netlify (funciones, redirects)
- `src/config/contact.js` - Número de WhatsApp centralizado

---

## 📋 Checklist: Implementación Completa

- [x] Campos HTML detectados e identificados
- [x] Mapeo HTML → JSON documentado
- [x] Transformaciones especificadas
- [x] Validaciones listadas
- [x] Ejemplos con datos reales
- [x] Teléfono normalización explicada
- [x] Flujo completo diagramado
- [x] Testing guide creado
- [x] 5 documentos generados
- [x] Casos de uso documentados

---

## 🚀 Próximos Pasos

1. **Para el Equipo Frontend:**
   - Consultar `FORM_PAYLOAD_MAPPING.md` para entender transformaciones
   - Usar `payloadExamples.js` para testing

2. **Para el Equipo Backend:**
   - Consultar `payloadSpecification.js` para validación
   - Revisar `PAYLOAD_QUICK_REFERENCE.md` para referencia rápida

3. **Para QA/Testing:**
   - Usar `payloadExamples.js` con función `testSubmitPayload()`
   - Ejecutar tests con diferentes combinaciones
   - Validar en DevTools Console

4. **Para Documentación:**
   - Usar `FORM_PAYLOAD_MAPPING.md` como referencia oficial
   - Compartir `PAYLOAD_QUICK_REFERENCE.md` con stakeholders

---

## 📞 Contacto & Soporte

**Payload Endpoint:** `/.netlify/functions/create-lead`  
**Method:** `POST`  
**Content-Type:** `application/json`  
**Destino:** Supabase tabla `Leads`  

**Documentación anterior:**
- [FORM_PAYLOAD_MAPPING.md](./FORM_PAYLOAD_MAPPING.md)
- [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md)
- [DEPLOYMENT_AUDIT.md](./DEPLOYMENT_AUDIT.md)

---

**Generado por:** Frontend Lead  
**Fecha:** 2025-01-19  
**Última actualización:** 2025-01-19  
**Estado:** ✅ Production Ready  
**Versión:** 1.0
