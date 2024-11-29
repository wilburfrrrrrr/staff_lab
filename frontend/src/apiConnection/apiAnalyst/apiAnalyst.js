// import { apiClient } from "../../apiConnection/client/apiClient";
import { protectedApi } from "../protected/apiProtectedClient";
// import { jwtDecode } from "jwt-decode";

export async function createAnalyst(
	{ name, second_name, last_name, phone_number, second_last_name, email, password, rol = 1 }) {
  return await protectedApi("analyst", 'POST', {
	body: {
		user: { email, password, rol },
		analyst: { name, second_name, last_name, phone_number, second_last_name }
		},
  });
}

export async function getAnalyst({ id }) {
	  return await protectedApi(`analyst/${id}`, 'GET');
}

