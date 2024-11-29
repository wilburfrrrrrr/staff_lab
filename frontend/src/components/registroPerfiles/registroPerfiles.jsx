import { createApplicant } from "../../apiConnection/apiApplicant/apiApplicant";
// import { NavBar } from "../navBar/navBar";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHouse, faSquareCaretLeft,faAddressCard} from '@fortawesome/free-solid-svg-icons';
import '../../styleSheets/registroPerfiles.css';

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
		cv: null,
	});
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();


	async function handleSubmit(e) {

		const dataToSend = new FormData();
		dataToSend.append("name", formData.name);
		dataToSend.append("second_name", formData.secondName);
		dataToSend.append("last_name", formData.lastName);
		dataToSend.append("second_last_name", formData.secondLastName);
		dataToSend.append("phone", formData.phoneNumber);
		dataToSend.append("email", formData.email);
		dataToSend.append("genre", formData.genre);
		if (formData.cv){
			dataToSend.append("cv", formData.cv);
		}

		e.preventDefault();
		
		try {
			console.log(`dato: ${dataToSend.get("genre")}`);
			await createApplicant(dataToSend);
			alert("Te registraste correctamente");
			// navigate("/perfiles");
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
		<div className="ContainerHome">
			<header className="header">
					<div className="container d-flex justify-content-between align-items-center">
						{/* Título */}
							<h1 className="title">Bienvenido a     Staff Lab</h1>
							
					</div>
			</header>
			{/* <NavBar /> */}
			<div className="containerListado">
			<h1 className="title3">Registro Candidato</h1>
			<p className="texto1">Bienvenido/a, ingresa tus datos para aplicar como candidato.</p>
				<form className="mb-3" onSubmit={handleSubmit}>
					<div className="form-group my-3 d-flex align-items-center ">
						<input
							id="userId"
							name="userId"
							className="form-control"
							type="text"
							value={formData.userId}
							onChange={handleChange}
							placeholder="Cedula"
						/>
					</div>
					<div className="form-group my-3 d-flex align-items-center ">
						<input
							id="name"
							className="form-control"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleChange}
							placeholder="Nombre"
						/>
					</div>
					<div className="form-group my-3 d-flex align-items-center ">
						<input
							id="secondName"
							className="form-control"
							name="secondName"
							type="text"
							value={formData.secondName}
							onChange={handleChange}
							placeholder="Segundo Nombre"
						/>
					</div>
					<div className="form-group my-3 d-flex align-items-center ">
						<input
							id="lastName"
							className="form-control"
							name="lastName"
							type="text"
							value={formData.lastName}
							onChange={handleChange}
							placeholder="Apellido"
						/>
					</div>
					<div className="form-group my-3 d-flex align-items-center ">
						<input
							id="secondLastName"
							className="form-control"
							name="secondLastName"
							type="text"
							value={formData.secondLastName}
							onChange={handleChange}
							placeholder="Segundo Apellido"
						/>
					</div>
					<div className="form-group my-3 d-flex align-items-center ">
						<input
							id="phoneNumber"
							className="form-control"
							name="phoneNumber"
							type="text"
							value={formData.phoneNumber}
							onChange={handleChange}
							placeholder="Teléfono"
						/>
					</div>
					<div className="form-group my-3 d-flex align-items-center ">
						<input
							id="email"
							className="form-control"
							name="email"
							type="text"
							value={formData.email}
							placeholder="Email"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group my-3 d-flex align-items-center ">
						<select
							name="genre"
							className="multiples-opciones"
							onChange={handleChange}
							required
							value={formData.genre}
							placeholder="Genero"
						>
							<option value="">Género</option>
							<option value="Masculino">Masculino</option>
							<option value="Femenino">Femenino</option>
							<option value="Otro">Otro</option>
						</select>
					</div>
					<div className="form-group my-3 d-flex align-items-center" >
						<label className="form-label formNombre" htmlFor="cv">Curriculum:   </label>
						<input
							id="cv"
							name="cv"
							className="form-control formArchivo"
							type="file"
							placeholder="Hoja de Vida"
							onChange={handleFileChange}
						/>	
					</div>
					<button type="submit" className="btn btnRegistrar">Registrar</button>
				</form>
			</div>
			
		</div>
	);

}