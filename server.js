import { Connect, Credentials, SimpleSigner } from 'uport'
var express = require('express');
var jsontokens = require('jsontokens');
var app = express();

const signer = SimpleSigner('c818c2665a8023102e430ef3b442f1915ed8dc3abcaffbc51c5394f03fc609e2')


const credentials = new Credentials({
  appName: 'DigiPort',
  address: '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG',
  signer: signer
})

app.get('/', function (req, res) {
  
  console.log(req.query);
  credentials.attest({
    sub: '2oeYDPoVAN6SQY7s5HTJzkUTWFAMkkkc7GX',
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    claim: {'DigiPort Verified ID' : req.query}
    // Note, the above is a complex claim. Also supported are simple claims:
    // claim: {'Key' : 'Value'}
  }).then(function (att) {
    console.log(att)
    console.log(jsontokens.decodeToken(att))
    var uri = 'me.uport:add?attestations=' + att + '%26callback_type=post'
    var qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    var mobileUrl = 'https://id.uport.me/add?attestations=' + att + '&callback_type=post'
    console.log(uri)
    //res.send('<div><img src=' + qrurl + '></img></div><div><a href=' + mobileUrl + '>Click here if on mobile</a></div>')
    res.send(mobileUrl)
  })
})

var server = app.listen(8081, function () {
  console.log("Tutorial app running...")
})
