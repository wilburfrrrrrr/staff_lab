import { getEmployees, getEmployee } from "../../apiConnection/apiEmployees/apiEmployee";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHouse, faSquareCaretLeft,faAddressCard} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

export default function ListadoNomina() {
	const [employees, setEmployees] = React.useState([]);
	const [selectedEmployee, setEmployee] = React.useState(null);
    const [showModal, setShowModal] = useState(false);
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

    const handleHome = () => {
        navigate('/home');
    };

    const handleCerraSesion= () => {
        navigate('/');
    };  
	
    const handleModalOpen = (employee) => {
        setEmployee(employee);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEmployee(null);
    };

    useEffect(() => {
        async function fetchEmployees() {
            try {
            const data = await getEmployees(); // Llama a la API
            setEmployees(data); // Almacena los nombres en el estado
            } catch (err) {
            setError(err);
            }
        }
        fetchEmployees();
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
			<div className="containerListado">
            {employees.length > 0 ? (
                <ul className="list-unstyled d-flex flex-column align-items-center">
                    <h2 className="titulo-candidatos">Lista de Nominas</h2>
                    {employees.map((employee) => (
                        <li key={employee.id} className="candidate-box p-3 mb-3 d-flex justify-content-between align-items-center">
                            <div className="nombre">
                                <FontAwesomeIcon icon={faAddressCard}  style={{fontSize: "30px"}}/>
                                <span>{employee.applicant.name} {employee.applicant.second_name} {employee.applicant.last_name} {employee.applicant.second_last_name}</span>
                            </div>
                            <button className="btn btnMI" onClick={() => handleModalOpen(employee)}>Más información</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">Cargando Empleados...</p>
            )}
           {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Información del Candidato</h3>
                        <ul className="list-unstyled">
							<li><strong>Nombre:</strong> {selectedEmployee.applicant.name} {selectedEmployee.applicant.second_name}</li>
							<li><strong>Apellidos:</strong> {selectedEmployee.applicant.last_name} {selectedEmployee.applicant.second_last_name}</li>
							<li><strong>Sueldo Base:</strong> {selectedEmployee.sueldo_base}</li>
							<li><strong>Horas Extra:</strong> {selectedEmployee.extra_hours}</li>
							<li><strong>Bonificacion:</strong> {selectedEmployee.bonificacion}</li>	
							<li><strong>Auxilio Rodamiento:</strong> {selectedEmployee.auxilio_rodamiento}</li>
							<li><strong>Ultimo Pago:</strong> {selectedEmployee.last_payment}</li>
							<li><strong>Fecha Contratado:</strong> {selectedEmployee.date_hired}</li>
                        </ul>
                        <button className="btn btnCerrar  mt-3" onClick={handleModalClose}>Cerrar</button>
                    </div>
                </div>
            )}
			</div>
			{error && <p>{error}</p>}
			<Link to="/nomina">Volver</Link>
		</div>
	);
}