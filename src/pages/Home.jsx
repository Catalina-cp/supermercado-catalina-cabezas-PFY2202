import { useState } from 'react'

const productosIniciales = [
  { id: 1, nombre: 'Arroz grado 1 (1 kg)', categoria: 'Abarrotes', precio: 1490, stock: 120 },
  { id: 2, nombre: 'Fideos espagueti (400 g)', categoria: 'Abarrotes', precio: 990, stock: 85 },
  { id: 3, nombre: 'Aceite de maravilla (1 L)', categoria: 'Abarrotes', precio: 2790, stock: 8 },
  { id: 4, nombre: 'Leche entera (1 L)', categoria: 'Lácteos', precio: 1090, stock: 64 },
  { id: 5, nombre: 'Yogurt natural (150 g)', categoria: 'Lácteos', precio: 450, stock: 5 },
  { id: 6, nombre: 'Queso gauda laminado (250 g)', categoria: 'Lácteos', precio: 2990, stock: 30 },
  { id: 7, nombre: 'Manzana roja (kg)', categoria: 'Frutas y verduras', precio: 1890, stock: 40 },
  { id: 8, nombre: 'Tomate (kg)', categoria: 'Frutas y verduras', precio: 1790, stock: 0 },
  { id: 9, nombre: 'Pechuga de pollo (kg)', categoria: 'Carnes', precio: 5490, stock: 22 },
  { id: 10, nombre: 'Detergente líquido (3 L)', categoria: 'Limpieza', precio: 7990, stock: 9 },
]

const categorias = ['Abarrotes', 'Lácteos', 'Frutas y verduras', 'Carnes', 'Limpieza']
const STOCK_BAJO = 10

const formatoPeso = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

function estadoStock(stock) {
  if (stock === 0) return { texto: 'Agotado', clase: 'agotado' }
  if (stock <= STOCK_BAJO) return { texto: 'Stock bajo', clase: 'bajo' }
  return { texto: 'Disponible', clase: 'ok' }
}

const formularioVacio = { nombre: '', categoria: categorias[0], precio: '', stock: '' }

export default function Home() {
  const [productos, setProductos] = useState(productosIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todas')
  const [form, setForm] = useState(formularioVacio)
  const [error, setError] = useState('')

  const visibles = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (filtro === 'Todas' || p.categoria === filtro)
  )

  const totalProductos = productos.length
  const unidadesTotales = productos.reduce((s, p) => s + p.stock, 0)
  const valorInventario = productos.reduce((s, p) => s + p.stock * p.precio, 0)
  const alertas = productos.filter((p) => p.stock <= STOCK_BAJO).length

  const cambiarStock = (id, delta) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    )
  }

  const eliminar = (id) => setProductos((prev) => prev.filter((p) => p.id !== id))

  const manejarCambio = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const agregar = (e) => {
    e.preventDefault()
    const precio = Number(form.precio)
    const stock = Number(form.stock)
    if (!form.nombre.trim()) return setError('Ingresa el nombre del producto.')
    if (!(precio > 0)) return setError('El precio debe ser mayor a 0.')
    if (!Number.isInteger(stock) || stock < 0) return setError('El stock debe ser un número entero (0 o más).')
    setProductos((prev) => [
      ...prev,
      { id: Date.now(), nombre: form.nombre.trim(), categoria: form.categoria, precio, stock },
    ])
    setForm(formularioVacio)
    setError('')
  }

  return (
    <section>
      <h2 className="titulo">Panel de inventario</h2>

      <div className="resumen">
        <div className="tarjeta">
          <span className="tarjeta-valor">{totalProductos}</span>
          <span className="tarjeta-label">Productos</span>
        </div>
        <div className="tarjeta">
          <span className="tarjeta-valor">{unidadesTotales}</span>
          <span className="tarjeta-label">Unidades en stock</span>
        </div>
        <div className="tarjeta">
          <span className="tarjeta-valor">{formatoPeso(valorInventario)}</span>
          <span className="tarjeta-label">Valor del inventario</span>
        </div>
        <div className="tarjeta alerta">
          <span className="tarjeta-valor">{alertas}</span>
          <span className="tarjeta-label">Alertas de stock</span>
        </div>
      </div>

      <div className="filtros">
        <input
          type="search"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar producto"
        />
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} aria-label="Filtrar por categoría">
          <option>Todas</option>
          {categorias.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="tabla-wrap">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibles.length === 0 && (
              <tr>
                <td colSpan="6" className="vacio">No hay productos que coincidan.</td>
              </tr>
            )}
            {visibles.map((p) => {
              const est = estadoStock(p.stock)
              return (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>{formatoPeso(p.precio)}</td>
                  <td>
                    <div className="stock-ctrl">
                      <button onClick={() => cambiarStock(p.id, -1)} aria-label={`Restar una unidad de ${p.nombre}`}>−</button>
                      <strong>{p.stock}</strong>
                      <button onClick={() => cambiarStock(p.id, 1)} aria-label={`Sumar una unidad de ${p.nombre}`}>+</button>
                    </div>
                  </td>
                  <td><span className={`badge ${est.clase}`}>{est.texto}</span></td>
                  <td>
                    <button className="btn-eliminar" onClick={() => eliminar(p.id)}>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h3 className="subtitulo">Agregar producto</h3>
      <form className="formulario" onSubmit={agregar}>
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
    </section>
  )
}
