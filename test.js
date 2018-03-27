// server.js

// BASE SETUP
// =============================================================================
var Connect = require("uport-connect")
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var SimpleSigner = require('SimpleSigner');
const uport = new Connect('Drew Patel\'s new app', {
      clientId: '2or4KmXTkr2WvpaPKqM6SxA2mUgaeYi9yJ3',
      signer: SimpleSigner('fdbcdeb01fb806f205e8d892cf2a038ccb709c8ad1d22a91d08a9b0bce863e70')
    })
const cred = {
   sub: '0xFaEc587Ccb54Cab85ad30d9c44177C212474BD03',
   claim: {'beats': 'hello@uport.me'},
   exp: '1300819380'
 }
 
 connect.attestCredentials(cred).then(res => {
   // response okay, received in uPort app
 })

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    console.log(req.query.name)
    res.json({ message: 'hooray! welcome to our api!' });   
});
router.get('/register', function(req, res) {
    
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);