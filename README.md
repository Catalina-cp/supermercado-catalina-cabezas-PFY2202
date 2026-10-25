# Supermercado – Gestión de Inventario

Actividad formativa 1, Semana 1 – Desarrollo Frontend II (PFY2202).

Sitio web de gestión de inventario para un supermercado, desarrollado con **React**, **JavaScript**, **HTML** y **CSS**, usando **React Router** para la navegación entre pantallas.

## Páginas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Inicio | Panel de inventario: resumen, búsqueda, filtro por categoría, control de stock y alta/baja de productos |
| `/quienes-somos` | Quiénes somos | Misión, visión, valores e historia del supermercado |
| `/preguntas-frecuentes` | Preguntas frecuentes | Preguntas y respuestas desplegables sobre el uso del sistema |

La navegación se realiza desde un **menú inferior** fijo, configurado con React Router (`HashRouter`, `Routes`, `Route` y `NavLink`).

## Requisitos

- Node.js 18 o superior

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Luego abre la URL que muestra la terminal (normalmente http://localhost:5173).

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── components/
│   ├── Header.jsx
│   └── BottomNav.jsx
├── pages/
│   ├── Home.jsx
│   ├── QuienesSomos.jsx
│   └── PreguntasFrecuentes.jsx
├── App.jsx
├── main.jsx
└── index.css
```
