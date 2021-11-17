// Modules
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const app = express();

// Components
const userRoutes = require('./api/routes/user');
const User = require("./api/models/user");

// Database setup
mongoose.connect(
    process.env.MONGO_URI, 
    {
      useNewUrlParser: true
    }
);
mongoose.Promise = global.Promise;

// App use
app.use(cors({credentials: true, origin: ['http://localhost:8080', 'http://localhost:8081']}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ secret: "123", resave: true, saveUninitialized: true, cookie: {maxAge: 60 * 60 * 24 * 1000} }));
// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/user", userRoutes);

// Errorhandling middleware (as last)
app.use(function(err, req, res, next) {

  if(err)
    return res.json({error: {message: err.message}});

});

// Export app
module.exports = app;