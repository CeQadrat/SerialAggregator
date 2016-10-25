const config = require('../config/config');

module.exports = (mongoose) => {
    mongoose.connect(config.get('mongoose:uri'));
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;

    db.on('error', (err) => {
        console.error('connection error:', err.message);
    });
    db.once('open', () => {
        console.info("Connected to DB!");
    });
};
