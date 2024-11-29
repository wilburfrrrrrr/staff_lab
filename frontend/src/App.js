import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Preseleccion from './components/preseleccionCandidatos/preSeleccionCandidatos';
import CandidatosSeleccionados from './components/candidatosSeleccionados/candidatosSeleccionados'
import HomeAnalistas from './components/homeAnalista/homeAnalista';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<HomeAnalistas />} />
          <Route path="/" element={<Login />} />
          <Route path="/preSeleccion" element={<Preseleccion/>} />
          <Route path="/seleccion" element={<CandidatosSeleccionados/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
