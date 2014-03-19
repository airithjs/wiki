exports.routes = function(app,db,passport){
	var user = require('../models/user')(db);

	app.get('/', function(req, res){
  	res.render('index', {});
	});

	app.get('/register', function(req,res){
		res.render('register', {});
	});

	app.post('/register', function(req,res){
		console.log(req.body);
		user.register(req.body.userid, req.body.username, req.body.password, req.body.email, function(err,vals){
			res.redirect('/');
		});
	});

	app.post('/login', passport.authenticate('local', {
        successRedirect: '/view/main',
        failureRedirect: '/',
        failureFlash: false })
	);

	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});


}