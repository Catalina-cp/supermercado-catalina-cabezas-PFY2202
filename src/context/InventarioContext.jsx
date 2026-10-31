import { createContext, useContext, useReducer } from 'react'

// Estado global: lista de artículos con nombre, marca y tipo de producto
const articulosIniciales = [
  { id: 1, nombre: 'Arroz grado 1 (1 kg)', marca: 'Tucapel', tipo: 'Abarrotes' },
  { id: 2, nombre: 'Leche entera (1 L)', marca: 'Colun', tipo: 'Lácteos' },
  { id: 3, nombre: 'Aceite de maravilla (1 L)', marca: 'Chef', tipo: 'Abarrotes' },
  { id: 4, nombre: 'Detergente líquido (3 L)', marca: 'Omo', tipo: 'Limpieza' },
]

export const TIPOS_PRODUCTO = [
  'Abarrotes',
  'Lácteos',
  'Frutas y verduras',
  'Carnes',
  'Bebidas',
  'Limpieza',
]

function reducer(estado, accion) {
  switch (accion.type) {
    case 'AGREGAR':
      return [...estado, { id: Date.now(), ...accion.articulo }]
    case 'ELIMINAR':
      return estado.filter((a) => a.id !== accion.id)
    default:
      return estado
  }
}

const InventarioContext = createContext(null)

export function InventarioProvider({ children }) {
  const [articulos, dispatch] = useReducer(reducer, articulosIniciales)

  const agregarArticulo = (articulo) => dispatch({ type: 'AGREGAR', articulo })
  const eliminarArticulo = (id) => dispatch({ type: 'ELIMINAR', id })

  return (
    <InventarioContext.Provider value={{ articulos, agregarArticulo, eliminarArticulo }}>
      {children}
    </InventarioContext.Provider>
  )
}

export function useInventario() {
  const ctx = useContext(InventarioContext)
  if (!ctx) throw new Error('useInventario debe usarse dentro de InventarioProvider')
  return ctx
}
