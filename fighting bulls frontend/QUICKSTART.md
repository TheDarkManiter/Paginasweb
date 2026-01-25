# 🚀 Quick Start - Fighting Bulls Academy React

## Estructura Final ✅

Tu proyecto ahora está estructurado como **una aplicación React profesional** y escalable.

```
fighting-bulls-react/
├── src/
│   ├── app/
│   │   └── App.jsx                    ← Componente raíz
│   │
│   ├── components/                    ← Reutilizables
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── FloatingActions/
│   │   ├── Button/
│   │   └── SectionTitle/
│   │
│   ├── sections/                      ← Grandes bloques
│   │   ├── Hero/
│   │   ├── Nosotros/
│   │   ├── Horarios/
│   │   ├── Clases/
│   │   └── Contacto/
│   │
│   ├── hooks/                         ← Lógica personalizada
│   │   ├── useScrollToHash.js
│   │   ├── useScrollTopButton.js
│   │   ├── useDelayedPulse.js
│   │   └── useFormVisibility.js
│   │
│   ├── utils/
│   │   └── validators.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   │
│   ├── main.jsx
│   └── index.css (si lo crea Vite)
│
├── public/
│   └── images/                        ← Imágenes organizadas
│       ├── logo-bulls.jpeg
│       ├── logo-cosmic-flow.png
│       ├── hero/
│       ├── nosotros/
│       ├── horarios/
│       ├── clases/
│       └── redes/
│
├── ARCHITECTURE.md                    ← Documentación técnica
├── SETUP.md                           ← Este archivo
├── package.json
└── vite.config.js
```

---

## 🎯 Cómo Funciona

