var mongoose = require('mongoose');
var config = require('../config');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb);

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    avatar: String
});
var postSchema = new mongoose.Schema({
    title: String,
    desc: String,
    author: String,
    content: String,
    group: String,
    date: String,
    pv: Number
});
var groupSchema = new mongoose.Schema({
    group: {
        type: String,
        unique: true
    }
});
const models = {
    userModel: mongoose.model("user", userSchema),
    postModel: mongoose.model("post", postSchema),
    groupModel: mongoose.model("group", groupSchema)
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', function(callback) {
    console.log('mongodb is connect');
});

module.exports = models;