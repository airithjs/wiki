var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(db){
	return{
		register: function(userid,username,password,email,callback){
			db.query('SELECT COUNT(*) as userCnt FROM users', function(err,vals){
				console.log(vals);
				var authLv = 0;
				if( vals[0].userCnt == 0){
					authLv = 9;
				}
				db.query('INSERT INTO users SET userid = ? , username = ? , password = password(?) , email = ?, auth_lv = ?',
					[userid, username, password, email, authLv], callback);
			})
		},

		authenticate: function(userid,password,done){
			db.query('SELECT * FROM users WHERE userid = ? AND password = password(?) AND auth_lv > 0 LIMIT 1',
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

