const Strategy = require('passport-google-oauth20').Strategy;
const config = require('../config/config');
const UserModel = require('../db/model/user');

module.exports = (passport) => {
    passport.use(new Strategy({
            clientID: config.get('oauth:google:clientId'),
            clientSecret: config.get('oauth:google:clientSecret'),
            callbackURL: config.get('oauth:google:callbackURL')
        },
        function(accessToken, refreshToken, profile, done) {
            UserModel.findOne({
                'providerId': profile.id,
                'provider': profile.provider
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    console.log('Create new '+profile.provider+' user');
                    user = new UserModel({
                        providerId: profile.id,
                        token: accessToken,
                        name: profile.displayName,
                        cover: profile.photos[0].value,
                        gender: profile.gender,
                        profileUrl: profile._json.url,
                        provider: profile.provider
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
