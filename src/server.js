var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

var port = 8000;

app.use(bodyParser.json()); // supports JSON encoded bodys 

app.set('view engine', 'ejs'); // optional - using ejs view library
app.set(express.static(__dirname + '/public')); // setting the clients static folder
app.set('views', __dirname + '/views/');
app.use(router);

// User routes
router.get('/', function(request, response) {
  // response.send('Hello world'); // response.send to send just text back to the client

  /*
    1. First argument is passing the view back to the client
    2. Second argument is our data object to use in the rendered page
  */
  response.render('pages/index'); // render actual page
});


// API routes
var apiItems = require('./routes/api-items.js');
router.use('/api/items/', apiItems);

app.listen(port, function() {
  console.log('Site listening on port', port);
});