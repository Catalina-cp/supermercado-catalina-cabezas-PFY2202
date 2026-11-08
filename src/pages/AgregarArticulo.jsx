import { useNavigate } from 'react-router'
import { useInventario } from '../context/InventarioContext.jsx'
import FormularioArticulo from '../components/inventario/FormularioArticulo.jsx'

export default function AgregarArticulo() {
  const { agregarArticulo } = useInventario()
  const navigate = useNavigate()

  const guardar = (valores) => {
    agregarArticulo(valores)
    navigate('/articulos')
  }

  return (
    <section>
      <h2 className="titulo">Agregar artículo</h2>
      <p className="text-secondary">Completa los datos para ingresar un nuevo artículo al inventario.</p>
      <FormularioArticulo onGuardar={guardar} />
    </section>
  )
}
