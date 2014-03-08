var mysql = require('mysql');

exports.connect = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'wiki'
});
