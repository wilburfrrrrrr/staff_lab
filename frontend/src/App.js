import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Preseleccion from './components/preseleccionCandidatos/preSeleccionCandidatos';
import CandidatosSeleccionados from './components/candidatosSeleccionados/candidatosSeleccionados'
// import {useEffect, useState} from 'react'
import RegistroAnalistas from './components/registroAnalistas/registroAnalistas'
import LiquidacionNomina from './components/nomina/liquidacionNomina'
import RegistroPerfiles from './components/registroPerfiles/registroPerfiles'
import ListadoNomina from './components/listadoNomina/listadoNomina'
import { AuthProvider } from './components/auth/authContext';
import { RutaAnalistaPrivada, RutaRootPrivada } from './components/privado/rutaRootPrivada';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* <Route path="/home" element={<HomeAnalista />} /> */}
            <Route path="/analistas/crear/" element={<RegistroAnalistas />} />
            <Route path="/nomina/liquidaciones/" element={<LiquidacionNomina />} />
            <Route path="/perfiles/crear/" element={<RegistroPerfiles />} />
            <Route path="/nomina/" element={<ListadoNomina />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/preSeleccion" element={<Preseleccion/>} />
            {/* <Route path="/seleccion" element={<CandidatosSeleccionados/>} /> */}
            {/* <Route path="/user_info" element={<PrivateRoute><UserInfo /></PrivateRoute>} /> */}
            </Routes>
        </Router>
      </AuthProvider>
    </div>
  )

}

export default App;
