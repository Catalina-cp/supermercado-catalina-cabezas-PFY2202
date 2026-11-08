import { Link } from 'react-router'
import { useInventario } from '../context/InventarioContext.jsx'
import { formatoPeso } from '../utils/formato.js'

export default function Carrito() {
  const {
    carritoDetallado,
    totalUnidades,
    totalCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useInventario()

  const vaciar = () => {
    if (window.confirm('¿Vaciar el carrito? Las unidades volverán al inventario.')) vaciarCarrito()
  }

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="titulo mb-0">Carrito de compras</h2>
        <span className="badge text-bg-success" aria-live="polite">{totalUnidades} unidades</span>
      </div>

      {carritoDetallado.length === 0 ? (
        <div className="alert alert-info">
          Tu carrito está vacío. <Link to="/articulos">Ver el listado de artículos</Link>.
        </div>
      ) : (
        <>
          <div className="table-responsive card shadow-sm">
            <table className="table align-middle mb-0">
              <thead className="table-success">
                <tr>
                  <th scope="col">Artículo</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Disponibles</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col"><span className="visually-hidden">Quitar</span></th>
                </tr>
              </thead>
              <tbody>
                {carritoDetallado.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <Link to={`/articulos/${a.id}`}>{a.nombre}</Link>
                      <div className="small text-secondary">{a.marca}</div>
                    </td>
                    <td>{formatoPeso(a.precio)}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label={`Cantidad de ${a.nombre}`}>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => quitarDelCarrito(a.id)}
                          aria-label={`Disminuir cantidad de ${a.nombre}`}
                        >
                          −
                        </button>
                        <span className="btn btn-sm disabled px-3 fw-bold">{a.cantidad}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => agregarAlCarrito(a.id)}
                          disabled={a.stock === 0}
                          aria-label={`Aumentar cantidad de ${a.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{a.stock}</td>
                    <td className="fw-bold">{formatoPeso(a.subtotal)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarDelCarrito(a.id)}
                        aria-label={`Quitar ${a.nombre} del carrito`}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
            <button className="btn btn-outline-danger" onClick={vaciar}>Vaciar carrito</button>
            <p className="fs-4 mb-0">
              Total: <strong className="text-success">{formatoPeso(totalCarrito)}</strong>
            </p>
          </div>
        </>
      )}
    </section>
  )
}
