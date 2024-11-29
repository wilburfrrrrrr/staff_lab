import { createContext, useContext, useState } from "react";
import { jwtDecode } from 'jwt-decode';	
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const token = localStorage.getItem('token');
		const userData = token ? jwtDecode(token) : null;
		return userData;
	});

	const signIn = (user) => {
		setUser(user);
	}

	const signOut = () => {
		setUser(null);
		localStorage.removeItem('token');
	}

	return (
		<AuthContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
}