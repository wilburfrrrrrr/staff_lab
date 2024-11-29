import React from 'react';
import { useEffect , useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHouse, faSquareCaretLeft,faAddressCard} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { } from '../../apiConnection/apiCandidatos/apiCandidatos';
import { useNavigate} from 'react-router-dom';
import { getApplicantsByState, deleteApplicant} from '../../apiConnection/apiCandidatos/apiCandidatos';
import {crearEmpleado, createEmployee} from '../../apiConnection/apiEmpleados/apiEmpleados'
import '../../styleSheets/seleccion.css';


export default function CandidatosSeleccionados() {
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [checkboxes, setCheckboxes] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
    });
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/home');
    };
    const handleCerraSesion= () => {
        navigate('/');
    };   
    const handleModalOpen = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };
    async function handleContratar() {
        const employeeData = {
            applicant_id: selectedCandidate.id, 
            bonificacion: 200,
            auxilio_rodamiento: 100,
            date_hired: "2024-11-01",
            extra_hours: 10,
            last_payment: "2024-11-15",
            sueldo_base: 1500,
        };
    
        try {
            console.log(employeeData)
            const response = await crearEmpleado(employeeData, selectedCandidate.id);
            alert("Empleado creado exitosamente.");
            handleModalClose(); // Cerramos el modal
        } catch (error) {
            console.error("Error en createEmployee:", error.response || error.message || error || error.detail);
            alert("Hubo un error al intentar crear al empleado.");
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedCandidate(null);
    };
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes((prev) => ({ ...prev, [name]: checked }));
    };

    async function handleDelete() {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este candidato?');
        if (!confirmDelete) return;
        try {
            await deleteApplicant(selectedCandidate.id);
            alert('Candidato eliminado correctamente');
            // Actualiza la lista de candidatos eliminando el eliminado
            const updatedApplicants = applicants.filter((applicant) => applicant.id !== selectedCandidate.id);
            setApplicants(updatedApplicants);
            handleModalClose();
        } catch (error) {
            alert('Error al eliminar el candidato:', error);
        }
    }
    const allChecked = Object.values(checkboxes).every((value) => value === true);
    // Efecto para obtener los datos al cargar el componente
    useEffect(() => {
        async function fetchApplicants() {
            try {
                const data = await getApplicantsByState(2); // Pasamos '2' para obtener solo los con estado 2
                
                setApplicants(data); // Almacena los candidatos con estado 2
            } catch (err) {
                setError(err);
            }
        }
        fetchApplicants();
        }, []);
    
    if (error) {
        return <div>Error: {error}</div>;
    }

	return (
    <div className="ContainerCandidatos">
        <header className="header">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Título */}
                <div>
                    <h1 className="title">Staff Lab</h1>
                    <Link to="/home" className="text-white text-decoration-none"></Link>
                </div>
                {/* Botones */}
                <div className="botones">
                        <button className="btn btnHome mx-2" onClick={handleHome}>
                            <FontAwesomeIcon icon={faHouse}  style={{color: "#eba637", fontSize: "30px"}} />
                        </button>

                        <button className="btn btnCS mx-2 " onClick={handleCerraSesion}>Cerrar Sesion
                        </button>

                        <button className="btn btnUser mx-2">
                            <FontAwesomeIcon  icon={faCircleUser} style={{color: "#eba637", fontSize: "30px"}}  />
                        </button>
                </div>
            </div>
        </header>
        <div className="nav">
            <button className="btn icon-button">
                <FontAwesomeIcon className="ParairAtras" icon={faSquareCaretLeft} style={{fontSize: "50px"}} />
                <Link to="/" className="text-white text-decoration-none"></Link>
            </button>
            <p className="titulo-home">Home</p>
        </div>
        <div className="containerListado">
            
            {applicants.length > 0 ? (
                <ul className="list-unstyled d-flex flex-column align-items-center">
                    <h2 className="titulo-candidatos">Lista de Preseleccionados </h2>
                    {applicants.map((applicant) => (
                        <li key={applicant.id} className="candidate-box p-3 mb-3 d-flex justify-content-between align-items-center">
                            <div className="nombre">
                                <FontAwesomeIcon icon={faAddressCard}  style={{fontSize: "30px"}}/>
                                <span>{applicant.name} {applicant.second_name} {applicant.last_name} {applicant.second_last_name}</span>
                            </div>
                            <button className="btn btnMI" onClick={() => handleModalOpen(applicant)}>Más información</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">Cargando candidatos...</p>
            )}
            {/* Modal */}
            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {/* Sección de Información Personal */}
                        <div className="section personal-info">
                            <h3>Información del Candidato</h3>
                            <ul className="list-unstyled">
                                <li><strong>Nombre:</strong> {selectedCandidate.name} {selectedCandidate.second_name}</li>
                                <li><strong>Apellidos:</strong> {selectedCandidate.last_name} {selectedCandidate.second_last_name}</li>
                                <li><strong>Correo:</strong> {selectedCandidate.email}</li>
                                <li><strong>Teléfono:</strong> {selectedCandidate.phone}</li>
                            </ul>
                        </div>

                        {/* Sección de Checkboxes */}
                        <div className="section checklist mt-3">
                            <h4>Verificaciones</h4>
                            <ul className="list-unstyled">
                                <li>
                                    <input 
                                        type="checkbox" 
                                        name="item1" 
                                        checked={checkboxes.item1} 
                                        onChange={handleCheckboxChange} 
                                    />
                                    Entrevista
                                </li>
                                <li>
                                    <input 
                                        type="checkbox" 
                                        name="item2" 
                                        checked={checkboxes.item2} 
                                        onChange={handleCheckboxChange} 
                                    />
                                    Anexo resultados psicotecnicos
                                </li>
                                <li>
                                    <input 
                                        type="checkbox" 
                                        name="item3" 
                                        checked={checkboxes.item3} 
                                        onChange={handleCheckboxChange} 
                                    />
                                    Verificar referencia laborales
                                </li>
                                <li>
                                    <input 
                                        type="checkbox" 
                                        name="item4" 
                                        checked={checkboxes.item4} 
                                        onChange={handleCheckboxChange} 
                                    />
                                    Verificación consulta de antecedentes judiciales y de la procuraduría.
                                </li>
                            </ul>
                        </div>

                        {/* Sección de Botones */}
                        <div className="section actions mt-3 d-flex justify-content-between">
                            <button className="btn btn-danger" onClick={handleModalClose}>Cerrar</button>
                            <button className="btn btn-danger" onClick={() => handleDelete()}>Eliminar</button>
                            {allChecked && (
                                <button 
                                className="btn btn-success" 
                                onClick={(e) => { 
                                    e.preventDefault(); // Prevenir comportamiento no deseado
                                    handleContratar(); 
                                }}
                                >
                                    Contratar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );


}