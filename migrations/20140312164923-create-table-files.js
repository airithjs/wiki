var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('files',{
		id: { type: 'int', primaryKey: true, autoIncrement: true},
		type: 'string',
		name: 'string',
		tag: 'string',
		title: 'string'
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('files', callback);
};
