import { apiClient } from '../client/apiClient';

export async function login(data) {
        try {
            // console.log(`data: ${data}`);
            const response = await apiClient('login', {
                method: 'POST',
                body: data
            });  
            // console.log(response)
            return response; 
        } catch (error) {
            console.error(error);
            throw error;  
        }
}
