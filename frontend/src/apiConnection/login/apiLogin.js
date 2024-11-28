import { apiClient } from '../client/apiClient';

export const login = async ({ email, password }) => {
    try {
        const data = await apiClient.fetchUsers();
        const user = data.users.find(user => user.email === email && user.password === password);

        if (!user) {
            throw new Error('Invalid credentials');
        }
        // Retorna un objeto similar al que la API devolvería
        return {userId: user.id };
    } catch (error) {
        throw new Error(error.message || 'Error logging in');
    }
};

// import { post } from './apiClient';  // Importamos la función post desde apiClient.js

// export async function login(data) {
//   try {
//     const response = await post('/login', data);  // Enviamos una solicitud POST al backend en /login
//     return response;  // Devolvemos la respuesta del backend (email, rol, etc.)
//   } catch (error) {
//     console.error(error);
//     throw error;  // Lanzamos el error para que el frontend pueda manejarlo
//   }
// }
