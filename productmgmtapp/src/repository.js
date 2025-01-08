const repository = require('./products.json');

function getProducts(req, res) {
	res.setHeader('Content-Type', 'application/json');
	const result = [];
	const product = req.query.name;
	if (product != null) {
		if (repository.hasOwnProperty(product)) {
			result.push(repository[product]);
		} else {
			res.status(400).send({ error: 'No product found' });
			return;
		}
	} else {
		for (let product in repository) {
			if (repository.hasOwnProperty(product)) {
				result.push(repository[product]);
			}
		}
	}
	res.send(result);
}

module.exports = {
	getProducts
}