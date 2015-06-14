// Created on 2015-06-12 by Andrew Crider
// initial server setup

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');



 app.use(bodyParser.urlencoded({
 		entended:true
 }));

 app.use(bodyParser.json());


 var notImplemented = function (req, res){
 	res.sendStatus(501);
 }

app.get('/test', function (req, res){

	res.send('Your Momma comes here');
});
 app.listen(8080);
