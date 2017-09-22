const request = require('superagent');
const pinboardExport = require('./pinboard_export.json');
const everyLimit = require('async/everyLimit');

// Set env variables
require('dotenv').config();
const simultaneousRequestLimit = Number(process.env.ARENA_SIMULTANEOUS_REQUESTS);

// Count for later
let currentBookmark = 0;

// Give some feedback
console.log(`Adding ${pinboardExport.length} bookmarks...`);

// Loop through pinboard bookmarks and add as blocks
everyLimit(pinboardExport, simultaneousRequestLimit, (bookmark, callback) => {
	request.post(`http://api.are.na/v2/channels/${process.env.ARENA_CHANNEL}/blocks`)
		.set({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.ARENA_ACCESS_TOKEN})
		.send({source: bookmark.href})
		.end((err, res) => {
			if (err) {
				callback(err);
			} else {
				// Give some feedback
				currentBookmark++;
				console.log(`[${currentBookmark}/${pinboardExport.length}] - ${bookmark.href}`);
				callback(null, !err);
			}
		})
}, err => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Successfully added ${currentBookmark} bookmarks.`);
	}
})