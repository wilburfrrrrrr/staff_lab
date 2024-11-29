import { protectedApi } from "../protected/apiProtectedClient";
// import { jwtDecode } from "jwt-decode";
// import { apiClient } from "../client/apiClient";

export async function createEmployee({ id, name, secondName, lastName, secondLastName, phoneNumber, email, genre, state, cv }) {
	  return await protectedApi("employees", {
		method: 'POST',
		body: { id, name, secondName, lastName, secondLastName, phoneNumber, email, genre, state, cv },
  });
}

export async function getEmployee({ id }) {
	  return await protectedApi("employees", {
			method: 'GET',
			body: { id },
		}
	);
}

export async function getEmployees() {
	return await protectedApi("employees",	{
			method: 'GET',
		}
	);
}

export async function payEmployee({ id }) {
	return await protectedApi("employees/pay", {
		method: 'PUT',
		body: { id },
	});
}

export async function getPaymentHistory({ id }) {
	return await protectedApi("employees/paymentHistory", {
		method: 'GET',
		body: { id },
	});
}