const BASE_URL = "http://localhost:8000";

export async function protectedApi(endpoint, { body, ...customConfig } = {}){
	const headers = { 'Content-Type': 'application/json' };
	const token = localStorage.getItem('token');
	console.log(`body: ${body}`);
	const config = {
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers,
			Authorization: `Bearer ${token}`,
		},
		body: body,
	};

	console.log(config.body);
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