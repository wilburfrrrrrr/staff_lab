import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

export default function RutaAnalistaPrivada ({ children }) {
	try{
		const token = localStorage.getItem('token');
		const tokenDecoded = jwtDecode(token);
		console.log(tokenDecoded);
		const rol = tokenDecoded.rol;
		console.log(`Rol del parcero ${rol}`)
		
		return rol === 1 ? children : <Navigate to="/Login" replace />;
	}catch{
		return <Navigate to="/Login" replace />;
	}
		
}
