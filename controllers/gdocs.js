// Created on 2015-06-18 by Andrew Crider
// Copyright Matt McPherson/Andrew Crider
//Description: Pull Google Tasks
//Remaining Tasks ????


var Spreadsheet = require('edit-google-spreadsheet');

module.exports.getGTasks = function (req,res){



Spreadsheet.load({
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