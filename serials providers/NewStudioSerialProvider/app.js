const NewStudioSP = require('./NewStudioSerialProvider');

let provider = new NewStudioSP('мистер робот');
provider.init().then(() => {
    let generator = provider.getSeries();
    generator.next().value.then((episode) => {
        console.log(episode);
    });
}).catch(console.error);
