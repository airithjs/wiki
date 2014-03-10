var marked = require('marked');

function markdownConvert(string){
	var rowString = string.replace(/\t/g, "    ");
	var result = marked(rowString);
	var regExp = /\[\[(.+)\]\]/g ;
	return result.replace(regExp, "<a href='/view/$1'>$1</a>");
}

exports.routes = function(app,db){
	var Post = require('../models/post')(db);

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

}