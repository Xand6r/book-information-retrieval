var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose");
var cors=require("cors");
var session=require("express-session");
var passport=require("passport");


var bookRouter = require('./routes/books');
var usersRouter = require('./routes/users');
var requestRouter=require("./routes/requests");
const port=process.env.PORT||8081
var app = express();

// connect to local database if the laptop belongs to xander
if(process.env.USERDOMAIN=="XANDER"){
  mongoose.connect("mongodb://localhost/retrieval",{useNewUrlParser:true})
}
// otherwise connect to mlabs
else{
  mongoose.connect("mongodb://xand6r:o4kasibe@ds061196.mlab.com:61196/book_retrieval",{useNewUrlParser:true})
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setting up the middle-wares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"secret",
  resave:true,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());


// defining the routers  to use for each route
app.use('/books', bookRouter);
app.use('/users', usersRouter);
app.use('/requests',requestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port,()=>console.log(`your ${app.get("env")} server has been started on port ${port}`))

module.exports = app;
