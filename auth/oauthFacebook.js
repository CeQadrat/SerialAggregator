const Strategy = require('passport-facebook').Strategy;
const config = require('../config/config');
const UserModel = require('../db/model/user');

module.exports = (passport) => {
    passport.use(new Strategy({
            clientID: config.get('oauth:facebook:clientId'),
            clientSecret: config.get('oauth:facebook:clientSecret'),
            callbackURL: config.get('oauth:facebook:callbackURL'),
            profileFields: ['id', 'gender', 'link', 'displayName', 'email', 'picture']
        },
        function(accessToken, refreshToken, profile, done) {
            UserModel.findOne({
                'facebook.id': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new UserModel({
                        facebook: {
                            id: profile.id,
                            token: accessToken,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            cover: profile.photos[0].value,
                            gender: profile.gender,
                            profileUrl: profile.profileUrl
                        }
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }));
};
