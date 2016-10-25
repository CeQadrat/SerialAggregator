const express = require('express');
const router = express.Router();
const passport = require('passport');

module.exports = (passport) => {
    router.get('/facebook', passport.authenticate('facebook'));

    router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/err'
        }));

    router.get('/vk', passport.authenticate('vkontakte'));

    router.get('/vk/callback',
        passport.authenticate('vkontakte', {
            successRedirect: '/',
            failureRedirect: '/err'
        }));

    router.get('/twitter', passport.authenticate('twitter'));

    router.get('/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/err'
        }));

    router.get('/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/navbar/plus.login']
    }));

    router.get('/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/err'
        }));

    router.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });
    return router;
};
