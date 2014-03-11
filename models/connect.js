var mysql = require('mysql');
var config = require('../database.json');

exports.connect = function(env){
	if(config[env] == undefined){
		env = "dev";
	}
	var host = config[env].host || "localhost";
	var user = config[env].user || "root";
	var password = config[env].password || "";
	var database = config[env].database || "test";
	return mysql.createConnection({
		host: host,
		user: user,
		password: password,
		database: database
	});
}
