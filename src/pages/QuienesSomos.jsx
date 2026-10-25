export default function QuienesSomos() {
  return (
    <section>
      <h2 className="titulo">Quiénes somos</h2>

      <p className="parrafo">
        SuperMercado es una cadena de supermercados de barrio que nació con una idea simple: que
        las familias encuentren productos frescos, de calidad y a buen precio, con una atención
        cercana. Para lograrlo, nos apoyamos en un sistema de gestión de inventario que nos permite
        saber en todo momento qué hay en bodega y qué falta en las góndolas.
      </p>

      <div className="grid-info">
        <article className="tarjeta-info">
          <h3>🎯 Misión</h3>
          <p>
            Abastecer a nuestras comunidades con productos de calidad, manteniendo siempre el
            stock necesario y precios justos, gracias a una gestión eficiente y responsable.
          </p>
        </article>
        <article className="tarjeta-info">
          <h3>🔭 Visión</h3>
          <p>
            Ser el supermercado de barrio preferido por nuestros clientes, reconocido por su
            confiabilidad, cercanía y por el uso de tecnología para mejorar la compra diaria.
          </p>
        </article>
        <article className="tarjeta-info">
          <h3>🤝 Valores</h3>
          <ul>
            <li>Compromiso con el cliente</li>
            <li>Honestidad y transparencia</li>
            <li>Frescura y calidad</li>
            <li>Mejora continua</li>
          </ul>
        </article>
      </div>

      <h3 className="subtitulo">Nuestra historia</h3>
      <p className="parrafo">
        Comenzamos como un pequeño local familiar y, con el tiempo, crecimos hasta contar con
        varias sucursales. Con cada nueva tienda aprendimos que el control del inventario es clave:
        evita quiebres de stock, reduce las mermas y asegura que nuestros clientes siempre
        encuentren lo que buscan.
      </p>
    </section>
  )
}
