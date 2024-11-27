const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function apiClient(endpoint, { body, ...customConfig } = {}){
	console.log(process.env);
	console.log(BASE_URL);
	const headers = { 'Content-Type': 'application/json' };
	const config = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers,
		},
	};

	if(body){
		console.log(body);
		config.body = await JSON.stringify(body);
		console.log(config.body);
	}

	try {
		console.log(config);
		const response = await fetch(`${BASE_URL}/${endpoint}`, config);
		const data = await response.json();
		console.log(data);

		if(response.ok){
			return data;
		}

		throw new Error(data.message);
	} catch (error) {
		return Promise.reject(error.message);
	}
}