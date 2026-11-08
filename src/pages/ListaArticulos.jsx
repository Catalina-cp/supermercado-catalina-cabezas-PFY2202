import { useState } from 'react'
import { Link } from 'react-router'
import { useInventario } from '../context/InventarioContext.jsx'
import { TIPOS_PRODUCTO } from '../models/articulo.js'
import { formatoPeso, estadoStock } from '../utils/formato.js'
import { confirmarEliminacion } from '../utils/confirmar.js'

export default function ListaArticulos() {
  const { articulos, eliminarArticulo } = useInventario()
  const [categoria, setCategoria] = useState('Todas')

  // El filtro solo cambia lo que se muestra: la lista original del inventario no se modifica
  const visibles = categoria === 'Todas' ? articulos : articulos.filter((a) => a.tipo === categoria)

  const eliminar = (articulo) => {
    if (confirmarEliminacion(articulo.nombre)) eliminarArticulo(articulo.id)
  }

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="titulo mb-0">Listado de artículos</h2>
        <span className="badge text-bg-success" aria-live="polite">
          Mostrando {visibles.length} de {articulos.length}
        </span>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-sm-6 col-md-4">
          <label htmlFor="filtro-categoria" className="form-label mb-1">Filtrar por categoría</label>
          <select
            id="filtro-categoria"
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option>Todas</option>
            {TIPOS_PRODUCTO.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {visibles.length === 0 ? (
        <div className="alert alert-info">
          {articulos.length === 0 ? (
            <>Aún no hay artículos en el inventario. <Link to="/agregar-articulo">Agrega el primero</Link>.</>
          ) : (
            <>No hay artículos en la categoría «{categoria}».</>
          )}
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
                <th scope="col">Precio</th>
                <th scope="col">Disponibles</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((a, i) => {
                const est = estadoStock(a.stock)
                return (
                  <tr key={a.id}>
                    <th scope="row">{i + 1}</th>
                    <td><Link to={`/articulos/${a.id}`}>{a.nombre}</Link></td>
                    <td>{a.marca}</td>
                    <td><span className="badge text-bg-secondary">{a.tipo}</span></td>
                    <td>{formatoPeso(a.precio)}</td>
                    <td>
                      {a.stock} <span className={`badge ${est.clase}`}>{est.texto}</span>
                    </td>
                    <td>
                      <Link to={`/articulos/${a.id}`} className="btn btn-sm btn-outline-success me-2">
                        Ver detalle
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(a)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
