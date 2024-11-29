import { apiClient } from '../client/apiClient';

export async function login(data) {
        try {
            const response = await apiClient('/login','POST', data);  
            return response; 
        } catch (error) {
            console.error(error);
            throw error;  
        }
}
