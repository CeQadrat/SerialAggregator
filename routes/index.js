const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/currentUser', (req,res) => {
    res.jsonp(req.user)
});

module.exports = router;
