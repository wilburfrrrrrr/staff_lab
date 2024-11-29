import { protectedApi } from "../protected/apiProtectedClient";

export async function crearEmpleado(data, id) {
    try {
        const response = await protectedApi(`employee/${id}`,{ method: 'POST', body: data });  
        return response; 
    } catch (error) {
        console.error(error);
        throw error;  
    }
}

