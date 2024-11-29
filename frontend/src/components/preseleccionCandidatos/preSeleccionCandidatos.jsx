import React from 'react';
import { useEffect , useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHouse, faSquareCaretLeft,faAddressCard } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { getApplicants, preselectApplicant,deleteApplicant } from '../../apiConnection/apiCandidatos/apiCandidatos';
import { useNavigate} from 'react-router-dom';
import '../../styleSheets/preSeleccion.css';

export default function Preseleccion() {
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedCandidate(null);
    };

    function handleDownload(cvLink) {
        const link = document.createElement('a');
        link.href = {cvLink}
        link.download = "CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    async function handlePreselect(id) {
        try {
            await preselectApplicant(id);
            alert('Candidato preseleccionado correctamente');
            handleModalClose();
            window.location.reload();
        } catch (error) {
            alert('Error al preseleccionar el candidato:', error);
        }
    }
    async function handleDelete(id) {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este candidato?');
        if (!confirmDelete) return;
        try {
            await deleteApplicant(id);
            alert('Candidato eliminado correctamente');
            // Actualiza la lista de candidatos eliminando el eliminado
            const updatedApplicants = applicants.filter((applicant) => applicant.id !== id);
            setApplicants(updatedApplicants);
            handleModalClose();
        } catch (error) {
            alert('Error al eliminar el candidato:', error);
        }
    }
    // Efecto para obtener los datos al cargar el componente
    useEffect(() => {
        async function fetchApplicants() {
            try {
            const data = await getApplicants(); // Llama a la API
            setApplicants(data); // Almacena los nombres en el estado
            } catch (err) {
            setError(err);
            }
        }
        fetchApplicants();
    }, []);

    if (error) {
        console.log(error)
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
                            <Link to="/home" className="text-white text-decoration-none"></Link>
                        </button>

                        <button className="btn btnCS mx-2 "  onClick={handleCerraSesion}>
                            Cerrar Sesión
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
                    <h2 className="titulo-candidatos">Lista de Candidatos</h2>
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
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Información del Candidato</h3>
                        <ul className="list-unstyled">
                            <li><strong>Nombre:</strong> {selectedCandidate.name} {selectedCandidate.second_name}</li>
                            <li><strong>Apellidos:</strong> {selectedCandidate.last_name} {selectedCandidate.second_last_name}</li>
                            <li><strong>Correo:</strong> {selectedCandidate.email}</li>
                            <li><strong>Teléfono:</strong> {selectedCandidate.phone}</li>
                            <li><strong>Género:</strong> {selectedCandidate.genre}</li>
                            {/* <button className="btn btn-secondary" onClick={() => handleDownload(selectedCandidate.cv)}>Descargar CV</button> */}
                            <a href={selectedCandidate.cv} download="CV.pdf">Ver/Descargar CV</a> 
                            {/* Añade más campos según sea necesario */}
                        </ul>
                        <div className="btnsModal ">
                            <button className="btn btnPreseleccionar mt-3" onClick={() => handlePreselect(selectedCandidate.id)}>Pre seleccionar</button> 
                            <button className="btn btnEliminar  btn-danger mt-3" onClick={() => handleDelete(selectedCandidate.id)}>Eliminar</button> 
                        </div>
                        <button className="btn btnCerrar  mt-3" onClick={handleModalClose}>Cerrar</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}