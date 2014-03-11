var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('posts', {
		id: { type: 'int', primaryKey: true, autoIncrement: true},
		rev: 'int',
		title: {type: 'string', unique: true },
		userid: 'string',
		doc: 'text',
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('posts', callback);
};
