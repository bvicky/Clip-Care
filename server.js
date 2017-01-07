console.log('server based authentication');
var express = require('express');
var app = express();
var passport = require('passport');

require('./config/express')(app);
var config = require('./config/config');
require('./config/mongoose')(config);
require('./app/passport')(passport);
require('./app/routes')(app, passport);
require('./app/api')(app);
require('./app/statistics')(app);


var port = 3000;
app.listen(port, function () {
    console.log('Server listening on port' + port);
})