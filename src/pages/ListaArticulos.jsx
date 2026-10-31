import { Link } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'

export default function ListaArticulos() {
  const { articulos, eliminarArticulo } = useInventario()

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="titulo mb-0">Listado de artículos</h2>
        <span className="badge text-bg-success">{articulos.length} artículos</span>
      </div>

      {articulos.length === 0 ? (
        <div className="alert alert-info">
          Aún no hay artículos en el inventario. <Link to="/agregar-articulo">Agrega el primero</Link>.
        </div>
      ) : (
        <div className="table-responsive card shadow-sm">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-success">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Marca</th>
                <th scope="col">Tipo de producto</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articulos.map((a, i) => (
                <tr key={a.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{a.nombre}</td>
                  <td>{a.marca}</td>
                  <td><span className="badge text-bg-secondary">{a.tipo}</span></td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => eliminarArticulo(a.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
