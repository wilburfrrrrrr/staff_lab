import { protectedApi } from "../protected/apiProtectedClient";
// import { jwtDecode } from "jwt-decode";
// import { apiClient } from "../client/apiClient";

export async function createEmployee({ id, name, secondName, lastName, secondLastName, phoneNumber, email, genre, state, cv }) {
	  return await protectedApi("employee", {
		method: 'POST',
		body: { id, name, secondName, lastName, secondLastName, phoneNumber, email, genre, state, cv },
  });
}

export async function getEmployee( id ) {
	  return await protectedApi(`employee/${id}`, {
			method: 'GET',
		}
	);
}

export async function getEmployees() {
	return await protectedApi("employee",	{
			method: 'GET',
		}
	);
}

export async function payEmployee( id ) {
	return await protectedApi("employee/payment/", {
		method: 'PUT',
		body: { id },
	});
}

export async function getPaymentHistory( id ) {
	return await protectedApi("payment/", {
		method: 'GET',
		body: { id },
	});
}