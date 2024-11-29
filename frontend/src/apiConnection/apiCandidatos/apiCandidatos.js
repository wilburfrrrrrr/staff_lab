import { protectedApi } from "../protected/apiProtectedClient";

export async function getApplicants() {
    try {
        const applicants = await protectedApi("applicants", {
			method: 'GET'
		});
        return applicants;
    } catch (error) {
        console.error("Error fetching applicants:", error);
        throw error;
    }
}

export async function preselectApplicant(id) {
    try {
        const response = await protectedApi(`applicants/preselect/${id}`, {
			method: 'PUT'
		});
        return response;
    } catch (error) {
        console.error('Error preselecting applicant:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
}

export async function deleteApplicant(id) {
    try {
        const response = await protectedApi(`applicants/${id}`, {
			method: 'DELETE'
		});
        return response;
    } catch (error) {
        console.error('Error deleting applicant:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
}

export async function getApplicantsByState(state) {
    try {
        const response = await protectedApi(`applicants/state?state=${state}`, {
			method: 'GET'
		});
        return response;
    } catch (error) {
        console.error('Error fetching applicants by state:', error);
        throw error;
    }
}