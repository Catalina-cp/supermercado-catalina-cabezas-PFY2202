import { Link } from 'react-router'
import { formatoPeso, estadoStock } from '../../utils/formato.js'

export default function TablaProductos({ articulos, onCambiarStock, onEliminar }) {
  return (
    <div className="tabla-wrap">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articulos.length === 0 && (
            <tr>
              <td colSpan="7" className="vacio">No hay productos que coincidan.</td>
            </tr>
          )}
          {articulos.map((a) => {
            const est = estadoStock(a.stock)
            return (
              <tr key={a.id}>
                <td><Link to={`/articulos/${a.id}`}>{a.nombre}</Link></td>
                <td>{a.marca}</td>
                <td>{a.tipo}</td>
                <td>{formatoPeso(a.precio)}</td>
                <td>
                  <div className="stock-ctrl">
                    <button onClick={() => onCambiarStock(a.id, -1)} aria-label={`Restar una unidad de ${a.nombre}`}>−</button>
                    <strong>{a.stock}</strong>
                    <button onClick={() => onCambiarStock(a.id, 1)} aria-label={`Sumar una unidad de ${a.nombre}`}>+</button>
                  </div>
                </td>
                <td><span className={`badge ${est.clase}`}>{est.texto}</span></td>
                <td>
                  <button className="btn-eliminar" onClick={() => onEliminar(a)}>Eliminar</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
