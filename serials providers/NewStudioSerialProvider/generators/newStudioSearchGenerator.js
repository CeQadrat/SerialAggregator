const searchParser = require('../parsers/newStudioSearchParser');
const getPage = require('../getPageRequest');

module.exports = function* getSerial(path) {
    let series = [];
    do {
        let body = yield getPage(path);
        let data = searchParser.parse(body);
        path = data.nextPageLink;
        series = series.concat(data.episodeList);
    } while (path);
    let episodes = [];
    for (let ser of series) {
        if (!episodes.length) {
            episodes.push(ser);
            continue;
        }
        let lastEpisode = episodes[episodes.length - 1];
        if (lastEpisode.season == ser.season && lastEpisode.series == ser.series) {
            lastEpisode.links = lastEpisode.links.concat(ser.links);
        } else {
            episodes.push(ser);
        }
    }
    return episodes;
};
