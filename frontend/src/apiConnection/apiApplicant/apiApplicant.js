// import { apiClient } from "../client/apiClient";
import { protectedApi } from "../protected/apiProtectedClient";
import { apiClientMultimedia } from "../apiMultimedia/apiMultimedia";
// import { jwtDecode } from "jwt-decode";

export async function createApplicant( dataToSend ) {
		return await apiClientMultimedia("applicants", 'POST', {
			body: dataToSend,
  		});
}

export async function getApplicant({ id }) {
	  	return await protectedApi(`applicants/${id}`, 'GET');
}

export async function getApplicants() {
	return await protectedApi("applicants", 'GET');
}

export async function preselectApplicant({ id }) {
	return await protectedApi(`applicants/preselect/${id}`, 'PUT', {
		body: { id },
	});
}

export async function deleteApplicant({ id }) {
	return await protectedApi(`applicants/delete/${id}`, {
		method: 'DELETE',
		body: { id },
	});
}