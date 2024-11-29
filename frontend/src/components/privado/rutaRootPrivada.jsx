import React from "react";
//import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

export default function  RootPrivada   ({ children }) {
	try{
		const token = localStorage.getItem('token');
		const tokenDecoded = jwtDecode(token);
		console.log(tokenDecoded);
		const rol = tokenDecoded.rol;
		
		return rol === 2 ? children : <Navigate to="/login" replace />;
	}catch(error){
		console.log(error);
		return <Navigate to="/login" replace />;
	}
		
}

