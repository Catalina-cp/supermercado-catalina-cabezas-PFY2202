// Funciones puras reutilizables (sin React)

export const STOCK_BAJO = 10

export const formatoPeso = (n) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(n)

export function estadoStock(stock) {
  if (stock === 0) return { texto: 'Agotado', clase: 'agotado' }
  if (stock <= STOCK_BAJO) return { texto: 'Stock bajo', clase: 'bajo' }
  return { texto: 'Disponible', clase: 'ok' }
}
