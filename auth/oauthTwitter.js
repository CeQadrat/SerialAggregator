const Strategy = require('passport-twitter').Strategy;
const config = require('../config/config');
const UserModel = require('../db/model/user');

module.exports = (passport) => {
    passport.use(new Strategy({
            consumerKey: config.get('oauth:twitter:consumerKey'),
            consumerSecret: config.get('oauth:twitter:consumerSecret'),
            callbackURL: config.get('oauth:twitter:callbackURL')
        },
        function(token, securityToken, profile, done) {

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
                        token: token,
                        name: profile.displayName,
                        cover: profile.photos[0].value,
                        gender: null,
                        profileUrl: 'https://twitter.com/'+profile.username,
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
