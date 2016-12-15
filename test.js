

module.exports = function(name, description){
  var name = name;
  var description = description;
  var functions ={
    setName : function(nameIn){
      this.name = nameIn;
    },
    setDescription : function(descriptionIn){
      this.description = descriptionIn;
    },
    getInfo : function(){
      return{
        name : name,
        description : description
      }
    }
  };
  return functions;
}



//var http = require('http');
//Creating Server
// var handler = function(req, res){
//   res.end("A simple call from server")
// }
// http.createServer(handler).listen(3456);
// console.log("Http on 3456");

// var http = require('http');
// var connect = require('connect');
// var bodyParser = require('body-parser');
//
// var app = connect()
//     .use(bodyParser.urlencoded({extended : true}))
//     .use(function(req, res){
//       var parsedInfo = {};
//       parsedInfo.firstName = req.body.userfirstName;
//       parsedInfo.lastName = req.body.userlastName;
//       res.end("User info Received from " + parsedInfo.firstName + " "+ parsedInfo.lastName)
//     });
// http.createServer(app).listen(3456);
// console.log("on 3456");



//
// console.log("NPM Module test");
//
// // var apple = require('./test.js');
// //
// //
// // var banana = require('./test.js')();
// // banana.setName('banana');
// // console.log(banana.getInfo());
//
// var fruit = require('./test.js');
//
// var banana = fruit("cherry", "small red fruit");
//
// console.log(banana.getInfo());



//
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/movie');
//
// var db = mongoose.connection;
//
// db.on('error',console.error.bind(console, 'connection error'));
//
// db.once('open', function(){
//   console.log('Connected');
//
//   var movieSchema = mongoose.Schema({
//     title : String,
//     year : Number,
//     imdb : String
//   });
//
//   var MovieGroup = mongoose.model('MovieGroup', movieSchema, 'movie');
//
//   MovieGroup.find({},function(err,movie){
//     if(err) return console.error(err);
//     console.log(movie);
//
//   });
//
//   var newMovie = new MovieGroup({
//     title : "Sausage Party",
//     year : 2016,
//     imdb : "http://www.imdb.com/title/tt1700841/"
//   });
//   var promise = newMovie.save();
//   console.log("movie Saved");
// });
//
