//loading package
const express = require("express");//express
const app = express(); // creating express app
const bodyParser = require("body-parser");//middleware for requiring body inputs
const port = 3000;//server port
const route = require("./route/routes");
const proute = require("./route/proutes");//protected routes
const mongoose = require("mongoose");//establish a connection to mongodb
const config = require("./config/database");//database url
const cors = require("cors"); //cross origin
const passport = require("passport");
const morgan = require('morgan');

//logging request to console
app.use(morgan('dev'));


// passing db url
mongoose.connect(config.database, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);
// connection
mongoose.connection.on('connected', () => {
  console.log('Connected to db with url ' + config.database);
});
// error
mongoose.connection.on('error', (err) => {
  console.log('Error with connection '+ err);
});

//cross origin
app.use(cors());

// body parser use
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

//endpoint route
app.get("/api",function(req,res)
{
    res.send("hello api");
});

//to use passport
app.use(passport.initialize());
app.use(passport.session());

//importing passport.js
require('./config/passport')(passport);


// Serve static files
app.use(express.static(__dirname + '/public'));


//user routes
app.use("/users",route);

//protected route by passport middleware
app.use("/proutes", passport.authenticate('jwt', {session:false}),proute);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//port listen at 3000
app.listen(port , function(req,res)
{
    console.log("app started at port no " +  port);
});