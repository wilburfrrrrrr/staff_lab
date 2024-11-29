// import { apiClient } from "../client/apiClient";
import { protectedApi } from "../protected/apiProtectedClient";
import { apiClientMultimedia } from "../apiMultimedia/apiMultimedia";
// import { jwtDecode } from "jwt-decode";

export async function createApplicant( dataToSend ) {
		console.log("Datos a mandar", dataToSend.get("genre"));
		return await apiClientMultimedia("applicants", {
			method: 'POST',
			body: dataToSend,
  		});
}

export async function getApplicant({ id }) {
	  	return await protectedApi(`applicants/${id}`, {
			method: 'GET'
		});
}

export async function getApplicants() {
	return await protectedApi("applicants", {
		method: 'GET'
	});
}

export async function preselectApplicant({ id }) {
	return await protectedApi(`applicants/preselect/${id}`, {
		method: 'PUT',
		body: { id },
	});
}

export async function deleteApplicant({ id }) {
	return await protectedApi(`applicants/delete/${id}`, {
		method: 'DELETE',
		body: { id },
	});
}