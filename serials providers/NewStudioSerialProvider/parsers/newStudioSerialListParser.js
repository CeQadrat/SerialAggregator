const htmlParser = require('htmlparser2');

module.exports = {
    parse(page){
        return this._parse(page);
    },
    _parse(page){
        let enableParse = false;
        let enableParseSerial = false;
        let serial = {};
        let allSerials = [];
        let parser = new htmlParser.Parser({
            onopentag: (name, attribs) => {
                if (name == 'div' && attribs.id == 'serialist') {
                    enableParse = true;
                }
                if (name == 'a' && !attribs.class && enableParse) {
                    serial.link = 'http://newstudio.tv' + attribs.href;
                    enableParseSerial = true;
                }
                if (name == 'div' && attribs.class == 'container-fluid') {
                    enableParse = false;
                }
            },
            ontext: (text) => {
                if (enableParseSerial) {
                    serial.name = text;
                }
            },
            onclosetag: (tagname) => {
                if (tagname == 'a' && enableParseSerial) {
                    enableParseSerial = false;
                    allSerials.push(serial);
                    serial = {};
                }
            }
        }, {decodeEntities: true});
        parser.write(page);
        parser.end();
        return allSerials;
    }
};
