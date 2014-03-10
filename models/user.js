var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(db){
	return{
		register: function(userid,username,password,email,callback){
			db.query('INSERT INTO users SET userid = ? , username = ? , password = password(?) , email = ?',
				[userid,username,password,email],callback);
		},

		authenticate: function(userid,password,done){
			db.query('SELECT * FROM users WHERE userid = ? AND password = password(?) LIMIT 1',
				[userid,password],
				function(err,vals){
					if(err){
						throw err;
					}
					done(null,vals[0]);
				});
		}
	}
}

