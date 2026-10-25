import { useState } from 'react'

const preguntas = [
  {
    q: '¿Cómo agrego un producto al inventario?',
    a: 'En la página de inicio, completa el formulario "Agregar producto" con el nombre, la categoría, el precio y el stock inicial, y presiona el botón Agregar.',
  },
  {
    q: '¿Cómo actualizo el stock de un producto?',
    a: 'En la tabla del inicio, usa los botones + y − que aparecen junto al stock de cada producto para sumar o restar unidades.',
  },
  {
    q: '¿Qué significa "Stock bajo"?',
    a: 'Un producto aparece con estado "Stock bajo" cuando le quedan 10 unidades o menos. Así sabes cuándo reponerlo antes de que se agote.',
  },
  {
    q: '¿Puedo buscar o filtrar productos?',
    a: 'Sí. Puedes escribir el nombre en el buscador y, además, filtrar por categoría usando el selector que está sobre la tabla.',
  },
  {
    q: '¿Cómo elimino un producto?',
    a: 'Presiona el botón Eliminar en la fila del producto que ya no quieras mantener en el inventario.',
  },
  {
    q: '¿Se guardan los cambios al recargar la página?',
    a: 'En esta versión los datos viven en la memoria de la aplicación, por lo que al recargar la página se restablece el inventario inicial.',
  },
]

export default function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState(null)

  return (
    <section>
      <h2 className="titulo">Preguntas frecuentes</h2>
      <p className="parrafo">Resolvemos las dudas más comunes sobre el uso del sistema.</p>

      <div className="faq">
        {preguntas.map((p, i) => {
          const estaAbierta = abierta === i
          return (
            <div key={p.q} className={estaAbierta ? 'faq-item abierta' : 'faq-item'}>
              <button
                className="faq-pregunta"
                onClick={() => setAbierta(estaAbierta ? null : i)}
                aria-expanded={estaAbierta}
              >
                <span>{p.q}</span>
                <span aria-hidden="true">{estaAbierta ? '−' : '+'}</span>
              </button>
              {estaAbierta && <p className="faq-respuesta">{p.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
