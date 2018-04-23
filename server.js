var {createServer} = require('http');
var express = require('express');
var compression = require('compression');
var morgan = require('morgan'); 
var path = require('path');
var bodyParser = require('body-parser');
var timelinelist = require('./timelinelist');

var normalizePort = port => parseInt(port, 10);
var PORT = normalizePort(process.env.PORT || 5000);

var app = express();
var dev = app.get('env') !== 'production';

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/api/tweets', function(req, res){
	var clientName = req.body.name;
	timelinelist(res, clientName)
});

if (!dev) {
	app.disable('x-powered-by')
	app.use(compression());
	app.use(morgan('common'))

	app.use(express.static(path.resolve(__dirname, 'build')))

	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
	})
}

if (dev) {
	app.use(morgan('dev'))
	app.use(express.static(path.resolve(__dirname, 'public')))
}

var server = createServer(app)

server.listen(PORT, function(err) {
	if (err) throw err;

	console.log('server started on PORT' + PORT)
} )