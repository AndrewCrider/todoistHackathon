// Created on 2015-06-14 by Andrew Crider
// Copyright Andrew/Matt
// Description: Todoist Callback Site
// Remaining Tasks: 1.  Parse


var https = require ('https'),
    request = require ('request');


module.exports.webhook = function(req, res){

		console.log(req);

		res.sendStatus(200);
};

module.exports.test = function(req, response){
	var resource = req.params.level;
	
	var postOptions = {
		url: 'https://todoist.com/API/v6/sync',
		method: 'POST',
		form: {
			token: '76ea35efc079408c3f2ae5cb077cf283d87f52d0',
			seq_no: '0',
			seq_no_global: '0',
			resource_types: '["'+resource+'"]'
		}
	};

	console.log(postOptions.form);

request(postOptions, function(error, res, body){
		if(error){
			response.send(error);
		} else {
			var jsonBody = JSON.parse(body);
			response.send(jsonBody);
		}

	});
};