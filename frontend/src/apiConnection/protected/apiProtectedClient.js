const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function protectedApi(endpoint, { body, ...customConfig } = {}){
	const headers = { 'Content-Type': 'application/json' };
	const token = localStorage.getItem('token');
	console.log(token);
	const config = {
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