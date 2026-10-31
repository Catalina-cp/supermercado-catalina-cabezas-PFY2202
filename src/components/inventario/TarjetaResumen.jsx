export default function TarjetaResumen({ valor, etiqueta, alerta = false }) {
  return (
    <div className={alerta ? 'tarjeta alerta' : 'tarjeta'}>
      <span className="tarjeta-valor">{valor}</span>
      <span className="tarjeta-label">{etiqueta}</span>
    </div>
  )
}
