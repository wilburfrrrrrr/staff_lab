import { getEmployee } from "../../apiConnection/apiEmployees/apiEmployee";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function InformacionNomina({ onClose, employeeId }) {
	const [employee, setEmployee] = React.useState(null);
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	if(!employeeId) {
		navigate("/nomina");
	}

	React.useEffect(() => {
		getEmployee(employeeId).then((employee) => setEmployee(employee));
	}, []);

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div className="modal" tabindex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Información de Nomina</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>Cerrar</button>
				</div>
				<div className="modal-body">
					{/* <p>Cédula: {employee.id}</p> */}
					<p>Nombre: {employee.name}</p>
					<p>Segundo Nombre: {employee.secondName}</p>
					<p>Apellido: {employee.lastName}</p>
					<p>Segundo Apellido: {employee.secondLastName}</p>
					<p>Teléfono: {employee.phoneNumber}</p>
					<p>Correo: {employee.email}</p>
					<p>Sueldo Base: {employee.sueldo_base}</p>
					<p>Horas Extra: {employee.extra_hours}</p>
					<p>Bonificacion: {employee.bonificacion}</p>
					<p>Auxilio Rodamiento: {employee.auxilio_rodamiento}</p>
					<p>Ultimo Pago: {employee.last_payment}</p>
					<p>Fecha Contratado: {employee.date_hired}</p>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
				</div>
			</div>
			</div>
			
			<Link to="/nomina">Volver</Link>
		</div>
	);
}