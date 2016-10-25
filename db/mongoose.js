const mongoose = require('mongoose');
const config = require('../../../config/config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', (err) => {
    console.error('connection error:', err.message);
});
db.once('open', () => {
    console.info("Connected to DB!");
});

let User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

User.virtual('userId')
    .get(() => {
        return this.id;
    });

const UserModel = mongoose.model('User', User);

const AccessToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const AccessTokenModel = mongoose.model('AccessToken', AccessToken);

