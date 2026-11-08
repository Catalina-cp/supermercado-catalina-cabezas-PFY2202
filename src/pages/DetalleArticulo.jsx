import { Link, useParams } from 'react-router'
import { useInventario } from '../context/InventarioContext.jsx'
import { formatoPeso, estadoStock } from '../utils/formato.js'

export default function DetalleArticulo() {
  const { id } = useParams()
  const { articulos, carrito, agregarAlCarrito } = useInventario()

  const articulo = articulos.find((a) => a.id === id)

  if (!articulo) {
    return (
      <section className="text-center py-5">
        <h2 className="titulo">Artículo no encontrado</h2>
        <p className="parrafo">Este artículo no existe o fue eliminado del inventario.</p>
        <Link to="/articulos" className="btn btn-success">Volver al listado</Link>
      </section>
    )
  }

  const est = estadoStock(articulo.stock)
  const enCarrito = carrito.find((i) => i.id === articulo.id)?.cantidad ?? 0
  const sinStock = articulo.stock === 0

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/articulos">Listado de artículos</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Detalle</li>
        </ol>
      </nav>

      <article className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
            <div>
              <h2 className="titulo mb-1">{articulo.nombre}</h2>
              <p className="text-secondary mb-2">Marca: <strong>{articulo.marca}</strong></p>
            </div>
            <span className="badge text-bg-secondary fs-6">{articulo.tipo}</span>
          </div>

          <p className="display-6 text-success mb-3">{formatoPeso(articulo.precio)}</p>

          {articulo.descripcion && <p className="parrafo">{articulo.descripcion}</p>}

          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item d-flex justify-content-between">
              <span>Disponibles en inventario</span>
              <span>
                <strong>{articulo.stock}</strong> <span className={`badge ${est.clase}`}>{est.texto}</span>
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>En tu carrito</span>
              <strong aria-live="polite">{enCarrito}</strong>
            </li>
          </ul>

          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-success"
              onClick={() => agregarAlCarrito(articulo.id)}
              disabled={sinStock}
            >
              🛒 Agregar al carrito
            </button>
            <Link to="/carrito" className="btn btn-outline-success">Ir al carrito</Link>
            <Link to="/articulos" className="btn btn-outline-secondary">Volver al listado</Link>
          </div>
          {sinStock && (
            <p className="text-danger mt-3 mb-0" role="status">
              No quedan unidades disponibles de este artículo.
            </p>
          )}
        </div>
      </article>
    </section>
  )
}
