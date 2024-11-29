// import { apiClient } from "../../apiConnection/client/apiClient";
import { protectedApi } from "../protected/apiProtectedClient";
// import { jwtDecode } from "jwt-decode";

export async function createAnalyst(
	name, second_name, last_name, phone_number, second_last_name, email, password, rol = 1 
) {
  return await protectedApi("analyst", {
	method: 'POST',
	body: {
		user: { email, password, rol },
		analyst: { name, second_name, last_name, phone_number, second_last_name }
  		}
	})
}


// async function createUser({ email, password, rol }) {
// 	return await protectedApi("user", {
// 		method: 'POST',
// 		body: { email, password, rol }
// 	});
// }

export async function getAnalyst({ id }) {
	  return await protectedApi(`analyst/${id}`, {
		method: 'GET'
	});
}

