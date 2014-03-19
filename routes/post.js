var marked = require('marked');
var fs = require('fs');

function markdownConvert(string){
	var rowString = string.replace(/\t/g, "    ");
	var result = marked(rowString);
	var regExp = /\[\[(.+)\]\]/g ;
	return result.replace(regExp, "<a href='/view/$1'>$1</a>");
}

function IsAuthenticated(req,res,next){
  if(req.user){
      next();
  }else{
      //next(new Error(401));
      res.redirect('/');
  }
}

exports.routes = function(app,db){
	var Post = require('../models/post')(db);
	var File = require('../models/file')(db);
	var Backup = require('../models/backup')(db);

	app.get('/edit/:title?', IsAuthenticated, function(req,res){
		var title = req.params.title || null;
		if( title == null) res.redirect('/view');
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

	app.get('/view/:title?', IsAuthenticated, function(req,res){
		var title = req.params.title || 'main';
		Post.read(title,function(err,vals){
			if(vals.length <= 0){
				res.redirect('/edit/' + title);
			}else{
				var htmlStr = markdownConvert(vals[0].doc);
				res.render('view', {user: req.user, post: vals[0], doc: htmlStr });
			}
		});
	});

	app.post('/save', IsAuthenticated, function(req,res){
		var form = req.body;
		var currentRev = parseInt(form.rev);
		Backup.save(form.title, req.user.username, form.doc, currentRev + 1, function(err,vals){
			if(err) console.log("ERROR: Backup failed");
		});

		Post.save(form.title, req.user.username, form.doc ,function(err,vals){
			res.redirect('/view/' + req.body.title);
		});
	});

	app.post('/search', IsAuthenticated, function(req,res){
		Post.search(req.body.query, function(err,vals){
			res.render('search', {query: req.body.query, list: vals});
		});
	});

	app.get('/images/:title?', IsAuthenticated, function(req,res){
		File.images(req.params.title,function(err,vals){
			res.render('images', {user: req.user, title: req.params.title, images: vals});
		});
	});

	app.post('/file/upload', IsAuthenticated, function(req,res){
		var filename = req.files.uploadFile.name;
		var type = req.files.uploadFile.type;
		var tag = req.body.tag;
		var title = (req.body.title || "unknown").replace(" " , "") ;
		var path = __dirname + "/../public/uploadfiles/" + title + "/";

		File.upload(filename,type,tag,title,function(err,data){
			if(err) throw err;
		});

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