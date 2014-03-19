var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('files',{
		id: { type: 'int', primaryKey: true, autoIncrement: true},
		type: 'string',
		name: 'string',
		tag: 'string',
		title: 'string',
		info: 'string'
	}, function(){
		db.addIndex('files', 'idx_title', 'title', false, function(){
			console.log("Create Index for Title");
		});
		db.addIndex('files', 'idx_tag', 'tag', false, function(){
			console.log("Create Index for Tag");
		});
		callback();
	});
};

exports.down = function(db, callback) {
	db.dropTable('files', callback);
};
