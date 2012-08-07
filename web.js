/* Module dependencies */

var express = require('express');

/* Application set-up */

var app = module.exports = express.createServer();

/* Configuration */

app.configure(function () {
    app.use('/public', express.static(__dirname + '/public'));
});

/* Environment-specific configuration */

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

/* Routes */

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/:path', function (req, res) {
    res.sendfile(req.params.path);
});

/* Start server */

app.listen(5000);
console.log('Server running listening on port %d in %s mode', app.address().port, app.settings.env);
