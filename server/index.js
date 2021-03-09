//=============== DEPENDENCIES ===============//
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();

//=============== INITIALIZE EXPRESS APP & SETUP FOR DATA PARSING===============//
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//=============== AUTHENTICATION PACKAGES ===============//
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');

//=============== DATABASE PACKAGES & CONFIG ===============//
const mongoose = require('mongoose');
const configDB = require('./config/keys.js');
// const users = require('./models/Users');
mongoose.Promise = Promise;
mongoose.connect(configDB.mongoURI, {  useUnifiedTopology: true, useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

const MongoClient = require('mongodb').MongoClient;
const uri = require('./config/keys.js')
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("sourceryDB").collection("users");
  // perform actions on the collection object
  client.close();
});

//=============== PASSPORT CONFIGURATION ===============//
require('./config/passport')(passport) //pass passport for configuration

//=============== AUTHENTICATION SETUP ===============//
app.use(cookieParser());

app.use(session({
    secret: 'sdlfkjdlajsdoijajk',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//=============== SERVE STATIC ASSETS ===============//
// app.use(express.static(path.resolve(__dirname, "..", 'build')));


  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'build')));
// Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });


//=============== ROUTES SETUP ===============//
require('./app/routes.js')(app, passport) //load our routes and pass in our app and fully configured passport
require('./app/githubRoutes.js')(app)
require('./app/testRoutes.js')(app)

//=============== API ROUTES ===============//
app.get("/api/test", (req, res) => res.json({id:1, first:'hello', last:'world'}));
// Always return the main index.html, so react-router render the route in the client
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});




//=============== STARTING THE SERVER ===============//
const server = app.listen(port, () => console.log("App listening on PORT " + port));
require("./sockets")(server)