import { useRef, useState } from 'react'
import { TIPOS_PRODUCTO } from '../../models/articulo.js'
import { validarArticulo } from '../../utils/validacion.js'

const vacio = { nombre: '', marca: '', tipo: '', precio: '', stock: '', descripcion: '' }
const ORDEN = ['nombre', 'marca', 'tipo', 'precio', 'stock', 'descripcion']

// Formulario único para dar de alta artículos (lo usan Home y la página Agregar artículo)
export default function FormularioArticulo({ onGuardar, textoBoton = 'Guardar artículo' }) {
  const [form, setForm] = useState(vacio)
  const [errores, setErrores] = useState({})
  const refs = useRef({})

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Al escribir, se limpia el error de ese campo
    setErrores((prev) => {
      if (!prev[name]) return prev
      const { [name]: _quitado, ...resto } = prev
      return resto
    })
  }

  const enviar = (e) => {
    e.preventDefault()
    const err = validarArticulo(form)
    setErrores(err)
    const primerInvalido = ORDEN.find((campo) => err[campo])
    if (primerInvalido) {
      refs.current[primerInvalido]?.focus() // enfoca el primer campo con error
      return
    }
    onGuardar(form)
    setForm(vacio)
  }

  // Props comunes de cada campo (clase de error, aria-invalid y enlace con su mensaje)
  const props = (campo) => ({
    id: `campo-${campo}`,
    name: campo,
    value: form[campo],
    onChange: manejarCambio,
    ref: (el) => (refs.current[campo] = el),
    'aria-invalid': errores[campo] ? 'true' : 'false',
    'aria-describedby': errores[campo] ? `error-${campo}` : undefined,
  })

  const mensaje = (campo) =>
    errores[campo] && (
      <div id={`error-${campo}`} className="invalid-feedback" role="alert">
        {errores[campo]}
      </div>
    )

  const clase = (campo, base = 'form-control') => `${base} ${errores[campo] ? 'is-invalid' : ''}`

  return (
    <form className="card shadow-sm" onSubmit={enviar} noValidate>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="campo-nombre" className="form-label">Nombre del producto</label>
            <input {...props('nombre')} className={clase('nombre')} placeholder="Ej: Fideos espagueti (400 g)" />
            {mensaje('nombre')}
          </div>

          <div className="col-md-6">
            <label htmlFor="campo-marca" className="form-label">Marca</label>
            <input {...props('marca')} className={clase('marca')} placeholder="Ej: Carozzi" />
            {mensaje('marca')}
          </div>

          <div className="col-md-4">
            <label htmlFor="campo-tipo" className="form-label">Tipo de producto</label>
            <select {...props('tipo')} className={clase('tipo', 'form-select')}>
              <option value="">Selecciona...</option>
              {TIPOS_PRODUCTO.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {mensaje('tipo')}
          </div>

          <div className="col-md-4">
            <label htmlFor="campo-precio" className="form-label">Precio (CLP)</label>
            <input {...props('precio')} className={clase('precio')} inputMode="numeric" placeholder="Ej: 990" />
            {mensaje('precio')}
          </div>

          <div className="col-md-4">
            <label htmlFor="campo-stock" className="form-label">Stock inicial</label>
            <input {...props('stock')} className={clase('stock')} inputMode="numeric" placeholder="Ej: 50" />
            {mensaje('stock')}
          </div>

          <div className="col-12">
            <label htmlFor="campo-descripcion" className="form-label">
              Descripción <span className="text-secondary">(opcional)</span>
            </label>
            <textarea {...props('descripcion')} className={clase('descripcion')} rows="2" />
            {mensaje('descripcion')}
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3">{textoBoton}</button>
      </div>
    </form>
  )
}
