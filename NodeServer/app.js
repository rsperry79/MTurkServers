'use strict';
let debug = require('debug');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

const appInsights = require('applicationinsights');
appInsights.setup('84a8915c-b2b1-4afc-a2d2-bbd9c5e23a09');
appInsights.start();    

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${server.address().port}`);
});
