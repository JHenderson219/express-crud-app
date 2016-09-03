var express = require('express');
var app = express();

var port = 8000;

app.get('/', function(request, response) {
  response.send('Hello world');
});

app.listen(port, function() {
  console.log('Site listening on port', port);
});