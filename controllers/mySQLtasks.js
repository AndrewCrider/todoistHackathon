// Created on 2015-07-19 by Andrew Crider
// Copyright Matt and Andrew <sprints4everyone>
//Description: First read from database
//Remaining Tasks write to database



var mysql = require('mysql'),
    date = require('date-format');

var mySQLConnection = mysql.createPool({
							connectionLimit: 100,
							aquireTimeout: 30000,
							host: 'sprints4everyone.ct9ktqrpriif.us-east-1.rds.amazonaws.com',
							user: 'sprintAdmin',
							password: 'nE9p5jX^gZ',
							database:'sprints4everyone',
							debug: true
});


module.exports.tasks = function (req, res){
	mySQLConnection.getConnection(function(err, connection){
			
		if (err) throw err;

			connection.query('Select * from tasks', 

					function(err, rows, fields){
						
						if(!err)
					
							res.json(rows);
						else
							
							res.send('Error');
					});
			connection.release();

		});


};