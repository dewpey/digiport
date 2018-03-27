import { Connect, Credentials, SimpleSigner } from 'uport'
var express = require('express');
var jsontokens = require('jsontokens');
var app = express();
var bodyParser = require('body-parser');
const signer = SimpleSigner('c818c2665a8023102e430ef3b442f1915ed8dc3abcaffbc51c5394f03fc609e2')


const credentials = new Credentials({
  appName: 'DigiPort',
  address: '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG',
  signer: signer
})


var app = express();

app.use(bodyParser.json({ type: '*/*' }))

app.get('/', function (req, res) {

  credentials.createRequest({
    verified: ['My Title'],
    callbackUrl: 'https://uporttest-blurjoe.c9users.io:8082/callback',
    exp: Math.floor(new Date().getTime()/1000) + 300
  }).then( function(requestToken) {
    var uri = 'me.uport:me?requestToken=' + requestToken + '%26callback_type=post'
    var qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    var mobileUrl = 'https://id.uport.me/me?requestToken=' + requestToken + '&callback_type=post'
    console.log(uri)
    res.send('<div><img src=' + qrurl + '></img></div><div><a href=' + mobileUrl + '>Click here if on mobile</a></div>');
  })

})

app.post('/callback', function (req, res) {

  var jwt = req.body.access_token
  console.log(jwt)

  credentials.receive(jwt).then( function(creds) {
    console.log(creds)
    if (creds.address == creds.verified[0].sub && 
       creds.verified[0].iss == '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG' &&
       creds.verified[0].claim['Digi Port Verified']['Name'] === 'John Smith')
    {
      console.log('Credential verified.');
    } else {
      console.log('Verification failed.');
    }
  })

})

var server = app.listen(8082, function () {
  
  console.log("Tutorial app running...")
})