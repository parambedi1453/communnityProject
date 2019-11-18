if(process.env.NODE_ENV !=='production')
{
    require('dotenv').config()
}

var express = require('express')
var path = require('path')
var ejs = require('ejs')
var session = require('express-session')
var nodemailer = require('nodemailer')
var multer = require('multer')
var passport = require('passport')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret: "abc"}))

//var session = require('express-session');
//Acces static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/uploads')));

//Bodyparser
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret: "xYzUCAchitkara"}));


// const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser : true
})


mongoose.connection.on('error',(err) => {
    console.log('DB connection Error');
  })

  mongoose.connection.on('connected',(err) => {
    //  useNewUrlParser: true;
    console.log('DB connected');
  })


//ROUTES requiring
const indexRouter = require('./routes/index')



// using routes
app.use('/',indexRouter)


app.listen(5000, ()=> console.log('server started'))