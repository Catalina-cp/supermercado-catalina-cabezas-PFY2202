import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="text-center py-5">
      <p className="display-1 mb-0">🛒</p>
      <h2 className="titulo">Página no encontrada</h2>
      <p className="parrafo">La dirección que buscas no existe o fue cambiada.</p>
      <Link to="/" className="btn btn-success">Volver al inicio</Link>
    </section>
  )
}
