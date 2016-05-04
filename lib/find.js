'use strict';

const request = require('request');

module.exports = (text) => {
	request
		.get('http://10.1.2.42:8080/users', (error, response, body) => {
			if (error) {
				return console.log(`Server can't be reached`);
			}

			const users = JSON.parse(body);

			for (let i = 0; i < users.length; i++) {
				if (users[i].Name.toLowerCase().match(text)) {
					console.log(`[${JSON.parse(body)[i].Userid}] ${JSON.parse(body)[i].Name}`);
				}
			}
		});
};
