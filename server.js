// Created on 2015-06-12 by Andrew Crider
// initial server setup

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    admin = require('./controllers/admin'),
    todoist = require('./controllers/todoist'),
    gdocs = require('./controllers/gdocs'),
    https = require('https'),
    request = require('request'); 



 app.use(bodyParser.urlencoded({
 		entended:true
 }));

 app.use(bodyParser.json());


 var notImplemented = function (req, res){
 	res.sendStatus(501);
 }


app.get('/webhookresponse', admin.webhook);

app.get('/test/:level', admin.test);
app.get('/addTask/:content/:project_id/:date_string', todoist.addTask);
app.get('/gdocs', gdocs.getGTasks);




 app.listen(8080);
