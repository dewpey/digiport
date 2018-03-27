var express = require('express');
var uport = require('uport-connect');
var jsontokens = require('jsontokens')
var bodyParser = require('body-parser')

var signer = uport.SimpleSigner('fdbcdeb01fb806f205e8d892cf2a038ccb709c8ad1d22a91d08a9b0bce863e70')


var credentials = new uport.Credentials({
  appName: 'Drew Patel\'s new app',
  address: '2or4KmXTkr2WvpaPKqM6SxA2mUgaeYi9yJ3',
  signer: signer
//  networks: {'0x4': {'registry' : '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee', 'rpcUrl' : 'https://rinkeby.infura.io'}}
  // Note: we use Rinkeby by default, the above is the explicit format for selecting a network
})

var app = express();

app.use(bodyParser.json({ type: '*/*' }))

app.get('/', function (req, res) {

  credentials.createRequest({
    verified: ['My Title'],
    callbackUrl: 'https://uporttest-blurjoe.c9users.io:8081/callback',
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
       creds.verified[0].iss == '2od4Re9CL92phRUoAhv1LFcFkx2B9UAin92' &&
       creds.verified[0].claim['My Title']['KeyOne'] === 'ValueOne' &&
       creds.verified[0].claim['My Title']['KeyTwo'] === 'Value2' &&
       creds.verified[0].claim['My Title']['Last Key'] === 'Last Value')
    {
      console.log('Credential verified.');
    } else {
      console.log('Verification failed.');
    }
  })

})

var server = app.listen(8081, function () {
  
  console.log("Tutorial app running...")
})