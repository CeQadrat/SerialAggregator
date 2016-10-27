const co = require('co');
const getPage = require('./getPageRequest');
const serialListParser = require('./parsers/newStudioSerialListParser');
const searchGenerator = require('./generators/newStudioSearchGenerator');
const seriesGenerator = require('./generators/newStudioSeriesGenerator');

module.exports = class NewStudioSP {
    constructor(serialName) {
        this.serialName = serialName;
    }

    init() {
        let self = this;
        let findSerial = false;
        return new Promise((resolve, reject) => {
            getPage('http://newstudio.tv/')
                .then((body) => {
                    for (let serial of serialListParser.parse(body)) {
                        if (serial.name.toLowerCase() == self.serialName) {
                            findSerial = true;
                            co(searchGenerator(serial.link)).then((series) => {
                                self.series = series;
                                resolve();
                            }).catch(reject);
                        }
                    }
                    if(!findSerial) reject('Serial not found');
                })
                .catch(reject);
        });
    }

    getSeries() {
        return seriesGenerator(this.series);
    }
    getInfo(){
        return {
            provider: 'newstudio.tv'
        }
    }
};
