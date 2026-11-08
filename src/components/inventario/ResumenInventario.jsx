import TarjetaResumen from './TarjetaResumen.jsx'
import { formatoPeso, STOCK_BAJO } from '../../utils/formato.js'

export default function ResumenInventario({ articulos }) {
  const tarjetas = [
    { etiqueta: 'Productos', valor: articulos.length },
    { etiqueta: 'Unidades en stock', valor: articulos.reduce((s, a) => s + a.stock, 0) },
    {
      etiqueta: 'Valor del inventario',
      valor: formatoPeso(articulos.reduce((s, a) => s + a.stock * a.precio, 0)),
    },
    {
      etiqueta: 'Alertas de stock',
      valor: articulos.filter((a) => a.stock <= STOCK_BAJO).length,
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
