import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Preseleccion from './components/preseleccionCandidatos/preSeleccionCandidatos';
import CandidatosSeleccionados from './components/candidatosSeleccionados/candidatosSeleccionados'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import {useEffect, useState} from 'react'
import UserBox from './components/userBox'
import CreateUser from './components/createUser'
import RegistroAnalistas from './components/registroAnalistas/registroAnalistas'
import LiquidacionNomina from './components/nomina/liquidacionNomina'
import RegistroPerfiles from './components/registroPerfiles/registroPerfiles'
import ListadoNomina from './components/listadoNomina/listadoNomina'
import Login from './components/login/login'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<HomeAnalista />} />
          <Route path="/users/" component={UserBox} />
          <Route path="/createUser/" component={CreateUser} />
          <Route path="/analistas/crear/" element={<RegistroAnalistas />} />
          <Route path="/nomina/liquidaciones/" element={<LiquidacionNomina />} />
          <Route path="/perfiles/crear/" element={<RegistroPerfiles />} />
          <Route path="/nomina/" element={<ListadoNomina />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preSeleccion" element={<Preseleccion/>} />
          {/* <Route path="/seleccion" element={<CandidatosSeleccionados/>} /> */}
        </Routes>
      </Router>
    </div>
  )

}

export default App;
