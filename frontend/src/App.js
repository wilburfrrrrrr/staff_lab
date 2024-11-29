import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Preseleccion from './components/preseleccionCandidatos/preSeleccionCandidatos';
import CandidatosSeleccionados from './components/candidatosSeleccionados/candidatosSeleccionados'
import HomeAnalistas from './components/homeAnalista/homeAnalista';// import {useEffect, useState} from 'react'
import RegistroAnalistas from './components/registroAnalistas/registroAnalistas'
import LiquidacionNomina from './components/nomina/liquidacionNomina'
import RegistroPerfiles from './components/registroPerfiles/registroPerfiles'
import ListadoNomina from './components/listadoNomina/listadoNomina'
import { AuthProvider } from './components/auth/authContext';
import RutaAnalistaPrivada from './components/privado/rutaAnalistaPrivada';
import RootPrivada from './components/privado/rutaRootPrivada';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<RutaAnalistaPrivada><HomeAnalistas /></RutaAnalistaPrivada>} /> 
            <Route path="/seleccion" element={<RutaAnalistaPrivada><CandidatosSeleccionados /></RutaAnalistaPrivada>} />
            <Route path="/analistas/crear/" element={<RootPrivada><RegistroAnalistas /></RootPrivada>} /> 
            <Route path="/nomina/liquidaciones/" element={<RutaAnalistaPrivada><LiquidacionNomina /></RutaAnalistaPrivada>} />
            <Route path="/perfiles/crear/" element={<RutaAnalistaPrivada><RegistroPerfiles /></RutaAnalistaPrivada>} />
            <Route path="/nomina/" element={<RutaAnalistaPrivada><ListadoNomina /></RutaAnalistaPrivada>} />
            <Route path="/preSeleccion" element={<RutaAnalistaPrivada><Preseleccion/></RutaAnalistaPrivada>} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )

}

export default App;
