var express = require('./config/express');
var mongoose = require('./backend/config/mongoose');

// run database before express application object

var db = mongoose();
var app = express();

app.set('port',(process.env.PORT||1337));

app.listen(app.get('port'), function () {
  console.log('Server running at localhost: ' + app.get('port'));
});

module.exports = app;
