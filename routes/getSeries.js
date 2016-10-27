const express = require('express');
const router = express.Router();
const ColdFilmSP = require('../serials providers/ColdFilmSP/coldFilmSerialProvider');
const LostFilmSP = require('../serials providers/LostFilmSerialProvider/LostFilmSerialProvider');
const NewStudioSP = require('../serials providers/NewStudioSerialProvider/NewStudioSerialProvider');

module.exports = function (generators) {
    router.get('/', (req, res) => {
        let provider;
        if(req.query.provider == 'coldfilm') provider = new ColdFilmSP(req.query.serialName);
        if(req.query.provider == 'lostfilm') provider = new LostFilmSP(req.query.serialName);
        if(req.query.provider == 'newstudio') provider = new NewStudioSP(req.query.serialName);
        provider.init().then(() => {
            generators[req.session.id] = provider.getSeries();
            generators[req.session.id].next().value.then((episode) => {
                res.jsonp(episode);
            });
        }).catch((message) =>{
            res.jsonp({
                error: message
            });
        });
    });

    router.get('/next', (req, res) => {
        generators[req.session.id].next().value.then((episode) => {
            res.jsonp(episode);
        });
    });
    return router;
};
