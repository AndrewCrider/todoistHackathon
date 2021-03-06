// Created on 2015-06-12 by Andrew Crider
// initial server setup

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    admin = require('./controllers/admin'),
    todoist = require('./controllers/todoist'),
    gdocs = require('./controllers/gdocs'),
    sql = require('./controllers/mySQLtasks'),
    https = require('https'),
    request = require('request'),
    jade = require('jade'); 



 app.use(bodyParser.urlencoded({
 		entended:true
 }));

 app.use(bodyParser.json());

 app.set('view engine', 'jade');



 var notImplemented = function (req, res){
 	res.sendStatus(501);
 }


app.get('/webhookresponse', admin.webhook);


app.post('/gtest', gdocs.appendGTasks);
app.get('/addTask/:content/:project_id/:date_string', todoist.addTask);
app.get('/gdocs', gdocs.getGTasks);
app.get('/tasks', sql.tasks);
app.get('/test/', function (req, res){
    res.render('teststuff/index');
});

app.get('/foo/', function (req, res){
    res.render('teststuff/foo');

});


 app.listen(8080);
