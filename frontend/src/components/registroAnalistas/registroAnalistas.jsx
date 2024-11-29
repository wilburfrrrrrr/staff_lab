import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHouse, faSquareCaretLeft,faAddressCard} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { createAnalyst } from '../../apiConnection/apiAnalyst/apiAnalyst';
// import { NavBar } from "../navBar/navBar";

export default function RegistroAnalistas() {
	const [userId, setUserId] = React.useState("");
	const [name, setName] = React.useState("");
	const [secondName, setSecondName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [secondLastName, setSecondLastName] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await createAnalyst( name, secondName, lastName, phoneNumber, secondLastName, email, password );		
			navigate("/analistas");
		} catch (error) {
			setError(error);
		}
	}

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			{/* <NavBar /> */}
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
				<label className="form-label" htmlFor="secondLastName">Segundo Apellido:</label>
				<input
					id="secondLastName"
					type="text"
					className="form-control"
					value={secondLastName}
					onChange={(e) => setSecondLastName(e.target.value)}
				/>
				<label className="form-label" htmlFor="phoneNumber">Teléfono:</label>
				<input
					id="phoneNumber"
					type="text"
					className="form-control"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<label htmlFor="email" className="form-label"> Email</label>
				<input
					id="email"
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password" className="form-label"> Contraseña</label>
				<input
					id="password"
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="btn">Registrar</button>
			</form>
			{error && <p>{error}</p>}
			<Link to="/analistas">Volver</Link>
		</div>
	);
}