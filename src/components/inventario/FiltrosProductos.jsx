import { TIPOS_PRODUCTO } from '../../models/articulo.js'

export default function FiltrosProductos({ busqueda, onBusqueda, filtro, onFiltro }) {
  return (
    <div className="filtros">
      <input
        type="search"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => onBusqueda(e.target.value)}
        aria-label="Buscar producto"
      />
      <select value={filtro} onChange={(e) => onFiltro(e.target.value)} aria-label="Filtrar por categoría">
        <option>Todas</option>
        {TIPOS_PRODUCTO.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </div>
  )
}
