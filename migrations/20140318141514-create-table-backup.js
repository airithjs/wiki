var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('backups', {
		id: { type: 'int', primaryKey: true, autoIncrement: true},
		rev: 'int',
		title: 'string',
		userid: 'string',
		doc: 'text',
	}, function(){
		db.addIndex('backups', 'idx_title', 'title', false, callback);
	});
};

exports.down = function(db, callback) {
	db.dropTable('backups', callback);
};
