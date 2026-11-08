import { NavLink } from 'react-router'
import { useInventario } from '../context/InventarioContext.jsx'

// Menú de gestión de artículos y carrito
export default function TopMenu() {
  const { totalUnidades } = useInventario()
  const clase = ({ isActive }) => (isActive ? 'nav-link text-white fw-bold' : 'nav-link text-white')

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Menú de artículos">
      <div className="container">
        <span className="navbar-text text-white me-3">Artículos:</span>
        <ul className="navbar-nav flex-wrap">
          <li className="nav-item">
            <NavLink to="/agregar-articulo" className={clase}>
              ➕ Agregar artículo
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/articulos" end className={clase}>
              📋 Listado de artículos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/carrito" className={clase}>
              🛒 Carrito{' '}
              <span className="badge rounded-pill text-bg-success" aria-label={`${totalUnidades} unidades en el carrito`}>
                {totalUnidades}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
