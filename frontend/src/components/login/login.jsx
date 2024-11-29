import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { login } from '../../apiConnection/login/apiLogin';
import { useNavigate } from 'react-router-dom';
import '../../styleSheets/login.css';

export default function Login() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
        
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await login({ email, password });
			localStorage.setItem('token', response.token);
			console.log(response);
			navigate('/home');
		}
		catch(error){
			setError(error);
			console.log(error);
		}
	}

	return (
        <div className="containerLogin d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="logo">STAFF LAB</h1>
                <p className="texto1">Bienvenido/a, inicia sesión para acceder a tu cuenta.</p>
                <form onSubmit={handleLogin} className="form">
                    <div className="form-group my-3 d-flex align-items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="form-control mt-2"
                            placeholder="Correo"
                            required
                        />
                    </div>
                    {/* Campo de Contraseña */}
                    <div className="form-group my-3 d-flex align-items-center">
                    <FontAwesomeIcon icon={faLock} className="icon" /> 
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control mt-2"
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    {/* Botón y Mensaje de Error */}
                    <div className="form-group my-3">
                        {error && <div style={{ color: 'red' }}>{error.message}</div>}
                        <button type="submit" className="btn btnSub form-submit">
                        Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
    </div>


    );
}