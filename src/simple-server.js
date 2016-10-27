var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send('We are at the index route!');
});

app.get('/another-route', function(request, response) {
  response.send('We are at another route!');
});

app.listen(8000, function() {
  console.log('Site listening on port 8000');
});