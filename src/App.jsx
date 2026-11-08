import { Routes, Route } from 'react-router'
import Header from './components/Header.jsx'
import TopMenu from './components/TopMenu.jsx'
import BottomNav from './components/BottomNav.jsx'
import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx'
import AgregarArticulo from './pages/AgregarArticulo.jsx'
import ListaArticulos from './pages/ListaArticulos.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import Carrito from './pages/Carrito.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="app">
      <Header />
      <TopMenu />
      <main className="contenido container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/agregar-articulo" element={<AgregarArticulo />} />
          <Route path="/articulos" element={<ListaArticulos />} />
          <Route path="/articulos/:id" element={<DetalleArticulo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
