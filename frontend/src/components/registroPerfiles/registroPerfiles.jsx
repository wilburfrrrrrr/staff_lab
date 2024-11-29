import { createApplicant } from "../../apiConnection/apiApplicant/apiApplicant";
// import { NavBar } from "../navBar/navBar";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RegistroPerfiles() {
	const [formData, setFormData] = React.useState({
		userId: "",
		name: "",
		secondName: "",
		lastName: "",
		secondLastName: "",
		phoneNumber: "",
		email: "",
		genre: "",
		state: "",
		cv: null,
	});
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	console.log('szs');

	async function handleSubmit(e) {
		const dataToSend = new FormData();
		dataToSend.append("name", formData.name);
		dataToSend.append("second_name", formData.secondName);
		dataToSend.append("last_name", formData.lastName);
		dataToSend.append("second_last_name", formData.secondLastName);
		dataToSend.append("phone_number", formData.phoneNumber);
		dataToSend.append("email", formData.email);
		dataToSend.append("genre", formData.genre);
		dataToSend.append("state", formData.state);
		if (formData.cv){
			dataToSend.append("cv", formData.cv);
		}
		e.preventDefault();
		
		try {
			await createApplicant(dataToSend);
			navigate("/perfiles");
		} catch (error) {
			setError(error);
		}
	}

	async function handleChange(e) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	async function handleFileChange(e) {
		const { name, files } = e.target;
		setFormData({ ...formData, [name]: files[0] });
	}

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			{/* <NavBar /> */}
			<h1>Registro de Perfiles</h1>
			<form className="mb-3" onSubmit={handleSubmit}>
				<label className="form-label" htmlFor="userId">Cédula:</label>
				<input
					id="userId"
					className="form-control"
					type="text"
					value={formData.userId}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="name">Nombre:</label>
				<input
					id="name"
					className="form-control"
					type="text"
					value={formData.name}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="secondName">Segundo Nombre:</label>
				<input
					id="secondName"
					className="form-control"
					type="text"
					value={formData.secondName}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="lastName">Apellido:</label>
				<input
					id="lastName"
					className="form-control"
					type="text"
					value={formData.lastName}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="secondLastName">Segundo Apellido:</label>
				<input
					id="secondLastName"
					className="form-control"
					type="text"
					value={formData.secondLastName}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="phoneNumber">Teléfono:</label>
				<input
					id="phoneNumber"
					className="form-control"
					type="text"
					value={formData.phoneNumber}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="email">Correo:</label>
				<input
					id="email"
					className="form-control"
					type="text"
					value={formData.email}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="genre">Género:</label>
				<input
					id="genre"
					className="form-control"
					type="text"
					value={formData.genre}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="state">Estado:</label>
				<input
					id="state"
					className="form-control"
					type="text"
					value={formData.state}
					onChange={handleChange}
				/>
				<label className="form-label" htmlFor="cv">Curriculum:</label>
				<input
					id="cv"
					name="cv"
					className="form-control"
					type="file"
					accept="application/pdf"
					value={formData.cv}
					onChange={handleFileChange}
				/>	
				<button type="submit" className="btn">Registrar</button>
			</form>
		</div>
	);

}