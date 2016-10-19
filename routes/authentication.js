const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    console.log('Sign in with '+req.query.provider);
    res.jsonp(true);
});

router.get('/logout', (req, res, next) => {
    console.log('Logout');
    res.jsonp(true);
});

module.exports = router;