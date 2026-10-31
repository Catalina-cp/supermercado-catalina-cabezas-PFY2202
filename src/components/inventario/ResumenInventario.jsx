import TarjetaResumen from './TarjetaResumen.jsx'
import { formatoPeso, STOCK_BAJO } from '../../utils/formato.js'

export default function ResumenInventario({ productos }) {
  const tarjetas = [
    { etiqueta: 'Productos', valor: productos.length },
    { etiqueta: 'Unidades en stock', valor: productos.reduce((s, p) => s + p.stock, 0) },
    {
      etiqueta: 'Valor del inventario',
      valor: formatoPeso(productos.reduce((s, p) => s + p.stock * p.precio, 0)),
    },
    {
      etiqueta: 'Alertas de stock',
      valor: productos.filter((p) => p.stock <= STOCK_BAJO).length,
      alerta: true,
    },
  ]

  return (
    <div className="resumen">
      {tarjetas.map((t) => (
        <TarjetaResumen key={t.etiqueta} {...t} />
      ))}
    </div>
  )
}
