import { NavLink } from 'react-router-dom'

// Menú nuevo (semana 2): lleva a las dos páginas de gestión de artículos
export default function TopMenu() {
  const clase = ({ isActive }) => (isActive ? 'nav-link text-white fw-bold' : 'nav-link text-white')

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Menú de artículos">
      <div className="container">
        <span className="navbar-text text-white me-3">Artículos:</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/agregar-articulo" className={clase}>
              ➕ Agregar artículo
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/articulos" className={clase}>
              📋 Listado de artículos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}