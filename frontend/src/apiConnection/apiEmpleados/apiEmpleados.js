import { protectedApi } from "../protected/apiProtectedClient";

export async function createEmployee(data, id) {
    try {
        const response = await protectedApi(`employee/${id}`,'POST', { body: data });  
        return response; 
    } catch (error) {
        console.error(error);
        throw error;  
    }
}