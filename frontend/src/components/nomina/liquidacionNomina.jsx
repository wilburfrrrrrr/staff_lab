import { payEmployee, getEmployees } from "../../apiConnection/apiEmployees/apiEmployee";
// import { NavBar } from "../navBar/navBar";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LiquidacionNomina() {
	const [employees, setEmployees] = React.useState([]);
	const [employee, setEmployee] = React.useState("");
	const [salary, setSalary] = React.useState("");
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	async function handlePayment(e) {
		e.preventDefault();
		try {
			await payEmployee({ employee });
			// navigate("/nomina");
		} catch (error) {
			setError(error);
		}
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
				<button className="btn" onClick={() => handlePayment(employee)}>Realizar Liquidacion</button>
			</td>
		</tr>
	));

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			{/* <NavBar /> */}
			<h1>Liquidaciones</h1>
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
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>{table}</tbody>
			</table>
			{error && <p>{error}</p>}
		</div>
	);
}