import { useState } from 'react'
import { useInventario } from '../context/InventarioContext.jsx'
import { confirmarEliminacion } from '../utils/confirmar.js'
import ResumenInventario from '../components/inventario/ResumenInventario.jsx'
import FiltrosProductos from '../components/inventario/FiltrosProductos.jsx'
import TablaProductos from '../components/inventario/TablaProductos.jsx'
import FormularioArticulo from '../components/inventario/FormularioArticulo.jsx'

// Home usa el mismo inventario global que el resto de las pantallas (ya no tiene datos propios)
export default function Home() {
  const { articulos, ajustarStock, eliminarArticulo, agregarArticulo } = useInventario()
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todas')

  const visibles = articulos.filter(
    (a) =>
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (filtro === 'Todas' || a.tipo === filtro)
  )

  const eliminar = (articulo) => {
    if (confirmarEliminacion(articulo.nombre)) eliminarArticulo(articulo.id)
  }

  return (
    <section>
      <h2 className="titulo">Panel de inventario</h2>
      <ResumenInventario articulos={articulos} />
      <FiltrosProductos busqueda={busqueda} onBusqueda={setBusqueda} filtro={filtro} onFiltro={setFiltro} />
      <TablaProductos articulos={visibles} onCambiarStock={ajustarStock} onEliminar={eliminar} />
      <h3 className="subtitulo">Agregar producto</h3>
      <FormularioArticulo onGuardar={agregarArticulo} textoBoton="Agregar" />
    </section>
  )
}
