// Modules
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// User model (empty, because passport presets u/p criterias)
const User = new mongoose.Schema({});

// Passport
User.plugin(passportLocalMongoose);

// Export model
module.exports = mongoose.model('User', User);