var connection = require('./connect').connect;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports = {
	init: function(app){
		app.use(passport.initialize());
		app.use(passport.session());
		passport.use(new LocalStrategy(this.authenticate));
		passport.serializeUser(function(user,done){done(null,user)});
		passport.deserializeUser(function(user,done){done(null,user)});
		console.log("Init Passport");
	},

	register: function(userid,username,password,email,callback){
		connection.query('INSERT INTO users SET userid = ? , username = ? , password = password(?) , email = ?',
			[userid,username,password,email],callback);
	},

	authenticate: function(userid,password,done){
		connection.query('SELECT * FROM users WHERE userid = ? AND password = password(?) LIMIT 1',
			[userid,password],
			function(err,vals){
				if(err){
					throw err;
				}
				done(null,vals[0]);
			});
	}
}

