var express = require('express')
    , routes = require('./routes'),
    errorHandler = require('express-error-handler'),
    HttpError = require('error').HttpError,
    config = require('config'),
    log = require('libs/log')(module),
    mongoose = require("libs/mongoose"),
    expressLayouts = require('express-ejs-layouts'),
    MongoStore = require('connect-mongo')(express);
var app = module.exports = express.createServer();


// Configuration

app.configure(function () {
    app.set('views', __dirname + '/template');
    app.set('view engine', 'ejs');
    app.set('layout', 'layout'); // defaults to 'layout'
    app.use(expressLayouts);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.get('session:secret'),
        key: config.get('session:key'),
        cookie : config.get('session:cookie'),
        store: new MongoStore({mongooseConnection: mongoose.connection})
    }));
    app.use(require('middleware/sendHttpError'));
    //app.use(express.session({secret: 'your secret here'}));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

require('routes')(app);

app.use(function (err, req, res, next) {

    if (typeof err == 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        console.log('instanse');
        res.sendHttpError(err)
    } else {
        console.log('not instanse');
        express.errorHandler()(err, req, res, next);
    }
});

app.listen(config.get('port'), function () {
    log.info("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
