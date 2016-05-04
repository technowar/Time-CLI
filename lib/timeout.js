'use strict';

const request = require('request');
const moment = require('moment');

const Timezone = new Date().getTimezoneOffset() / 60;
const LocaleTime = new Date(new Date().getTime() + Timezone * 60000 + (3600000 * 8)).toISOString();

module.exports = (userId) => {
	request
		.get('http://10.1.2.42:8080/attlogs/' + userId, (error, response, body) => {
			if (error) {
				return console.log(`Server can't be reached.`);
			}

			let dates = [];

			JSON.parse(body).forEach(data => {
				if (data.Checktime.split('T')[0] === LocaleTime.split('T')[0]) {
					return dates.push(data.Checktime);
				}
			});

			if (dates.length) {
				return TimeOut(dates[0]);
			}

			console.log(`Cannot fetch time. Check UserId.`);
		});
};

function TimeOut (TimeIn) {
	let TimeOut = new Date(TimeIn).setHours(new Date(TimeIn).getHours() - Math.abs(Timezone) + 9);
	let message = [
		'You came into the office at',
		`${moment(new Date(TimeIn).setHours(new Date(TimeIn).getHours() - Math.abs(Timezone))).format('h:mm A')}.`,
		'\nYou can leave the office by',
		`${moment(TimeOut).format('h:mm A')}.`
	];

	return console.log(message.join(' '));
}
