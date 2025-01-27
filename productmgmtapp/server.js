const express = require('express');
const { getProducts } = require('./src/product-service');
const app = express();
const port = process.env.port || 8080;

// secure the direct call to the application
const { v3 } = require('@sap/xssec');
const xsenv = require('@sap/xsenv');
const passport = require('passport');

if ( process.env.NODE_ENV != 'local')
{
	passport.use(new v3.JWTStrategy(xsenv.getServices({ uaa: { tag: 'xsuaa' } }).uaa));
	app.use(passport.initialize());
	app.use(passport.authenticate('JWT', { session: false }))
}

app.get('/v1/products', checkReadScope, getProducts);

function checkReadScope(req, res, next) { 
	if (process.env.NODE_ENV == 'local' || req.authInfo.checkLocalScope('read') ) { 
		return next(); 
	} else { 
		console.log('Missing the expected scope'); 
		res.status(403).end('Forbidden'); 
	} 
}

app.listen(port, () => {
	console.log('%s listening at %s', app.name, port);
})