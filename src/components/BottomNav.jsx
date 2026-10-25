import { NavLink } from 'react-router-dom'

const enlaces = [
  { to: '/', icono: '🏠', texto: 'Inicio' },
  { to: '/quienes-somos', icono: '🏪', texto: 'Quiénes somos' },
  { to: '/preguntas-frecuentes', icono: '❓', texto: 'Preguntas frecuentes' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {enlaces.map((e) => (
        <NavLink
          key={e.to}
          to={e.to}
          end={e.to === '/'}
          className={({ isActive }) => (isActive ? 'nav-item activo' : 'nav-item')}
        >
          <span className="nav-icono" aria-hidden="true">{e.icono}</span>
          <span className="nav-texto">{e.texto}</span>
        </NavLink>
      ))}
    </nav>
  )
}
