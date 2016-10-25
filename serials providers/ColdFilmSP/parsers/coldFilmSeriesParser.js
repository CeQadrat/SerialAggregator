const htmlParser = require('htmlparser2');
const url = require('url');

module.exports = {
    parse(page){
        let {serialCover, sourceLinks, torrentLinks} = this._parse(page);
        if(sourceLinks.length == 0) sourceLinks = null;
        if(torrentLinks.length == 0) torrentLinks = null;
        return {serialCover, sourceLinks, torrentLinks}
    },
    _parse(page){
        let enableParse = false;
        let enableParseTorrentLink = false;

        let serialCover = '';
        let sourceLinks = [];
        let torrentLinks = [];
        let torrent = {};

        let parser = new htmlParser.Parser({
            onopentag: (name, attribs) => {
                if (name === "td" && attribs.class === "eMessage") {
                    enableParse = true;
                }
                if (name === 'img' && enableParse) {
                    serialCover = attribs.src;
                }
                if (name === "iframe" && enableParse) {
                    if (attribs.src.indexOf('http') == -1) attribs.src = 'http:' + attribs.src;
                    sourceLinks.push({
                        link: attribs.src,
                        info: url.parse(attribs.src).hostname
                    });
                }
                if (name === 'a' && enableParse) {
                    enableParseTorrentLink = true;
                    torrent.link = attribs.href;
                }
            },
            ontext: (text) => {
                if (enableParseTorrentLink) {
                    torrent.info = text;
                }
            },
            onclosetag: (tagname) => {
                if (tagname === "td" && enableParse) {
                    enableParse = false;
                }
                if (tagname === "a" && enableParseTorrentLink) {
                    enableParseTorrentLink = false;
                    torrentLinks.push(torrent);
                    torrent = {};
                }
            }
        }, {decodeEntities: true});
        parser.write(page);
        parser.end();
        return {
            serialCover,
            sourceLinks,
            torrentLinks
        };
    }
};
