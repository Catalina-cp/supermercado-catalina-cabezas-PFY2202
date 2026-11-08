// Pide confirmación antes de eliminar un artículo del inventario
export function confirmarEliminacion(nombre) {
  return window.confirm(`¿Seguro que quieres eliminar "${nombre}" del inventario?`)
}