### **1. Punto de Entrada**
```jsx
// src/main.jsx
import { App } from './app/App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### **2. App Componente**
```jsx
// src/app/App.jsx
export function App() {
  useScrollToHash();  // ← Activa scroll suave a #hash

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
```

---

## 📦 Qué Se Creó

### **Componentes Reutilizables (5)**
| Nombre | Ruta | Uso |
|--------|------|-----|
| Header | `components/Header/` | `<Header />` |
| Footer | `components/Footer/` | `<Footer />` |
| FloatingActions | `components/FloatingActions/` | `<FloatingActions />` |
| Button | `components/Button/` | `<Button variant="primary">Click</Button>` |
| SectionTitle | `components/SectionTitle/` | `<SectionTitle subtitle="...">Título</SectionTitle>` |

### **Secciones (5)**
| Nombre | ID | Contenido |
|--------|-----|----------|
| Hero | `#inicio` | "Encuentra tu fortaleza" |
| Nosotros | `#nosotros` | "Únete a nuestro equipo" + Valores |
| Horarios | `#horarios` | Imagen de horarios |
| Clases | `#clases` | Grid de 4 disciplinas |
| Contacto | `#contacto` | Formulario inteligente |

### **Hooks (4)**
```jsx
useScrollToHash()              // Scroll suave a #hash
useScrollTopButton()           // Botón subir
useDelayedPulse(5000)          // Pulso después de 5s
useFormVisibility('contacto')  // Detecta sección visible
```

### **Utilidades**
- `validators.js` - Validación de formulario
- `globals.css` - Estilos globales + variables CSS
- `tokens.css` - Tokens de diseño (backup)

### **Imágenes (12)**
Organizadas por sección en `public/images/`:
- `hero/maestro-jiu-jitsu.jpg`
- `nosotros/clase-llena.jpg`
- `horarios/horarios.jpg`
- `clases/jiujitsu.jpg`, `muaythai.jpg`, `box.jpg`, `kids.jpg`
- `redes/facebook.jpg`, `instagram.jpg`, `whatsapp.jpg`
- `logo-bulls.jpeg`, `logo-cosmic-flow.png`

---

## 🔗 Navegación

El sitio funciona con **anchors en URLs**:

```
http://localhost:5173/#inicio      → Scroll a Hero
http://localhost:5173/#nosotros    → Scroll a Nosotros
http://localhost:5173/#horarios    → Scroll a Horarios
http://localhost:5173/#clases      → Scroll a Clases
http://localhost:5173/#contacto    → Scroll a Contacto
```

El header ya tiene los links configurados:
```jsx
<a href="#inicio">Inicio</a>
<a href="#nosotros">Nosotros</a>
<a href="#horarios">Horarios</a>
<a href="#clases">Clases</a>
<a href="#contacto">Contacto</a>
```

---

## 🎨 Estilos CSS Modules

Cada componente tiene su propio archivo `.module.css`:

```jsx
// Header.jsx
import styles from './Header.module.css';

export function Header() {
  return <header className={styles.header}>
    <div className={styles.logo}></div>
  </header>
}
```

**Ventajas:**
- ✅ No hay conflictos de nombres
- ✅ Estilos locales por componente
- ✅ Fácil de mantener y refactorizar

---

## ✅ Formulario de Contacto

El formulario automáticamente:
1. **Valida** nombre, teléfono, email
2. **Normaliza** el teléfono (quita caracteres especiales)
3. **Abre WhatsApp** con mensaje pre-llenado
4. **Reseta** el formulario después del envío

```jsx
// ContactForm.jsx
const data = {
  nombre: 'Juan',
  telefono: '5215512345678',  // convertido a formato wa.me
  interes: 'Jiu-Jitsu',
  edad: '18+',
  horario: 'Tarde',
  email: 'juan@email.com',
  mensaje: 'Quiero entrenar'
};

// Se abre: https://wa.me/5215578296609?text=Hola%20quiero%20informaci%C3%B3n...
```

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor local (Puerto 5173)
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview

# Linter (si está configurado)
npm run lint
```

---

## 📤 Desploy en Netlify

### **Opción 1: Conectar GitHub**
1. Sube tu proyecto a GitHub
2. Ve a https://netlify.com
3. "New site from Git"
4. Selecciona tu repositorio
5. Build command: `npm run build`
6. Publish directory: `dist`
7. ¡Listo! 🚀

### **Opción 2: Deploy manual**
```bash
npm run build
# Sube la carpeta "dist" a Netlify
```

### **Opción 3: Crear netlify.toml**
```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

---

## 💻 Agregar Más Componentes

### **Crear una nueva sección:**

1. **Crear carpeta:**
   ```
   src/sections/MiSeccion/
   ├── MiSeccion.jsx
   └── MiSeccion.module.css
   ```

2. **Crear el archivo:**
   ```jsx
   // src/sections/MiSeccion/MiSeccion.jsx
   import styles from './MiSeccion.module.css';

   export function MiSeccion() {
     return (
       <section id="mi-seccion" className={styles.section}>
         <h2>Mi Sección</h2>
         <p>Contenido aquí</p>
       </section>
     );
   }
   ```

3. **Crear estilos:**
   ```css
   /* src/sections/MiSeccion/MiSeccion.module.css */
   .section {
     padding: var(--spacing-xxl) 0;
   }
   ```

4. **Importar en App.jsx:**
   ```jsx
   import { MiSeccion } from '../sections/MiSeccion/MiSeccion';

   export function App() {
     return (
       <>
         <Header />
         <main>
           <Hero />
           <MiSeccion />  {/* ← Agregar aquí */}
         </main>
         <Footer />
       </>
     );
   }
   ```

---

## 🎨 Variables CSS Globales

Usa estas variables en cualquier `.module.css`:

```css
.miComponente {
  color: var(--color-text);
  background: var(--color-dark);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal);
}
```

**Variables disponibles:**
```css
--color-primary: #c1121f
--color-dark: #010714
--color-text: #f5f5f5
--color-text-secondary: #cfd6e4
--color-success: #25d366

--spacing-xs: 8px
--spacing-sm: 12px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 30px
--spacing-xxl: 60px

--radius-sm: 12px
--radius-md: 16px
--radius-lg: 20px
--radius-full: 999px

--shadow-sm: 0 8px 22px rgba(0,0,0,0.45)
--shadow-md: 0 14px 34px rgba(0,0,0,0.50)
--shadow-lg: 0 18px 40px rgba(0,0,0,0.55)
--shadow-xl: 0 24px 55px rgba(0,0,0,0.65)

--transition-fast: 0.2s ease
--transition-normal: 0.25s ease
--transition-smooth: 0.35s ease
```

---

## 🎯 Checklist

- ✅ Estructura React creada
- ✅ 9 componentes implementados
- ✅ 4 hooks personalizados
- ✅ Validación de formulario
- ✅ Integración WhatsApp
- ✅ Imágenes organizadas
- ✅ CSS Modules
- ✅ Responsive design
- ✅ Listo para Netlify

---

## 📚 Documentación

- **ARCHITECTURE.md** ← Detalles técnicos completos
- **SETUP.md** ← Este archivo, visión general rápida
- **ARCHIVO ORIGINAL**: Los archivos HTML/CSS/JS vanilla están en la raíz si los necesitas

---

## ⚡ Próximos Pasos

1. **Ejecuta el servidor local:**
   ```bash
   npm run dev
   ```

2. **Abre el navegador:**
   ```
   http://localhost:5173
   ```

3. **Edita los componentes:**
   Cualquier cambio se recarga automáticamente

4. **Cuando estés listo para producción:**
   ```bash
   npm run build
   ```

5. **Despliega en Netlify:**
   Conecta tu GitHub y ¡listo!

---

**¡Tu arquitectura React está lista! 🚀**

Para preguntas o ediciones, revisa `ARCHITECTURE.md` para documentación técnica detallada.
