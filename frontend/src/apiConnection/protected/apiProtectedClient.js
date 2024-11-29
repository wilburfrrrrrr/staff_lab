const BASE_URL = "http://localhost:8000";

export async function protectedApi(endpoint, method, { body, ...customConfig } = {}){
	const headers = { 'Content-Type': 'application/json' };
	const token = localStorage.getItem('token');
	console.log("cualquiera");
	const config = {
		method: method,
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers,
			Authorization: `Bearer ${token}`,
		},
	};

	if(body){
		console.log(body);
		config.body = await JSON.stringify(body);
		console.log(config.body);
	}

	try {
		const response = await fetch(`${BASE_URL}/${endpoint}`, config);
		const data = await response.json();

		if(response.ok){
			return data;
		}

		throw new Error(data.message);
	} catch (error) {
		return Promise.reject(error.message);
	}
}