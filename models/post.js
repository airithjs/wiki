var post = module.exports = function(db){
	return{
		read: function(title,callback){
			db.query('SELECT * FROM posts WHERE title = ?',
				[title], callback);
		},

		save: function(title,userid,doc,callback){
			var query = 'INSERT INTO posts(rev,title,userid,doc) VALUES(1,?,?,?) ON DUPLICATE KEY UPDATE rev = rev + 1, userid = ?, doc = ?;'
			db.query(query, [title,userid,doc,userid,doc], callback);
		},


		search: function(string,callback){
			db.query('SELECT title FROM posts WHERE title like ?',
			 [ '%' + string + '%'], callback);
		}
	}
}