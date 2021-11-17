// Modules
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// Components
const User = require("../models/user");

// Passport setup
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Sign up controller
exports.signup = async (req, res, next) => {

    // Check for required data
    let data = req.body;
    if(!data.username || !data.password) 
        return next(new Error('Missing data'));

    // Check for existing user
    let user = await User.exists({username: data.username});
    if(user) 
        return next(new Error('User already exists'));

    // Create new user model
    user = new User({username: data.username});
    // Set password (through hash function)
    await user.setPassword(data.password);
    // Add to database
    await user.save();

    // Response
    return res.json('Success');
    
}

// Login controller
exports.login = async (req, res, next) => {

    // Check if already logged in
    if(req.user)
        return next(new Error('Already logged in'));

    // Run passport strategy
    passport.authenticate('local', (err, user, info) => {

        // Error handling
        if (err)  
            return next(new Error(err));
        if (!user) 
            return next(new Error(info.message));

        // Save user to session
        req.logIn(user, (err) => {

            // Error handling
            if (err)
                return next(new Error(err));

            // Succeeded
            return res.json('Success');

        });

    })(req, res, next);
    
}

// Logout controller
exports.logout = async (req, res, next) => {

    // Check if not logged in
    if(!req.user)
        return next(new Error('Unauthorized'));

    // Remove user from session
    req.logout();

    // Succeeded
    return res.json('Success');
    
}

// User data controller
exports.data = async (req, res, next) => {

    // Check if not logged in
    if(!req.user)
        return next(new Error('Unauthorized'));

    // Succeeded - return user object
    return res.json(req.user);
    
}