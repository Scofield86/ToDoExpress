var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var todo = require('./my_modules/todo/todo');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/api/todolist', function (req, res) {

  fs.readFile('./data.csv', 'utf-8', function (err, data) {

    var lines = data.split('\r\n');

    var arry = [];
    lines.forEach(function (line) {
      var parts = line.split(';');
      arry.push(new todo.ToDoElement(parts[0], parts[1], parts[2]));
    });
    console.log("-----------------------------------------------------------------------");
    console.log(arry);

    // TODO: How do we set the content type we're sending back?
    res.writeHead(200, {
      'Content-Type': 'text/json; charset=utf-8'
    });

    // TODO: How do we serialize responseData to a JSON string?
    res.end(JSON.stringify(arry));

  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
