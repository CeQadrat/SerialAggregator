const http = require('http');
const url = require('url');
const iconv = require('iconv-lite');

module.exports = function getPage(href) {
    return new Promise((resolve, reject) => {
        let link = url.parse(href);
        let options = {
            hostname: link.hostname,
            port: 80,
            method: 'GET',
            path: link.path
        };
        let request = http.request(options, (res) => {
            let body = [];
            res
                .on('data', chunk => body.push(chunk))
                .on('end', () => {
                    body = Buffer.concat(body);
                    resolve(iconv.decode(body, 'utf8'));
                })
        });

        request.on('error', reject);

        request.end();
    });
};
