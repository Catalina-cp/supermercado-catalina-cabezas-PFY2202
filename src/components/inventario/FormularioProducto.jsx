import { useState } from 'react'
import { categorias } from '../../data/productos.js'

const vacio = { nombre: '', categoria: categorias[0], precio: '', stock: '' }

export default function FormularioProducto({ onAgregar }) {
  const [form, setForm] = useState(vacio)
  const [error, setError] = useState('')

  const manejarCambio = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    const precio = Number(form.precio)
    const stock = Number(form.stock)
    if (!form.nombre.trim()) return setError('Ingresa el nombre del producto.')
    if (!(precio > 0)) return setError('El precio debe ser mayor a 0.')
    if (!Number.isInteger(stock) || stock < 0) return setError('El stock debe ser un número entero (0 o más).')
    onAgregar({ nombre: form.nombre.trim(), categoria: form.categoria, precio, stock })
    setForm(vacio)
    setError('')
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <input name="nombre" placeholder="Nombre del producto" value={form.nombre} onChange={manejarCambio} />
      <select name="categoria" value={form.categoria} onChange={manejarCambio}>
        {categorias.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input name="precio" type="number" min="1" placeholder="Precio (CLP)" value={form.precio} onChange={manejarCambio} />
      <input name="stock" type="number" min="0" placeholder="Stock inicial" value={form.stock} onChange={manejarCambio} />
      <button type="submit" className="btn-primario">Agregar</button>
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  )
}
