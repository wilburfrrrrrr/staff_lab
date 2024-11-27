import { apiClient } from "../../apiConnection/client/apiClient";
import { jwtDecode } from "jwt-decode";

export async function createAnalyst({ name, password }) {
  return await apiClient("analysts", {
	body: { name, password },
  });
}