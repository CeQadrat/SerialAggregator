const episodeParser = require('../parsers/newStudioEpisodeParser');
const getPage = require('../getPageRequest');
const co = require('co');

module.exports = function* getEpisode(series) {
    for (let episode of series) {
        yield new Promise((resolve, reject) => {
            co(function*() {
                let series = {};
                let torrentLinks = [];
                for (let link of episode.links) {
                    let page = yield getPage(link);
                    let ep = episodeParser.parse(page);
                    for (let key in ep) {
                        if (!series[key] && key != 'torrentLinks') {
                            series[key] = ep[key];
                        }
                    }
                    torrentLinks = torrentLinks.concat(ep.torrentLinks);
                }
                series.links = {
                    linksToWatch: null,
                    torrentLinks
                };
                return series;
            })
                .then((episode) => resolve(episode))
                .catch(reject);
        });
    }
};
