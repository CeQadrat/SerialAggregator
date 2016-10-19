const express = require('express');
const router = express.Router();
const ColdFilmSP = require('../../serials providers/ColdFilmSP/coldFilmSerialProvider');
const LostFilmSP = require('../../serials providers/LostFilmSerialProvider/LostFilmSerialProvider');
const NewStudioSP = require('../../serials providers/NewStudioSerialProvider/NewStudioSerialProvider');

let generators = {};
router.get('/', function(req, res, next) {
    let provider;
    if(req.query.provider == 'coldfilm') provider = new ColdFilmSP(req.query.serialName);
    if(req.query.provider == 'lostfilm') provider = new LostFilmSP(req.query.serialName);
    if(req.query.provider == 'newstudio') provider = new NewStudioSP(req.query.serialName);
    provider.init().then(() => {
        generators[req.query.generator] = provider.getSeries();
        generators[req.query.generator].next().value.then((episode) => {
            episode.provider = req.query.provider;
            res.jsonp(episode);
        });
    });
});

router.get('/next', function(req, res, next) {
    generators[req.query.generator].next().value.then((episode) => {
        res.jsonp(episode);
    });
});

module.exports = router;