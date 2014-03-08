var db = require('./connect').connect;

var post = module.exports = {
	save: function(title,userid,doc,callback){
		post.read(title,function(err,vals){
			if(err) throw err;
			if(vals.length <= 0){
				db.query('INSERT INTO posts SET title = ?, userid = ?, doc = ?, rev = 1', 
					[title,userid,doc], callback);
			}else{
				db.query('UPDATE posts SET userid = ?, rev = rev + 1, doc = ? WHERE title = ?', 
					[userid,doc,title], callback);
			}
		});
	},

	read: function(title,callback){
		db.query('SELECT * FROM posts WHERE title = ? limit 1;',
			[title], callback);
	}

}