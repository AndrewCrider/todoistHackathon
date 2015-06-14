

var https = require ('https'),
    request = require ('request');


// Created on 2015-06-14 by Andrew Crider
// Copyright Matt/Andrew
//Description: adds a task to todoist with the parameters of:
//				:content - task content
//              :project_id - project name
//				:date_string - due date (in plain text)
//Remaining Tasks Finish constructing arguments


/*module.exports.addTask = function(req, response){

var taskTitle = req.params.content,
    project = req.params.project_id,
    date = req.params.date_string
    type = 'item_add';

	
	var postOptions = {
		url: 'https://todoist.com/API/v6/sync',
		method: 'POST',
		form: {
			token: '76ea35efc079408c3f2ae5cb077cf283d87f52d0',
			commands: '[{"type":' + type + ', "args" : {"content" : ' + taskTitle + 
			type: type,
			content: taskTitle,
			project_id: project,
			date_string: date,
			
		}
	};

	
console.log(postOptions);

request(postOptions, function(error, res, body){
		if(error){
			response.send(error);
		} else {
			console.log(res.statusCode);

			var jsonBody = JSON.parse(body);
			response.send(jsonBody);
		}

	});


};*/