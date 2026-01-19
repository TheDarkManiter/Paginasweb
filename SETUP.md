# 🎯 Fighting Bulls Academy - React + Vite ✅

## ¿Qué se creó?

### ✅ Estructura React Completa y Escalable

Transformamos el proyecto vanilla HTML/CSS/JS a una **arquitectura React profesional con Vite**.

---

## 📦 Distribución de Archivos

### **`src/app/`** - Aplicación Principal
```
App.jsx          ← Componente raíz que orquesta todo
```
- Renderiza Header, 5 secciones (Hero, Nosotros, Horarios, Clases, Contacto), Footer, FloatingActions
- Activa el hook `useScrollToHash` para navegación suave

---

### **`src/components/`** - Componentes Reutilizables (5)

| Componente | Propósito | Features |
|-----------|-----------|----------|
| **Header** | Encabezado con logo, nav y redes sociales | ✅ Animaciones de entrada, hover effects |
| **Footer** | Footer con branding y Cosmic Flow Digital | ✅ Responsive, logo branding |
| **FloatingActions** | Botones flotantes | ✅ WhatsApp con pulso, botón subir |
| **Button** | Botón reutilizable | ✅ Variantes (primary, secondary), tamaños |
| **SectionTitle** | Título + subtítulo de secciones | ✅ Línea decorativa roja |

---

### **`src/sections/`** - Secciones Grandes (5)

| Sección | Contenido | Responsabilidad |
|---------|-----------|-----------------|
| **Hero** | Imagen + texto (Encuentra tu fortaleza) | Sección inicio con layout flexible |
| **Nosotros** | Imagen + texto + valores | Grid de 3 valores con iconos emoji |
| **Horarios** | Imagen grande | Mostrar horarios disponibles |
| **Clases** | Grid de 4 disciplinas | Renderizar data de clases, layout alternado |
| **Contacto** | Formulario + validación | Formulario inteligente con envío a WhatsApp |

---

### **`src/hooks/`** - Hooks Personalizados (4)

```javascript
// 1. useScrollToHash() - Scroll suave a #inicio, #contacto, etc.
useScrollToHash();

// 2. useScrollTopButton() - Muestra botón al scrollear 500px
const { isVisible, scrollToTop } = useScrollTopButton();

// 3. useDelayedPulse(5000) - Anima elemento después de 5s
const shouldPulse = useDelayedPulse(5000);

// 4. useFormVisibility('contacto') - Detecta si sección está visible
const isVisible = useFormVisibility('contacto');
```

---

### **`src/utils/`** - Funciones Compartidas

```javascript
// validators.js - Validación inteligente de formulario
normalizePhone(raw)              // → "5215512345678"
isValidMXPhone(digits)           // → true/false
toWhatsAppPhone(digits)          // → "5215512345678" (formato wa.me)
isValidEmail(email)              // → true/false
isValidName(name)                // → true/false
buildWhatsAppMessage(data)       // → "Hola, quiero información..."
```

---

### **`src/styles/`** - Estilos Globales

```css
globals.css   ← Variables CSS, reset, tipografía global
tokens.css    ← Exporta como constantes JS (backup)
```

**Variables CSS disponibles:**
```css
--color-primary: #c1121f
--color-text: #f5f5f5
--color-text-secondary: #cfd6e4
--spacing-lg: 24px
--radius-full: 999px
--shadow-md: 0 14px 34px rgba(0,0,0,0.50)
/* ... y más */
```

---

### **`public/images/`** - Imágenes Organizadas (12)

```
public/images/
├── logo-bulls.jpeg             (2 archivos principales)
├── logo-cosmic-flow.png
├── hero/
│   └── maestro-jiu-jitsu.jpg
├── nosotros/
│   └── clase-llena.jpg
├── horarios/
│   └── horarios.jpg
├── clases/
│   ├── jiujitsu.jpg
│   ├── muaythai.jpg
│   ├── box.jpg
│   └── kids.jpg
└── redes/
    ├── facebook.jpg
    ├── instagram.jpg
    └── whatsapp.jpg
```

**Rutas en componentes:**
```jsx
<img src="/images/hero/maestro-jiu-jitsu.jpg" />
<img src="/images/redes/whatsapp.jpg" />
```

---

## 🎨 Arquitectura Visual

