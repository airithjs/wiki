var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('users', {
		id: { type: 'int', primaryKey: true, autoIncrement: true},
		username: 'string',
		userid: {type: 'int', unique: true},
		password: 'string',
		email: 'string'
	}, callback );
};

exports.down = function(db, callback) {
	db.dropTable('users', callback);
};
