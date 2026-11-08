import { TIPOS_PRODUCTO } from '../models/articulo.js'

// Letras (con tildes y ñ), números y algunos signos habituales en nombres de productos
const RE_NOMBRE = /^[\p{L}\p{N}][\p{L}\p{N} .,()/%-]{2,59}$/u
const RE_MARCA = /^[\p{L}\p{N}][\p{L}\p{N} .&'-]{1,39}$/u
const RE_ENTERO = /^\d+$/

// Devuelve un objeto { campo: 'mensaje' }. Si está vacío, el artículo es válido.
export function validarArticulo(valores) {
  const errores = {}
  const nombre = String(valores.nombre ?? '').trim()
  const marca = String(valores.marca ?? '').trim()
  const precio = String(valores.precio ?? '').trim()
  const stock = String(valores.stock ?? '').trim()
  const descripcion = String(valores.descripcion ?? '').trim()

  if (!nombre) errores.nombre = 'El nombre es obligatorio.'
  else if (!RE_NOMBRE.test(nombre))
    errores.nombre =
      'El nombre debe tener entre 3 y 60 caracteres y solo letras, números y . , ( ) / % -'

  if (!marca) errores.marca = 'La marca es obligatoria.'
  else if (!RE_MARCA.test(marca))
    errores.marca = "La marca debe tener entre 2 y 40 caracteres y solo letras, números y . & ' -"

  if (!valores.tipo) errores.tipo = 'Selecciona un tipo de producto.'
  else if (!TIPOS_PRODUCTO.includes(valores.tipo)) errores.tipo = 'El tipo de producto no es válido.'

  if (!precio) errores.precio = 'El precio es obligatorio.'
  else if (!RE_ENTERO.test(precio) || Number(precio) <= 0 || Number(precio) > 10000000)
    errores.precio = 'El precio debe ser un número entero entre 1 y 10.000.000.'

  if (!stock) errores.stock = 'El stock es obligatorio.'
  else if (!RE_ENTERO.test(stock) || Number(stock) > 100000)
    errores.stock = 'El stock debe ser un número entero entre 0 y 100.000.'

  if (descripcion.length > 200) errores.descripcion = 'La descripción no puede superar los 200 caracteres.'

  return errores
}
