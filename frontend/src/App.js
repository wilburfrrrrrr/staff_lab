import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import {useEffect, useState} from 'react'
import UserBox from './components/userBox'
import CreateUser from './components/createUser'
import RegistroAnalistas from './components/registroAnalistas/registroAnalistas'
import LiquidacionNomina from './components/nomina/liquidacionNomina'
import RegistroPerfiles from './components/registroPerfiles/registroPerfiles'
import ListadoNomina from './components/listadoNomina/listadoNomina'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/users/" component={UserBox} />
          <Route path="/createUser/" component={CreateUser} />
          <Route path="/analistas/crear/" element={<RegistroAnalistas />} />
          <Route path="/nomina/liquidaciones/" element={<LiquidacionNomina />} />
          <Route path="/perfiles/crear/" element={<RegistroPerfiles />} />
          <Route path="/nomina/" element={<ListadoNomina />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )

}

export default App;
