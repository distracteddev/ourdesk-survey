// Setup express, socket.io, and http server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var switchboard = require('switchboard-core');

io.set('log level', 1);

// Configure bone.io options
var bone = require('bone.io');
bone.set('io.options', {
    server: io
});

// Serves bone.io browser scripts
app.use(express.static('app'));
app.use(bone.static());

// Listen up
server.listen(process.env.PORT || 7076);

/*
 * Build Mongoose Model
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , format = require('util').format;

var options = {};

var host = options.host || '127.0.0.1'
, port = options.port ||  27017
, db   = 'test';

var conn = mongoose.createConnection(format('mongodb://%s:%s/%s', host, port, db));

var Message = conn.model('Incoming', new Schema({
	agentId: {type: String, required: true},
	payload: {type: Schema.Types.Mixed}
}), 'ourdesk');

/*
 * Setup bone.io
 * http://bone.io
 */

var Server = bone.io('ourdesk', {
    outbound: {
        routes: ['results', 'newbox'],
    },
    inbound: {
        search: function(data, context) {
        var self = this;
        var time = process.hrtime();
        console.log('RUNNING SEARCH', time);
         Message.find({agentId: 'ourdesk:twitter'}, function (err, docs) {
         	console.log('end', process.hrtime(time));
         	self.results(docs);
         });
        }
    }
});

/*
 * Hook into switchboard
 */


var switchboard = require('switchboard-core');

var uri    = 'switchboard.chloi.io'
  , client = switchboard.connect(uri)
  , sub    = client.socket('sub')
  , pub    = client.socket('pub');



sub.subscribe('ourdesk', function(data) {
  console.log('newbox');
  Server.newbox(data);
});

console.log('Ourdesk Survey Server Started');


// console.log('Starting Twitter Agent')
// require('./twitterAgent');





