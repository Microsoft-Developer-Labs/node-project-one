//Libraries
const express = require('express');
const app = express(); //Loads the commands from the package express
const bodyParser = require('body-parser'); //Processes requests from users
//const mssql = require('mssql'); This is commented out unless you got our SQL server.
const mysql = require('mysql'); //The database
const https = require('https'); //For SSL
const fs = require('fs'); //Reading files (for SSL)
const passport = require('passport');
const flash = require('connect-flash');
const Strategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Creating the connection to MySQL server.
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "enterpasshere",
  database: "enterdbnamehere"
});

//Connecting to MySQL server.
con.connect(function(err) {
  if (err) throw err; //If theres an error, cause an error.
  console.log('Connected to the MySQL server successfully.'); //Displays this message if successfully connected.
});

//Setting up passport strategy stuff here
passport.use(new Strategy({ //As there's no name for this strategy, the default is 'local'.
    usernameField: 'username', //Name of the username name field in the pug file.
    passwordField: 'password', //Name of the password name field in the pug file.
    passReqToCallback: true //Passes the request to the callback.
  },
  function(req, username, password, done) { //This is where you connect the database stuff
    con.query("SELECT * FROM enteryourtablehere WHERE Username='" + username + "' AND Password='" + password + "'", function(err, result) {
      if (err) return done(err); //If theres an error, cause an error.
      if (!result.length) { //If there isn't a resulted length.
        return done(null, false); //Returns no user.
      }
      if (!(result[0].password == password)) { //If the passwords don't equal.
        return done(null, false); //Returns no user
      }
      return done(null, result[0]); //Returns the user.
    });
  }
));

//Passport user authenticating
passport.serializeUser(function(user, done) { //This serializes the user so that the website knows their logged in.
  done(null, user.id); //Returns the user with an ID.
});

passport.deserializeUser(function(id, done) { //This makes sure the user is logged out.
  if (err) return done(err); //If there's an error, cause it.
  done(null, user); //Return the user.
});

//Setting the view engine
app.set('view engine', 'pug'); //Since pug is easier to read. You can change this at any time.

//Using libraries & folders
app.use(bodyParser()); //This calls Body Parser middleware for express.
app.use(flash()); //For Passport.js middleware for flashing messages.
app.use(cookieParser()); //For cookies in Passport.
app.use("/ssl", express.static(__dirname + '/ssl')); //Uses the folder SSL for SSL certificates.
app.use("/stylesheets", express.static(__dirname + '/stylesheets')); //Uses the folder Stylesheets for CSS files.
app.use(passport.initialize()); //Initializes the passport middleware for express.
app.use(passport.session()); //Uses the sessions for passport in express.

//Web Pages
app.get('/', function(req, res) {
  res.render('home'); //Makes the home page visible.
});

app.post('/verify', passport.authenticate('local', { failureRedirect: '/' }), function(req,res) {
  res.redirect('/home'); //Redirects you when you have a successful login.
});

app.get('/logout', function(req, res) {
  req.logout(); //Signs out the user.
  res.redirect('/'); //Redirects to the root directory.
});

app.get('/home', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  res.render('home/panel', { user: req.body.username }); //Makes the home directory panel visible with a variable passed through it.
});

//Listening on the http port (NOT RECOMMENDED IF PUBLISHING THIS PROJECT)
app.listen(80); //Listening on the default web port 80.

/* HTTPS Port (NOTE: If this is active, either move app.listen to a different port or delete app.listen(80))!
https.createServer({
  Key: enterKeyVarHere,
  Cert: enterCertVarHere
  CA: OptionalCAVarHere
}, app).listen(80);*/
