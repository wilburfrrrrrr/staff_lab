export const apiClient = {
	fetchUsers: async () => {
	  // Simula una llamada de API al archivo JSON
	  	const response = await fetch('/users.json'); // Asume que está en `public/`
		if (!response.ok) {
			throw new Error('Failed to fetch mock data');
		}
		return response.json();
	}
};


// apiClient.js

//const apiUrl = "";  // Cambia esto a la URL de tu backend

// export async function post(url, data) {
//   const response = await fetch(`${apiUrl}${url}`, {
//     method: "POST",  // Estamos usando POST porque estamos enviando datos
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),  // Convertimos el objeto data a un formato JSON
//   });

//   // Si la respuesta no es ok, tiramos un error
//   if (!response.ok) {
//     throw new Error("Error en la solicitud");
//   }

//   return await response.json();  // Devolvemos la respuesta como JSON
// }
