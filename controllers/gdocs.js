// Created on 2015-06-18 by Andrew Crider
// Copyright Matt McPherson/Andrew Crider
//Description: Pull Google Tasks
//Remaining Tasks ????


var spreadsheet = require('edit-google-spreadsheet');

module.exports.getGTasks = function (req,res){



spreadsheet.load({
	debut: true,
	spreadsheetId: '1B__2MkBDxsc0HCaiO01rkeqsZq3SvsZGq8qyDWk-7cM',
	worksheetName: 'Sheet1',

	oauth2:{
		client_id:'841431682651-u0tlf56hvfcd9aa8u7e707mf757eqvps.apps.googleusercontent.com',
		client_secret: 'crYJUiKoOLvDakRJdsRnyveo',
		refresh_token: '1/q0biSFY9uxYx-irHmRXokffk-3brWcOh5CEIwjb7S4U'

	}

}, function sheetReady(err, spreadsheet){
	if(err) throw err;
	spreadsheet.receive(function(err, rows, info){
		if (err) throw err;
		console.log("Found rows: ", rows);
		res.send(rows);
	});


});

};

// Created on 2015-06-23 by Andrew Crider
// Copyright Matt McPherson/Andrew Crider
//Description: append received input into gsheets
//Remaining Tasks <Tasks>

module.exports.appendGTasks = function (req, res){

var taskTitle = req.body.title,
    taskProject = req.body.Project,
    taskSprint = req.body.Sprint,
    taskUser = req.body.Assignee,
    taskDueDate = req.body.DueDate;

console.log(taskTitle);

spreadsheet.load({
	debut: true,
	spreadsheetId: '1B__2MkBDxsc0HCaiO01rkeqsZq3SvsZGq8qyDWk-7cM',
	worksheetName: 'Sheet1',

	oauth2:{
		client_id:'841431682651-u0tlf56hvfcd9aa8u7e707mf757eqvps.apps.googleusercontent.com',
		client_secret: 'crYJUiKoOLvDakRJdsRnyveo',
		refresh_token: '1/q0biSFY9uxYx-irHmRXokffk-3brWcOh5CEIwjb7S4U'

	}

}, function sheetReady(err, spreadsheet){
	if(err) throw err;
	spreadsheet.receive(function(err, rows, info){
		if (err) throw err;
		console.log("Here's the info", info);
		
		var nextRow = info.lastRow + 1;
		
		var testRow = 33;

		spreadsheet.metadata({ rowCount: nextRow}, function(err, metadata){
			if (err) throw err;
			console.log(metadata);
		});

		var nextRowObj = {};

		nextRowObj[nextRow] = {1: [['1', taskProject, '3', taskSprint, '24' ,taskTitle, ' ', taskUser, taskDueDate, '0', '0']] };

		spreadsheet.add(nextRowObj);
		
		spreadsheet.send(function(err){
			if (err) throw err;
		console.log ("Added 1 row at " + nextRow);
		});



	});
	res.send ("Complete!");

});


};