```
App (src/app/App.jsx)
│
├─ Header (reutilizable)
│   ├─ Logo
│   ├─ Nav
│   └─ Social Icons
│
├─ Main
│   ├─ Hero (sección)
│   ├─ Nosotros (sección)
│   ├─ Horarios (sección)
│   ├─ Clases (sección)
│   │   └─ ClassItem (renderizado desde data)
│   └─ Contacto (sección)
│       └─ ContactForm (subcomponente)
│
├─ Footer (reutilizable)
│
└─ FloatingActions (reutilizable)
    ├─ WhatsApp FAB
    └─ Scroll to Top FAB
```

---

## 🚀 Cómo Usar

### **1. Instalar dependencias**
```bash
npm install
```

### **2. Desarrollo local**
```bash
npm run dev
```

### **3. Build para producción**
```bash
npm run build
```

### **4. Previsualizar build**
```bash
npm run preview
```

---

## 💡 Ejemplos de Uso

### **Agregar una nueva sección**

```jsx
// src/sections/NuevaSeccion/NuevaSeccion.jsx
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import styles from './NuevaSeccion.module.css';

export function NuevaSeccion() {
  return (
    <section id="nueva" className={styles.section}>
      <SectionTitle subtitle="Descripción">
        Título
      </SectionTitle>
      {/* Contenido */}
    </section>
  );
}
```

**Luego en `App.jsx`:**
```jsx
import { NuevaSeccion } from '../sections/NuevaSeccion/NuevaSeccion';

export function App() {
  useScrollToHash();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NuevaSeccion /> {/* ← Agregar aquí */}
        <Footer />
      </main>
      <FloatingActions />
    </>
  );
}
```

### **Reutilizar un componente**

```jsx
// En cualquier lado
import { Button } from '../components/Button/Button';

<Button variant="primary" size="lg">
  Click me
</Button>
```

### **Usar un hook**

```jsx
import { useScrollTopButton } from '../hooks';

export function MyComponent() {
  const { isVisible, scrollToTop } = useScrollTopButton();
  
  if (!isVisible) return null;
  
  return <button onClick={scrollToTop}>↑ Subir</button>;
}
```

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Componentes** | 9 (5 reutilizables + 5 secciones) |
| **Hooks** | 4 personalizados |
| **Archivos CSS** | 9 (modules CSS) |
| **Imágenes** | 12 organizadas por sección |
| **Líneas de CSS** | ~1500 (modularizado) |
| **Tamaño estimado** | ~50KB (minificado + gzipped) |

---

## ✨ Features Incluidas

✅ **Scroll suave** a secciones con `#hash`  
✅ **Validación inteligente** de formulario  
✅ **Envío a WhatsApp** automático  
✅ **Botones flotantes** con animaciones  
✅ **Responsive design** en todos los dispositivos  
✅ **Dark mode** by default  
✅ **CSS Modules** para no tener conflictos  
✅ **Hooks reutilizables** para lógica común  
✅ **Componentes modularizados** y escalables  
✅ **Ready for Netlify** deploy  

---

## 📝 Archivos de Documentación

- **`ARCHITECTURE.md`** ← Documentación técnica detallada
- **`README.md`** ← Este archivo, visión general

---

## 🔧 Próximos Pasos (Opcional)

Si quieres extender:

1. **Agregar más secciones** → `src/sections/MiSeccion/`
2. **Crear más componentes** → `src/components/MiComponente/`
3. **Agregar rutas** → Instalar `react-router-dom`
4. **Base de datos** → Conectar con Supabase / Firebase
5. **Analytics** → Google Analytics, Hotjar
6. **Formularios** → Netlify Forms, Formspree

---

## 📦 Deployment en Netlify

```toml
# netlify.toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

Conecta tu repo de GitHub a Netlify para **CI/CD automático**.

---

## ✅ TODO - Completado

- ✅ Estructura React escalable
- ✅ 9 componentes (5 reutilizables + 5 secciones)
- ✅ 4 hooks personalizados
- ✅ Validación de formulario
- ✅ Integración WhatsApp
- ✅ CSS Modules organizados
- ✅ Imágenes en `public/images/`
- ✅ Responsivo en móvil/desktop
- ✅ Dark mode incluido
- ✅ Documentación completa

---

**¡Listo para producción! 🚀**
