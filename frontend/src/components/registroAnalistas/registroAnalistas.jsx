import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createAnalyst } from '../../apiConnection/apiAnalyst/apiAnalyst';
// import { NavBar } from "../navBar/navBar";

export default function RegistroAnalistas() {
	const [userId, setUserId] = React.useState("");
	const [name, setName] = React.useState("");
	const [secondName, setSecondName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await createAnalyst({ userId, name, secondName, lastName, phoneNumber });		
			navigate("/analistas");
		} catch (error) {
			setError(error);
		}
	}

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			{/* <NavBar /> */}
			<h1>Registro de Analistas</h1>
			<form className="mb-3" onSubmit={handleSubmit}>
				<label className="form-label" htmlFor="userId">Cédula:</label>
				<input
					id="userId"
					type="text"
					className="form-control"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
				<label className="form-label" htmlFor="name">Nombre:</label>
				<input
					id="name"
					type="text"
					className="form-control"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label className="form-label" htmlFor="secondName">Segundo Nombre:</label>
				<input
					id="secondName"
					type="text"
					className="form-control"
					value={secondName}
					onChange={(e) => setSecondName(e.target.value)}
				/>
				<label className="form-label" htmlFor="lastName">Apellido:</label>
				<input
					id="lastName"
					type="text"
					className="form-control"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<label className="form-label" htmlFor="phoneNumber">Teléfono:</label>
				<input
					id="phoneNumber"
					type="text"
					className="form-control"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<button type="submit" className="btn">Registrar</button>
			</form>
			{error && <p>{error}</p>}
			<Link to="/analistas">Volver</Link>
		</div>
	);
}