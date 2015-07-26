var ProjectDates = {};
var ProjectSprints = {};
var ProjectDevs = {};

function getData() {
	var userNames = [];
	var sprintNames = [];

	$.get('../controllers/gdocs', function(data) {
		for(i in data) {
			// header
			if(i == 1) {
				continue;
			}
			var line = data[i];
			var date = line[10];
			var sprintName = line[4];
			var taskName = line[6];
			var userName = line[9];
			var complete = line[11]; // not actually boolean. 1 or 0.
			var assigned = line[12]; // not actually boolean. 1 or 0.
			var hoursExpected = line[13];
			var hoursActual = line[14] || 0;
			if(ProjectDates[date]) {
				ProjectDates[date]['ActualHours'] += hoursActual;
				ProjectDates[date]['ExpectedHours'] += hoursExpected;
				ProjectDates[date]['Tasks'] += 1;
				ProjectDates[date]['Complete'] += complete;
				ProjectDates[date]['Assigned'] += assigned;
			} else {
				ProjectDates[date] = {
					'ActualHours': hoursActual || 0,
					'ExpectedHours': hoursExpected || 0,
					'Tasks': 1,
					'Complete': complete || 0,
					'Assigned': assigned || 0
				}
			}

			if(sprintNames.indexOf(sprintName) < 0) {
				sprintNames.push(sprintName);
			}
			if(userNames.indexOf(userName) < 0) {
				userNames.push(userName);
			}

			if(ProjectDevs[userName]) {
				if(ProjectDevs[userName][sprintName]) {
					ProjectDevs[userName][sprintName] += 1;
				} else {
					ProjectDevs[userName][sprintName] = 1;
				}
			} else {
				ProjectDevs[userName] = {};
				ProjectDevs[userName][sprintName] = 1;
			}

			if(ProjectSprints[sprintName]) {
				if(ProjectSprints[sprintName][userName]) {
					ProjectSprints[sprintName][userName] += 1;
				} else {
					ProjectSprints[sprintName][userName] = 1;
				}
			} else {
				ProjectSprints[sprintName] = {};
				ProjectSprints[sprintName][userName] = 1;
			}

		}
		drawMulti(ProjectDates);
		for(var j in sprintNames) {
			sname = sprintNames[j];
			var h = "<a href='#' class='sprintLink' data-sprint-name='" + sname + "'>" + sname + "</a><br>";
			$("#sprintNameContainer").append(h);
		}

		$('.sprintLink').on('click', function(evt) {
			evt.preventDefault();
			var sprintName = $(this).attr('data-sprint-name');
			drawSprint(sprintName);
		});
		drawSprint(sprintNames[0]);

		for(var j in userNames) {
			uname = userNames[j];
			var h = "<a href='#' class='devLink' data-user-name='" + uname + "'>" + uname + "</a><br>";
			$("#devNameContainer").append(h);
		}
		$('.devLink').on('click', function(evt) {
			evt.preventDefault();
			var userName = $(this).attr('data-user-name');
			drawUser(userName);
		});
		drawUser(userNames[0]);
	});
}

function drawMulti(data) {
	var dates = [];
	var hoursActual = [];
	var hoursExpected = [];
	var assignmentsComplete = [];
	var assignments = [];
	var tasks = [];
	for(key in data) {
		dates.push(key);
		hoursActual.push(data[key]['ActualHours']);
		hoursExpected.push(data[key]['ExpectedHours']);
		//assignmentsComplete.push(data[key]['Complete']);
		//assignments.push(data[key]['Assigned']);
		tasks.push(data[key]['Tasks']);
	}

	$('#multiChartContainer').highcharts({
		chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Some Stuff'
        },
        xAxis: [{
            categories: dates,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Assignments',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Hours',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true,
            min: 0
        }, { // Tertiary yAxis
            title: {
                text: null,
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true,
            min: 0
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Tasks',
            type: 'column',
            data: tasks,
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Actual Burn',
            type: 'spline',
            yAxis: 1,
            data: hoursActual,
            tooltip: {
                valueSuffix: ' hours'
            }
        }, {
            name: 'Expected Burn',
            type: 'spline',
            yAxis: 1,
            data: hoursExpected,
            tooltip: {
                valueSuffix: ' hours'
            }
        }]
	});
	// dates as x
	//foreach date...
		//actual hours
		// expected hours
		// # complete for each sprint
}

function drawSprint(sprintName) {
	var sprints = [];
	for(var i in ProjectSprints[sprintName]) {
		var sprint = {};
		sprint['name'] = i;
		sprint['y'] = ProjectSprints[sprintName][i];
		sprints.push(sprint);
	}
	$('#sprintNamePieContainer').highcharts({
		chart: {
			type: 'pie'
		},
		title: {
			text: 'Sprint ' + sprintName + ' Breakdown'
		},
		series: [{
			name: 'Tasks',
			colorByPoint: true,
			data: sprints
		}]
	});

}

function drawUser(userName) {
	var users = [];
	for(var i in ProjectDevs[userName]) {
		var user = {};
		user['name'] = i;
		user['y'] = ProjectDevs[userName][i];
		users.push(user);
	}
	$('#devNamePieContainer').highcharts({
		chart: {
			type: 'pie'
		},
		title: {
			text: 'Sprints by User (' + userName + ')'
		},
		series: [{
			name: 'Tasks',
			colorByPoint: true,
			data: users
		}]
	});
}

getData();
// ProjectData = function(row) {

// }

// $('#container').highcharts({

//     xAxis: {
//         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//     },

//     series: [{
//         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//     }]

// });
