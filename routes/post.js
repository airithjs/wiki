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

	app.get('/edit', function(req,res){
		if(!req.user) res.redirect('/');
		else res.render('edit', {user: req.user, title: null, post: null});
	});

	app.get('/edit/:title', function(req,res){
		if(!req.user) res.redirect('/');
		else{
			var title = req.params.title;

			Post.read(title,function(err,vals){
				if(vals.length <= 0){
					res.render('edit', {user: req.user, title: title, post: null});
				}else{
					var htmlStr = markdownConvert(vals[0].doc);
					res.render('edit', {user: req.user, title: title, post: vals[0].doc, doc: htmlStr});
				}
			});
		}
	});

	app.post('/save', function(req,res){
		if(!req.user) res.redirect('/');
		else{
			console.log(req.body);
			console.log(req.params);
			Post.save(req.body.title, req.user.userid,req.body.doc,function(err,vals){
				res.redirect('/view/' + req.body.title);
			});
		}
	});

	app.get('/view/:title', function(req,res){
		if(!req.user) res.redirect('/');
		else{
			var title = req.params.title;
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

	app.get('/view', function(req,res){
		if(!req.user) res.redirect('/');
		else res.redirect('/view/main');
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
		//if(!req.user) res.redirect('/');
		//else{
			File.images(req.params.title,function(err,vals){
				console.log(vals);
				res.render('images', {user: req.user, title: req.params.title, images: vals});
			});
		//}
	});

	app.get('/file/upload',function(req,res){
			res.render('_fileupload');
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