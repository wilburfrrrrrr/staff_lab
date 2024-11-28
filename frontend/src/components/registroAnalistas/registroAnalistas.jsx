import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createAnalyst } from '../../apiConnection/apiAnalyst/apiAnalyst';

export default function RegistroAnalistas() {
	const [name, setName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await createAnalyst({ name, password });
			navigate("/analistas");
		} catch (error) {
			setError(error);
		}
	}

	return (
		<div>
			<h1>Registro de Analistas</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Nombre:</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="password">Contraseña:</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Registrar</button>
			</form>
			{error && <p>{error}</p>}
			<Link to="/analistas">Volver</Link>
		</div>
	);
}