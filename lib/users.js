'use strict';

const request = require('request');

module.exports = () => {
	request
		.get('http://10.1.2.42:8080/users', (error, response, body) => {
			if (error) {
				return console.log(`Server can't be reached`);
			}

			JSON.parse(body).forEach(data => {
				console.log(`[${data.Userid}] ${data.Name}`);
			});
		});
};
