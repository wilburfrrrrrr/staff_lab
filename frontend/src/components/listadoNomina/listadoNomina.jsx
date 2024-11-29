import { getEmployees, getEmployee } from "../../apiConnection/apiEmployees/apiEmployee";
import InformacionNomina from "../infoNomina/infoNomina";
// import { NavBar } from "../navBar/navBar";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ListadoNomina() {
	const [employees, setEmployees] = React.useState([]);
	const [employee, setEmployee] = React.useState(null);
	const [salary, setSalary] = React.useState("");
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	
	async function handleOpenModal(employee) {
		setEmployee(employee);
		setIsModalOpen(true);
	}

	async function handleCloseModal() {
		setEmployee(null);
		setIsModalOpen(false);
	}

	React.useEffect(() => {
		getEmployees().then((employees) => setEmployees(employees));
	}, []);

	// table to show all the employes
	const table = employees.map((employee) => (
		<tr key={employee.id}>
			<td>{employee.applicant_id}</td>
			<td>{employee.name}</td>
			<td>{employee.second_name}</td>
			<td>{employee.last_name}</td>
			<td>{employee.second_last_name}</td>
			<td>{employee.phone}</td>
			<td>{employee.email}</td>
			<td>
				<button className="btn" onClick={() => handleOpenModal(employee)}>Más Información</button>
			</td>
		</tr>
	));

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			{/* <NavBar /> */}
			<h1>Listado de Nomina</h1>
			<table>
				<thead>
					<tr>
						<th>Cédula</th>
						<th>Nombre</th>
						<th>Segundo Nombre</th>
						<th>Apellido</th>
						<th>Segundo Apellido</th>
						<th>Teléfono</th>
						<th>Correo</th>
						<th>Género</th>
						<th>Estado</th>
						<th>Salario</th>
						<th>

						</th>
					</tr>
				</thead>
				<tbody>{table}</tbody>
			</table>
			{isModalOpen && (
				<InformacionNomina onClose={handleCloseModal} employeeId={employee.id} />
			)}
			{error && <p>{error}</p>}
			<Link to="/nomina">Volver</Link>



			
		</div>
	);
}