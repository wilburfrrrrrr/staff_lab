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
		<div className="container" id="contenedorGeneral">
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
				<div className="form-group my-3 d-flex align-items-center">					
					<input
						id="userId"
						type="text"
						className="form-control"
						placeholder="Cedula"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
					/>
				</div>
				<div className="form-group my-3 d-flex align-items-center">				
					<input
						id="name"
						type="text"
						placeholder="Nombre"
						className="form-control"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="form-group my-3 d-flex align-items-center">				
					<input
						id="secondName"
						type="text"
						className="form-control"
						placeholder="Segundo Nombre"
						value={secondName}
						onChange={(e) => setSecondName(e.target.value)}
					/>
				</div>
				<div className="form-group my-3 d-flex align-items-center">				
					<input
						id="lastName"
						type="text"
						className="form-control"
						placeholder="Apellido"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="form-group my-3 d-flex align-items-center">				
					<input
						id="secondLastName"
						type="text"
						placeholder="Segundo Apellido"
						className="form-control"
						value={secondLastName}
						onChange={(e) => setSecondLastName(e.target.value)}
					/>
				</div>
				<div className="form-group my-3 d-flex align-items-center">				
					<input
						id="phoneNumber"
						type="text"
						placeholder="Telefono"
						className="form-control"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div className="form-group my-3 d-flex align-items-center">				
					<input
						id="email"
						type="email"
						placeholder="Email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group my-3 d-flex align-items-center">				
					<input
						id="password"
						type="password"
						placeholder="Contraseña"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn">Registrar</button>
			</form>
			{error && <p>{error}</p>}
			<Link to="/analistas">Volver</Link>
		</div>
	);
}