
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');


var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var env = app.get('env') || 'development';
var db = require('./models/connect').connect(env);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// passport
app.use(express.bodyParser());
app.use(express.cookieParser('myWikiCooKie'));
app.use(express.session({secret: 'SecretSessionKey'}));

//passport
app.use(passport.initialize());
app.use(passport.session());
//
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//module setting
var User = require('./models/user')(db);
passport.use(new LocalStrategy(User.authenticate));
passport.serializeUser(function(user,done){done(null,user)});
passport.deserializeUser(function(user,done){done(null,user)});
console.log("Init Passport");

var Index = require('./routes/index').routes(app,db,passport);
var PostController = require('./routes/post').routes(app,db);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
