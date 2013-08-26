var TwitterAgent = require('api-agents').twitter

var options = {
	channel: 'ourdesk',
	apiKey: 'ZhWuXSBGNjvjZP05d6HQ',
	apiSecret: 'xVdSvw8mCqWA4HHXkZeo1y2xs9U4h9ezY0QzbsVQLM'
};

var queryOpts = {
	queries: [
		{
			type: 'tag',
			value: 'WhatIMissAboutSchool'

		}
	]
}

var agent = new TwitterAgent(options).query(queryOpts)