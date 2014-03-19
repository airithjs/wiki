var files = module.exports = function(db){
	return {
		upload: function(filename,type,tag,title,info,callback){
			db.query("INSERT INTO files SET name =? , type = ?, tag = ? , title = ?, info = ?",
				[filename,type,tag,title,info], callback);
		},

		images: function(title,callback){
			db.query("SELECT * FROM files WHERE type like 'image%' AND title like ?",
				["%" + title + "%"], callback);
		}
	}
}