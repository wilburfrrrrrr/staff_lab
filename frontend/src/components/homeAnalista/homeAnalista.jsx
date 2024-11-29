import React from 'react';
import { useEffect , useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHouse} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { } from '../../apiConnection/apiCandidatos/apiCandidatos';
import { useNavigate} from 'react-router-dom';
import '../../styleSheets/home.css';

export default function HomeAnalistas() {

    const navigate = useNavigate();

    const handleCandidatos = () => {
        navigate('/preSeleccion');
    };

    const handleNavigatePreseleccionados = () => {
        navigate('/seleccion');
    };
    const handleNavigateLiquidacionNomina = () => {
        navigate('/nomina/liquidaciones/');
    };
    const handleNavigateNomina = () => {
        navigate('/nomina/');
    };


    return (
        <div className="ContainerHome">
            <header className="header">
                <div className="container d-flex justify-content-between align-items-center">
                    {/* Título */}
                    <div>
                        <h1 className="title">Staff Lab</h1>
                    </div>
                    {/* Botones */}
                    <div className="botones">
                            <button className="btn btnCS mx-2 ">
                                <Link to="/" className="text-white text-decoration-none">Cerrar Sesión </Link>
                            </button>

                            <button className="btn btnUser mx-2">
                                <FontAwesomeIcon  icon={faCircleUser} style={{color: "#eba637", fontSize: "30px"}}  />
                            </button>
                    </div>
                </div>
            </header>
            <div className="OpcionesAnalista d-flex flex-column align-items-center">
                <button className="btn btnPrese mt-3" onClick={handleCandidatos} >Candidatos</button> 
                <button className="btn btnPrese2  mt-3" onClick={handleNavigatePreseleccionados}>Preseleccionados</button>
                <button className="btn btnPrese2  mt-3" onClick={handleNavigateLiquidacionNomina}>Liquicacion de Nomina</button> 
                <button className="btn btnPrese2  mt-3" onClick={handleNavigateNomina}>Listado de Nomina</button>  
            </div>
    </div>

    
    );

}

