import { formatoPeso, estadoStock } from '../../utils/formato.js'

export default function TablaProductos({ productos, onCambiarStock, onEliminar }) {
  return (
    <div className="tabla-wrap">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 && (
            <tr>
              <td colSpan="6" className="vacio">No hay productos que coincidan.</td>
            </tr>
          )}
          {productos.map((p) => {
            const est = estadoStock(p.stock)
            return (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatoPeso(p.precio)}</td>
                <td>
                  <div className="stock-ctrl">
                    <button onClick={() => onCambiarStock(p.id, -1)} aria-label={`Restar una unidad de ${p.nombre}`}>−</button>
                    <strong>{p.stock}</strong>
                    <button onClick={() => onCambiarStock(p.id, 1)} aria-label={`Sumar una unidad de ${p.nombre}`}>+</button>
                  </div>
                </td>
                <td><span className={`badge ${est.clase}`}>{est.texto}</span></td>
                <td>
                  <button className="btn-eliminar" onClick={() => onEliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
