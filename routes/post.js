var marked = require('marked');
var fs = require('fs');

function markdownConvert(string){
	var rowString = string.replace(/\t/g, "    ");
	var result = marked(rowString);
	var regExp = /\[\[(.+)\]\]/g ;
	return result.replace(regExp, "<a href='/view/$1'>$1</a>");
}

exports.routes = function(app,db){
	var Post = require('../models/post')(db);
	var File = require('../models/file')(db);
	var Backup = require('../models/backup')(db);

	app.get('/edit/:title?', function(req,res){
		var title = req.params.title || null;
		if(!req.user || title == null) res.redirect('/');
		else{
			Post.read(title,function(err,vals){
				if(vals.length <= 0){
					res.render('edit', {user: req.user, title: title, post: null, rev: 0});
				}else{
					var htmlStr = markdownConvert(vals[0].doc);
					res.render('edit', {user: req.user, title: title, post: vals[0].doc, rev: vals[0].rev, doc: htmlStr});
				}
			});
		}
	});

	app.get('/view/:title?', function(req,res){
		if( !req.user ) res.redirect('/');
		else{
			var title = req.params.title || 'main';
			Post.read(title,function(err,vals){
				if(vals.length <= 0){
					res.redirect('/edit/' + title);
				}else{
					var htmlStr = markdownConvert(vals[0].doc);
					res.render('view', {user: req.user, post: vals[0], doc: htmlStr });
				}
			});
		}
	});

	app.post('/save', function(req,res){
		if(!req.user) res.redirect('/');
		else{
			var form = req.body;
			var currentRev = parseInt(form.rev);
			console.log(form);
			console.log(req.user);
			Backup.save(form.title, req.user.username, form.doc, currentRev + 1, function(err,vals){
				if(err) console.log("ERROR: Backup failed");
			});

			Post.save(form.title, req.user.username, form.doc ,function(err,vals){
				res.redirect('/view/' + req.body.title);
			});
		}
	});

	app.post('/search', function(req,res){
		if(!req.user) res.redirect('/');
		else{
			Post.search(req.body.query, function(err,vals){
				res.render('search', {query: req.body.query, list: vals});
			});
		}
	});

	app.get('/images/:title?', function(req,res){
		if(!req.user) res.redirect('/');
		else{
			File.images(req.params.title,function(err,vals){
				console.log(vals);
				res.render('images', {user: req.user, title: req.params.title, images: vals});
			});
		}
	});

	app.post('/file/upload', function(req,res){
		console.log(req)
		console.log(req.files)
		var filename = req.files.uploadFile.name;
		var type = req.files.uploadFile.type;
		var tag = req.body.tag;
		var title = (req.body.title || "unknown").replace(" " , "") ;
		var path = __dirname + "/../public/uploadfiles/" + title + "/";

		File.upload(filename,type,tag,title,function(err,data){
			if(err) throw err;
		});
		console.log(path);
		fs.mkdir(path,0777,function(err){
			fs.readFile(req.files.uploadFile.path,function(err,data){
				fs.writeFile(path + filename, data, function(err){
					if(err) throw err;
					res.send({result: true});
				});
			});
		});
		
	});

}