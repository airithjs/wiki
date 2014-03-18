var backup = module.exports = function(db){
	return{
		read: function(title,callback){
			db.query('SELECT * FROM backups WHERE title = ? ORDER BY rev DESC limit 10;',
				[title], callback);
		},

		save: function(title,userid,doc,rev,callback){
			var query = 'INSERT INTO backups(rev,title,userid,doc) VALUES(?,?,?,?)';
			db.query(query, [rev,title,userid,doc], callback);
		},


		search: function(string,callback){
			db.query('SELECT title FROM backups WHERE title like ? ORDER BY rev DESC limit 1',
			 [ '%' + string + '%'], callback);
		}
	}
}