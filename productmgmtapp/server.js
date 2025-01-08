const express = require('express');
const { getProducts, getProductsByName} = require('./src/repository');
const app = express();
const port = process.env.port || 8080;
// secure the direct call to the application

app.get('/products', getProducts);

app.listen(port, () => {
	console.log('%s listening at %s', app.name, port);
})