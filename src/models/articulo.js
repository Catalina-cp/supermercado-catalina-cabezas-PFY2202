/**
 * Contrato único de artículo (lo usan Home, Listado, Detalle, Carrito y los formularios).
 *
 * Obligatorios:
 *   id      {string}  identificador único (crypto.randomUUID)
 *   nombre  {string}  3 a 60 caracteres
 *   marca   {string}  2 a 40 caracteres
 *   tipo    {string}  uno de TIPOS_PRODUCTO
 *   precio  {number}  entero mayor a 0 (CLP)
 *   stock   {number}  entero mayor o igual a 0 (unidades disponibles en inventario)
 *
 * Opcionales:
 *   descripcion {string}  hasta 200 caracteres (queda vacía si no se informa)
 */

export const TIPOS_PRODUCTO = [
  'Abarrotes',
  'Lácteos',
  'Frutas y verduras',
  'Carnes',
  'Bebidas',
  'Limpieza',
]

export function crearId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  // Respaldo para navegadores sin crypto.randomUUID
  return `art-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

// Construye un artículo válido a partir de los valores del formulario
export function crearArticulo({ nombre, marca, tipo, precio, stock, descripcion = '' }) {
  return {
    id: crearId(),
    nombre: String(nombre).trim(),
    marca: String(marca).trim(),
    tipo,
    precio: Number(precio),
    stock: Number(stock),
    descripcion: String(descripcion).trim(),
  }
}
