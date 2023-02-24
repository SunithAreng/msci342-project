let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// comment from here 
var cors = require('cors');
app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	if ('OPTIONS' === req.method) {
		res.send(200);
	}
	else {
		next();
	}
});

// app.post('/api/loadUserSettings', (req, res) => {

// 	let connection = mysql.createConnection(config);
// 	let userID = req.body.userID;

// 	let sql = `SELECT mode FROM user WHERE userID = ?`;
// 	console.log(sql);
// 	let data = [userID];
// 	console.log(data);

// 	connection.query(sql, data, (error, results, fields) => {
// 		if (error) {
// 			return console.error(error.message);
// 		}

// 		let string = JSON.stringify(results);
// 		//let obj = JSON.parse(string);
// 		res.send({ express: string });
// 	});
// 	connection.end();
// });

// app.post('/api/loadUserSettings', (req, res) => {

// 	let connection = mysql.createConnection(config);
// 	let userID = req.body.userID;

// 	let sql = `SELECT mode FROM user WHERE userID = ?`;
// 	console.log(sql);
// 	let data = [userID];
// 	console.log(data);

// 	connection.query(sql, data, (error, results, fields) => {
// 		if (error) {
// 			return console.error(error.message);
// 		}

// 		let string = JSON.stringify(results);
// 		//let obj = JSON.parse(string);
// 		res.send({ express: string });
// 	});
// 	connection.end();
// });

app.post('/api/getOrigin', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM stations`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/getTimes', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM timings`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});


app.listen(8081, () => console.log(`Listening on port ${port}`)); //for the dev version

// app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
