var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('users', {
		id: { type: 'int', primaryKey: true, autoIncrement: true},
		username: 'string',
		userid: {type: 'string', unique: true},
		password: 'string',
		email: 'string',
		auth_lv: { type: 'int', defaultValue: 0}
	}, callback );
};

exports.down = function(db, callback) {
	db.dropTable('users', callback);
};
