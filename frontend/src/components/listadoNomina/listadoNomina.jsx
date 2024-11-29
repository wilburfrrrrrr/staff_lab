import { getEmployees, getEmployee } from "../../apiConnection/apiEmployees/apiEmployee";
// import { NavBar } from "../navBar/navBar";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHouse, faSquareCaretLeft,faAddressCard} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ListadoNomina() {
	const [employees, setEmployees] = React.useState([]);
	const [selectedEmployee, setEmployee] = React.useState(null);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	
	async function handleOpenModal(employee) {
		setEmployee(employee);
		console.log("seleccionado",selectedEmployee)
		setIsModalOpen(true);
	}

	async function handleCloseModal() {
		setEmployee(null);
		setIsModalOpen(false);
	}

	React.useEffect(() => {
		getEmployees().then((employees) => setEmployees(employees));
	}, []);


	return (
		<div className="container" id="contenedorGeneral">
			<header className="header">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Título */}
                <div>
                    <h1 className="title">Staff Lab</h1>
                </div>
                {/* Botones */}
                <div className="botones">
                        <button className="btn btnHome mx-2">
                            <FontAwesomeIcon icon={faHouse}  style={{color: "#eba637", fontSize: "30px"}} />
                            <Link to="/" className="text-white text-decoration-none"></Link>
                        </button>

                        <button className="btn btnCS mx-2 ">
                            <Link to="/login" className="text-white text-decoration-none">Cerrar Sesión </Link>
                        </button>

                        <button className="btn btnUser mx-2">
                            <FontAwesomeIcon  icon={faCircleUser} style={{color: "#eba637", fontSize: "30px"}}  />
                            <Link to="/" className="text-white text-decoration-none"></Link>
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
                            <button className="btn btnMI" onClick={() => handleOpenModal(employee)}>Más información</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">Cargando Empleados...</p>
            )}
			{isModalOpen && selectedEmployee && (
				<div className="modal">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Información de Nomina</h5>
						{/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>Cerrar</button> */}
					</div>
					<div className="modal-body">
						{/* <p>Cédula: {employee.id}</p> */}
						<p>Nombre: {selectedEmployee.applicant.name}</p>
						<p>Segundo Nombre: {selectedEmployee.applicant.secondName}</p>
						<p>Apellido: {selectedEmployee.applicant.lastName}</p>
						<p>Segundo Apellido: {selectedEmployee.applicant.secondLastName}</p>
						<p>Teléfono: {selectedEmployee.applicant.phoneNumber}</p>
						<p>Correo: {selectedEmployee.applicant.email}</p>
						<p>Sueldo Base: {selectedEmployee.sueldo_base}</p>
						<p>Horas Extra: {selectedEmployee.extra_hours}</p>
						<p>Bonificacion: {selectedEmployee.bonificacion}</p>
						<p>Auxilio Rodamiento: {selectedEmployee.auxilio_rodamiento}</p>
						<p>Ultimo Pago: {selectedEmployee.last_payment}</p>
						<p>Fecha Contratado: {selectedEmployee.date_hired}</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
					</div>
					</div>
				</div>
				</div>
			)}
			</div>
			{error && <p>{error}</p>}
			<Link to="/nomina">Volver</Link>
		</div>
	);
}