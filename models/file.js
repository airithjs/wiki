var files = module.exports = function(db){
	return {
		upload: function(filename,type,tag,title,callback){
			db.query("INSERT INTO files SET name =? , type = ?, tag = ? , title = ?",
				[filename,type,tag,title], callback);
		},

		images: function(title,callback){
			db.query("SELECT * FROM files WHERE type like 'image%' AND title like ?",
				["%" + title + "%"], callback);
		}
	}
}