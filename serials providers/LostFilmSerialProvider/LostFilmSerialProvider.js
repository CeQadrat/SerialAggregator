const searchParser = require('./parsers/lostFilmSearchParser');
const serialParser = require('./parsers/lostfilmSerialParser');
const getPage = require('./generators/getPageRequest');
const seriesGenerator = require('./generators/lostFilmSeriesGenerator');

module.exports = class LostFilmSP{
    constructor(serialName){
        this.serialName = serialName;
    }
    init(){
        let self = this;
        let findSerial = false;
        return new Promise((resolve,reject) => {
            getPage('http://www.lostfilm.tv/serials.php')
                .then((body) => {
                    for (let serial of searchParser.parse(body)){
                        if(serial.name.toLowerCase() == self.serialName){
                            findSerial = true;
                            getPage('http://www.lostfilm.tv/browse.php?cat='+serial.code)
                                .then((body) => {
                                    self.series = serialParser.parse(body);
                                    resolve();
                                })
                                .catch(reject);
                        }
                    }
                    if(!findSerial) reject('Serial not found');
                })
                .catch(reject);
        });
    }
    getSeries(){
        return seriesGenerator(this.series);
    }
    getInfo(){
        return {
            provider: 'lostfilm.tv'
        }
    }
};