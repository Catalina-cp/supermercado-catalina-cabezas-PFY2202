# Supermercado – Gestión de Inventario

Actividades formativas de Desarrollo Frontend II (PFY2202). Sitio de gestión de inventario de un supermercado hecho con **React**, **React Router** (`react-router`), **Bootstrap 5** y JavaScript.

## Páginas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Inicio | Panel de inventario: resumen, búsqueda, filtro, ajuste de stock, alta y baja de artículos |
| `/quienes-somos` | Quiénes somos | Misión, visión, valores e historia |
| `/preguntas-frecuentes` | Preguntas frecuentes | Preguntas y respuestas desplegables |
| `/agregar-articulo` | Agregar artículo | Formulario con validación para ingresar artículos al inventario |
| `/articulos` | Listado de artículos | Tabla de artículos con **filtro por categoría** |
| `/articulos/:id` | Detalle del artículo | Datos del artículo y botón **Agregar al carrito** |
| `/carrito` | Carrito de compras | Lista del carrito, aumentar/disminuir cantidades, total |
| `*` | Página no encontrada | Ruta inexistente |

## Estado global (`src/context/InventarioContext.jsx`)

Context API + `useReducer`. Un único estado compartido por todas las pantallas:

- `articulos`: inventario completo (cada artículo con su `stock` disponible).
- `carrito`: lista de `{ id, cantidad }`.

Reglas:

- **Filtrar** por categoría solo cambia lo que se muestra; el inventario original no se modifica.
- **Agregar al carrito** resta 1 unidad del stock del inventario (solo si hay stock).
- En el **carrito**, `+` resta del inventario y `−` devuelve al inventario. Si la cantidad llega a 0, el artículo sale del carrito.
- **Quitar** y **Vaciar carrito** devuelven las unidades al inventario.
- Eliminar un artículo del inventario también lo saca del carrito.

## Contrato de artículo (`src/models/articulo.js`)

Obligatorios: `id` (UUID), `nombre`, `marca`, `tipo`, `precio`, `stock`. Opcional: `descripcion`.
La validación (con expresiones regulares y largos) está en `src/utils/validacion.js`.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Requiere Node.js 20 o superior (por `react-router` v7).

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── components/        Header, TopMenu, BottomNav
│   └── inventario/    ResumenInventario, TarjetaResumen, FiltrosProductos, TablaProductos, FormularioArticulo
├── context/           InventarioContext.jsx (estado global)
├── data/              productos.js (inventario inicial)
├── models/            articulo.js (contrato del artículo)
├── pages/             Home, QuienesSomos, PreguntasFrecuentes, AgregarArticulo,
│                      ListaArticulos, DetalleArticulo, Carrito, NotFound
├── utils/             formato.js, validacion.js, confirmar.js
├── App.jsx
├── main.jsx
└── index.css
```

## Sitio publicado

https://catalina-cp.github.io/supermercado-catalina-cabezas-PFY2202/
