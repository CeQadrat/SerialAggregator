const htmlParser = require('htmlparser2');

module.exports = {
    parse(page){
        return this._parse(page);
    },
    _parse(page){
        let enableParse = false;
        let enableParseText = false;
        let link;
        let nextPageLink = null;
        let episodeList = [];
        let episode = {};
        let parser = new htmlParser.Parser({
            onopentag: (name, attribs) => {
                if (name == 'div' && attribs.class == 'span7') {
                    enableParse = true;
                }
                if (name == 'a' && enableParse) {
                    enableParseText = true;
                    episode.links = ['http://newstudio.tv' + attribs.href.slice(1)];
                }
                if (name == 'a') {
                    link = attribs.href;
                }
            },
            ontext: (text) => {
                if (enableParseText) {
                    text = text.split('(')[1].split(')')[0];
                    let buf = text.split(' ');
                    episode.season = buf[3] ? buf[1].slice(0, -1) : buf[1];
                    episode.series = buf[3] ? buf[3] : null;
                }
                if (text == 'След.') {
                    nextPageLink = 'http://newstudio.tv/' + link;
                }
            },
            onclosetag: (tagname) => {
                if (tagname == 'a' && enableParseText) {
                    enableParseText = false;
                    enableParse = false;
                    episodeList.push(episode);
                    episode = {};
                }
            }
        }, {decodeEntities: true});
        parser.write(page);
        parser.end();
        return {
            episodeList,
            nextPageLink
        };
    }
};
