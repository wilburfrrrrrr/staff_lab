import React from "react";
//import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

export default function  RootPrivada   ({ children }) {
	const token = localStorage.getItem('token');
	const tokenDecoded = jwtDecode(token);
	const rol = tokenDecoded.rol;
	
	return rol === 2 ? children : <Navigate to="/Login" replace />;
}

