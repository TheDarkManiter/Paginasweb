# Fighting Bulls Academy - React + Vite

Estructura React profesional y escalable para la Academia de Artes Marciales Mixtas.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   └── App.jsx                 # Componente raíz, orquesta todas las secciones
│
├── components/                 # Componentes reutilizables
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.module.css
│   ├── FloatingActions/        # Botones flotantes (WhatsApp + Subir)
│   │   ├── FloatingActions.jsx
│   │   └── FloatingActions.module.css
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.module.css
│   └── SectionTitle/
│       ├── SectionTitle.jsx
│       └── SectionTitle.module.css
│
├── sections/                   # Secciones grandes del sitio
│   ├── Hero/                   # Sección de inicio
│   │   ├── Hero.jsx
│   │   └── Hero.module.css
│   ├── Nosotros/
│   │   ├── Nosotros.jsx
│   │   └── Nosotros.module.css
│   ├── Horarios/
│   │   ├── Horarios.jsx
│   │   └── Horarios.module.css
│   ├── Clases/
│   │   ├── Clases.jsx
│   │   └── Clases.module.css
│   └── Contacto/
│       ├── Contacto.jsx
│       ├── ContactForm.jsx
│       └── Contacto.module.css
│
├── hooks/                      # Hooks personalizados
│   ├── useScrollToHash.js      # Scroll suave a secciones (#inicio, #contacto)
│   ├── useScrollTopButton.js   # Muestra botón al hacer scroll
│   ├── useDelayedPulse.js      # Anima elemento después de N segundos
│   ├── useFormVisibility.js    # Detecta si una sección está visible
│   └── index.js                # Exporta todos los hooks
│
├── utils/
│   └── validators.js           # Funciones de validación del formulario
│
├── styles/
│   ├── globals.css             # Estilos globales y variables CSS
│   └── tokens.css              # Tokens de diseño (deprecated, usar CSS variables)
│
├── main.jsx                    # Punto de entrada
└── App.jsx                     # Componente antiguo (reemplazado por app/App.jsx)

public/
└── images/                     # Imágenes organizadas por sección
    ├── logo-bulls.jpeg
    ├── logo-cosmic-flow.png
    ├── hero/
    ├── nosotros/
    ├── horarios/
    ├── clases/
    └── redes/
```

## 🎨 Componentes Principales

### `Header`
Renderiza el encabezado con logo, navegación y redes sociales.

```jsx
<Header />
```

### `FloatingActions`
Gestiona botones flotantes:
- **WhatsApp**: Con pulso después de 5 segundos
- **Subir al inicio**: Aparece al scrollear 500px

Usa hooks para:
- `useScrollTopButton()`: Lógica del botón "subir"
- `useDelayedPulse()`: Pulso del WhatsApp después de 5s
- `useFormVisibility()`: Oculta WhatsApp cuando el formulario está visible

### `Secciones`
Cada sección es un componente independiente:
- `Hero`: Sección de inicio "Encuentra tu fortaleza"
- `Nosotros`: "Únete a nuestro equipo" + valores
- `Horarios`: Imagen de horarios
- `Clases`: Grid de 4 disciplinas (Jiu-Jitsu, Muay Thai, Box, Kids)
- `Contacto`: Formulario con validación

### `ContactForm`
Formulario con validación inteligente:
- Valida nombre (mínimo 2 caracteres)
- Valida teléfono mexicano (10, 12 o 13 dígitos)
- Valida email (opcional pero validado si se ingresa)
- Envía a WhatsApp con mensaje pre-formateado

## 🎣 Hooks Personalizados

### `useScrollToHash()`
Permite navegar suavemente a secciones con `#inicio`, `#contacto`, etc.

```jsx
export function MyComponent() {
  useScrollToHash();
  return <a href="#contacto">Ir a contacto</a>;
}
```

### `useScrollTopButton()`
Retorna `isVisible` y `scrollToTop`.

```jsx
const { isVisible, scrollToTop } = useScrollTopButton();
```

### `useDelayedPulse(delayMs = 5000)`
Retorna `true` después de N milisegundos.

```jsx
const shouldPulse = useDelayedPulse(5000);
// Útil para animar elementos con CSS al cargar
```

### `useFormVisibility(sectionId)`
Detecta si una sección está visible (Intersection Observer).

```jsx
const isFormVisible = useFormVisibility('contacto');
// Usar para ocultar WhatsApp cuando el formulario está a la vista
```

## 🛠️ Validadores

Funciones en `src/utils/validators.js`:

- `normalizePhone(raw)`: Extrae solo dígitos
- `isValidMXPhone(digits)`: Valida formato mexicano
- `toWhatsAppPhone(digits)`: Convierte a formato wa.me
- `isValidEmail(email)`: Valida email
- `isValidName(name)`: Valida nombre (>= 2 caracteres)
- `buildWhatsAppMessage(data)`: Construye mensaje formateado

## 🎯 Variables CSS Globales

En `src/styles/globals.css`:

```css
:root {
  --color-primary: #c1121f;      /* Rojo FBA */
  --color-text: #f5f5f5;         /* Texto principal */
  --color-text-secondary: #cfd6e4;
  --spacing-lg: 24px;
  --radius-full: 999px;
  --shadow-md: 0 14px 34px rgba(0,0,0,0.50);
  /* ... más variables */
}
```

Reutilizables en cualquier componente CSS Module.

## 📱 Responsive

Todos los componentes incluyen media queries para móvil (@media max-width: 768px, 860px, 900px).

## 🚀 Despliegue en Netlify

1. **Instala dependencias**:
   ```bash
   npm install
   ```

2. **Build**:
   ```bash
   npm run build
   ```

3. **Configura `netlify.toml`** (opcional):
   ```toml
   [build]
   command = "npm run build"
   publish = "dist"
   ```

4. **Sube a GitHub** y conecta Netlify para CI/CD automático.

## 🔄 Flujo de Desarrollo

1. Crea un componente nuevo en `src/components/` o `src/sections/`
2. Importa en `App.jsx`
3. Usa CSS Modules para estilos locales (no hay conflictos de nombres)
4. Reutiliza hooks si necesitas comportamientos comunes
5. Las imágenes van en `public/images/` con rutas `/images/...`

## ✨ Características

✅ **Scroll suave** a secciones con anchors  
✅ **Validación inteligente** del formulario  
✅ **Envío a WhatsApp** automático  
✅ **Botones flotantes** con animaciones  
✅ **Responsive** en todos los dispositivos  
✅ **Dark mode** por defecto  
✅ **Componentes reutilizables** con CSS Modules  
✅ **Hooks personalizados** para lógica de comportamiento  
✅ **Listo para Netlify** y otros deploys  

## 📧 Contacto y WhatsApp

El número de WhatsApp se configura en:
- `src/components/Header/Header.jsx`
- `src/components/FloatingActions/FloatingActions.jsx`
- `src/sections/Contacto/ContactForm.jsx`

Actualiza `WHATSAPP_NUMBER` según sea necesario.

---

**¡Listo para crecer!** Esta arquitectura soporta agregar páginas, más componentes, y lógica más compleja sin problemas.
