import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInventario, TIPOS_PRODUCTO } from '../context/InventarioContext.jsx'

const vacio = { nombre: '', marca: '', tipo: '' }

export default function AgregarArticulo() {
  const { agregarArticulo } = useInventario()
  const navigate = useNavigate()
  const [form, setForm] = useState(vacio)
  const [errores, setErrores] = useState({})

  const manejarCambio = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validar = () => {
    const err = {}
    if (!form.nombre.trim()) err.nombre = 'El nombre es obligatorio.'
    if (!form.marca.trim()) err.marca = 'La marca es obligatoria.'
    if (!form.tipo) err.tipo = 'Selecciona un tipo de producto.'
    return err
  }

  const enviar = (e) => {
    e.preventDefault()
    const err = validar()
    setErrores(err)
    if (Object.keys(err).length > 0) return

    agregarArticulo({
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      tipo: form.tipo,
    })
    setForm(vacio)
    navigate('/articulos')
  }

  return (
    <section>
      <h2 className="titulo">Agregar artículo</h2>
      <p className="text-secondary">Completa los datos para ingresar un nuevo artículo al inventario.</p>

      <form className="card shadow-sm" onSubmit={enviar} noValidate>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del producto</label>
            <input
              id="nombre"
              name="nombre"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={form.nombre}
              onChange={manejarCambio}
              placeholder="Ej: Fideos espagueti (400 g)"
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="marca" className="form-label">Marca</label>
            <input
              id="marca"
              name="marca"
              className={`form-control ${errores.marca ? 'is-invalid' : ''}`}
              value={form.marca}
              onChange={manejarCambio}
              placeholder="Ej: Carozzi"
            />
            {errores.marca && <div className="invalid-feedback">{errores.marca}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="tipo" className="form-label">Tipo de producto</label>
            <select
              id="tipo"
              name="tipo"
              className={`form-select ${errores.tipo ? 'is-invalid' : ''}`}
              value={form.tipo}
              onChange={manejarCambio}
            >
              <option value="">Selecciona...</option>
              {TIPOS_PRODUCTO.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errores.tipo && <div className="invalid-feedback">{errores.tipo}</div>}
          </div>

          <button type="submit" className="btn btn-success">Guardar artículo</button>
        </div>
      </form>
    </section>
  )
}
