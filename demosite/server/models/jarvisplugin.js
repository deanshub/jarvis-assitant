// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var pluginSchema = mongoose.Schema({
        app       :String,
        type    :String,
        method   :String,
        text    :[String],
        tags    :[String]
});


// create the model for users and expose it to our app
module.exports = mongoose.model('JarvisPlugin', pluginSchema);