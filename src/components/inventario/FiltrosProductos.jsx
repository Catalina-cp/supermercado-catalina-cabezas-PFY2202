import { categorias } from '../../data/productos.js'

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
        {categorias.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}
