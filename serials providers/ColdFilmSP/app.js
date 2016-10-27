const ColdFilmSP = require('./coldFilmSerialProvider');

let provider = new ColdFilmSP('мистер робот');
provider.init().then(() => {
    let generator = provider.getSeries();
    generator.next().value.then((episode) => {
        console.log(episode);
        console.log(episode.links.torrentLinks);
        console.log(episode.links.linksToWatch);
    }).catch(console.error);
}).catch(console.error);
