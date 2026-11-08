import { createContext, useContext, useReducer } from 'react'
import { articulosIniciales } from '../data/productos.js'
import { crearArticulo } from '../models/articulo.js'

// Estado global único:
//   articulos: inventario completo (cada artículo con su stock disponible)
//   carrito:   lista de { id, cantidad } (el id apunta a un artículo del inventario)
const estadoInicial = { articulos: articulosIniciales, carrito: [] }

// Reducer: funciones puras, sin Date.now() ni randomUUID adentro (los ids se crean antes de despachar)
function reducer(estado, accion) {
  switch (accion.type) {
    case 'AGREGAR_ARTICULO':
      return { ...estado, articulos: [...estado.articulos, accion.articulo] }

    case 'ELIMINAR_ARTICULO':
      return {
        articulos: estado.articulos.filter((a) => a.id !== accion.id),
        carrito: estado.carrito.filter((i) => i.id !== accion.id),
      }

    case 'AJUSTAR_STOCK':
      return {
        ...estado,
        articulos: estado.articulos.map((a) =>
          a.id === accion.id ? { ...a, stock: Math.max(0, a.stock + accion.delta) } : a
        ),
      }

    // Agregar 1 unidad al carrito: resta 1 al inventario (solo si hay stock)
    case 'AGREGAR_AL_CARRITO': {
      const articulo = estado.articulos.find((a) => a.id === accion.id)
      if (!articulo || articulo.stock <= 0) return estado
      const enCarrito = estado.carrito.some((i) => i.id === accion.id)
      return {
        articulos: estado.articulos.map((a) =>
          a.id === accion.id ? { ...a, stock: a.stock - 1 } : a
        ),
        carrito: enCarrito
          ? estado.carrito.map((i) => (i.id === accion.id ? { ...i, cantidad: i.cantidad + 1 } : i))
          : [...estado.carrito, { id: accion.id, cantidad: 1 }],
      }
    }

    // Quitar 1 unidad del carrito: devuelve 1 al inventario (si llega a 0, sale del carrito)
    case 'QUITAR_DEL_CARRITO': {
      const item = estado.carrito.find((i) => i.id === accion.id)
      if (!item) return estado
      return {
        articulos: estado.articulos.map((a) =>
          a.id === accion.id ? { ...a, stock: a.stock + 1 } : a
        ),
        carrito:
          item.cantidad <= 1
            ? estado.carrito.filter((i) => i.id !== accion.id)
            : estado.carrito.map((i) => (i.id === accion.id ? { ...i, cantidad: i.cantidad - 1 } : i)),
      }
    }

    // Sacar un artículo completo del carrito: devuelve todas sus unidades al inventario
    case 'ELIMINAR_DEL_CARRITO': {
      const item = estado.carrito.find((i) => i.id === accion.id)
      if (!item) return estado
      return {
        articulos: estado.articulos.map((a) =>
          a.id === accion.id ? { ...a, stock: a.stock + item.cantidad } : a
        ),
        carrito: estado.carrito.filter((i) => i.id !== accion.id),
      }
    }

    // Vaciar el carrito: devuelve todo al inventario
    case 'VACIAR_CARRITO':
      return {
        articulos: estado.articulos.map((a) => {
          const item = estado.carrito.find((i) => i.id === a.id)
          return item ? { ...a, stock: a.stock + item.cantidad } : a
        }),
        carrito: [],
      }

    default:
      return estado
  }
}

const InventarioContext = createContext(null)

export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(reducer, estadoInicial)
  const { articulos, carrito } = estado

  // Carrito con los datos completos de cada artículo (el inventario sigue siendo la única fuente)
  const carritoDetallado = carrito
    .map((item) => {
      const articulo = articulos.find((a) => a.id === item.id)
      return articulo ? { ...articulo, cantidad: item.cantidad, subtotal: articulo.precio * item.cantidad } : null
    })
    .filter(Boolean)

  const totalUnidades = carrito.reduce((suma, i) => suma + i.cantidad, 0)
  const totalCarrito = carritoDetallado.reduce((suma, i) => suma + i.subtotal, 0)

  const valor = {
    articulos,
    carrito,
    carritoDetallado,
    totalUnidades,
    totalCarrito,
    agregarArticulo: (valores) => dispatch({ type: 'AGREGAR_ARTICULO', articulo: crearArticulo(valores) }),
    eliminarArticulo: (id) => dispatch({ type: 'ELIMINAR_ARTICULO', id }),
    ajustarStock: (id, delta) => dispatch({ type: 'AJUSTAR_STOCK', id, delta }),
    agregarAlCarrito: (id) => dispatch({ type: 'AGREGAR_AL_CARRITO', id }),
    quitarDelCarrito: (id) => dispatch({ type: 'QUITAR_DEL_CARRITO', id }),
    eliminarDelCarrito: (id) => dispatch({ type: 'ELIMINAR_DEL_CARRITO', id }),
    vaciarCarrito: () => dispatch({ type: 'VACIAR_CARRITO' }),
  }

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>
}

export function useInventario() {
  const ctx = useContext(InventarioContext)
  if (!ctx) throw new Error('useInventario debe usarse dentro de InventarioProvider')
  return ctx
}
