var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var multer = require('multer');

var localStrategy = require('passport-local').Strategy;




module.exports = function(app){
  app.use(express.static(__dirname + './../public'));
  app.set('views', __dirname + './../public');
  app.engine('html', require('ejs').renderFile);
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended' : true}));
  app.use(bodyParser.json());
  app.use(session({secret : 'loginKey',resave:true,saveUninitialized:true,duration: 30 * 60 * 1000}));
  app.use(passport.initialize());
  
  app.use(passport.session());
  app.use(flash());
  
}
