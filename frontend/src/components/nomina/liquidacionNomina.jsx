import { payEmployee, getEmployees } from "../../apiConnection/apiEmployees/apiEmployee";
// import { NavBar } from "../navBar/navBar";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHouse, faAddressCard} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

export default function LiquidacionNomina() {
	const [employees, setEmployees] = React.useState([]);
	const [employee, setEmployee] = React.useState("");
	const [salary, setSalary] = React.useState("");
	const [error, setError] = React.useState(null);
	const navigate = useNavigate();
    const handleHome = () => {
        navigate('/home');
    };

    const handleCerraSesion= () => {
		localStorage.removeItem('token');
        navigate('/');
    };  

	async function handlePayment(e) {
		try {
			await payEmployee( employee.id );
			alert("Pago Realizado");
			navigate("/nomina");
		} catch (error) {
			setError(error);
		}
	}

    useEffect(() => {
        async function fetchEmployees() {
            try {
            const data = await getEmployees(); // Llama a la API
            setEmployees(data); // Almacena los nombres en el estado
            } catch (err) {
            setError(err);
            }
        }
        fetchEmployees();
    }, []);

    if (error) {
        console.log(error)
    }

	return (
		<div className="ContainerHome" >
        <header className="header">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Título */}
                <div>
                    <h1 className="title">Staff Lab</h1>
                    <Link to="/home" className="text-white text-decoration-none"></Link>
                </div>
                {/* Botones */}
                <div className="botones">
                        <button className="btn btnHome mx-2" onClick={handleHome}>
                            <FontAwesomeIcon icon={faHouse}  style={{color: "#eba637", fontSize: "30px"}} />
                            <Link to="/home" className="text-white text-decoration-none"></Link>
                        </button>

                        <button className="btn btnCS mx-2 "  onClick={handleCerraSesion}>
                            Cerrar Sesión
                        </button>

                        <button className="btn btnUser mx-2">
                            <FontAwesomeIcon  icon={faCircleUser} style={{color: "#eba637", fontSize: "30px"}}  />
                        </button>
                </div>
            </div>
        </header>
			<div className="containerListado">
            
            {employees.length > 0 ? (
                <ul className="list-unstyled d-flex flex-column align-items-center">
                    <h2 className="titulo-candidatos">Liquidaciones de Nomina</h2>
                    {employees.map((employee) => (
                        <li key={employee.id} className="candidate-box p-3 mb-3 d-flex justify-content-between align-items-center">
                            <div className="nombre">
                                <FontAwesomeIcon icon={faAddressCard}  style={{fontSize: "30px"}}/>
                                <span>{employee.applicant.name} {employee.applicant.second_name} {employee.applicant.last_name} {employee.applicant.second_last_name}</span>
                            </div>
                            <button className="btn btnMI" onClick={() => handlePayment(employee)}>Realizar Liquidacion</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">Cargando Empleados...</p>
            )}
			
			</div>
			{error && <p>{error}</p>}
		</div>
	);
}