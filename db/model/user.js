const mongoose = require('mongoose');

let User = new mongoose.Schema({
    providerId: String,
    token: String,
    name: String,
    cover: String,
    gender: String,
    profileUrl: String,
    provider: String
});

User.methods.validPassword = function(password) {
    return (password == this.password);
};

User.methods.hashPassword = function(password) {
    console.log('hash');
};

module.exports = mongoose.model('User', User);