import { useState } from 'react'
import { productosIniciales } from '../data/productos.js'
import ResumenInventario from '../components/inventario/ResumenInventario.jsx'
import FiltrosProductos from '../components/inventario/FiltrosProductos.jsx'
import TablaProductos from '../components/inventario/TablaProductos.jsx'
import FormularioProducto from '../components/inventario/FormularioProducto.jsx'

// Home solo mantiene el estado y arma la pantalla con componentes más pequeños
export default function Home() {
  const [productos, setProductos] = useState(productosIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todas')

  const visibles = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (filtro === 'Todas' || p.categoria === filtro)
  )

  const cambiarStock = (id, delta) =>
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    )

  const eliminar = (id) => setProductos((prev) => prev.filter((p) => p.id !== id))

  const agregar = (producto) => setProductos((prev) => [...prev, { id: Date.now(), ...producto }])

  return (
    <section>
      <h2 className="titulo">Panel de inventario</h2>
      <ResumenInventario productos={productos} />
      <FiltrosProductos busqueda={busqueda} onBusqueda={setBusqueda} filtro={filtro} onFiltro={setFiltro} />
      <TablaProductos productos={visibles} onCambiarStock={cambiarStock} onEliminar={eliminar} />
      <h3 className="subtitulo">Agregar producto</h3>
      <FormularioProducto onAgregar={agregar} />
    </section>
  )
}
