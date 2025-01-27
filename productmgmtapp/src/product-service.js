const repository = require('./products.json');
const axios = require('axios')

async function getProducts(request, response) {
	response.setHeader('Content-Type', 'application/json');
	try {
		let result = [];
		const productId = request.query.id;
		if (productId == null) {
			result = await getAllProducts(request);
		} else {
			result = await getProductById(productId);
		}
		response.status(200).send(result);
	} catch (error) {
		console.error(`Error: ${error.message || error}`); // Logs error for debugging
        response.status(error.status || 500).send({ error: error.message || 'Internal Server Error' });
	}

}

async function getAllProducts() {
	let result = []
	try {
		const response = await axios.get('https://fakestoreapi.com/products');
		result = response.data;
		return result;
	} catch (error) {
		console.log(`Error while accessing the backend API: ${error.status}`);
		result = repository;
	}
	return result;
}

async function getProductById(productId) {
	let result = []
	try {
		const response = await axios.get('https://fakestoreapi.com/products/' + productId);

		if (!response.data) {
			throw {
				status: 400,
				message: 'No product information found for the requested product id'
			}
		}
		result = response.data;

	} catch (error) {
		console.log(`Error while accessing the backend API: ${error.status}`);
		throw error;
	}
	return result;

}

module.exports = {
	getProducts
}