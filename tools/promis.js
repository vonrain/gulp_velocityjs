var promise = require('bluebird');
var http = require('http');

module.exports = {

    get:function (url) {

        return new promise(function (resolve, reject) {

            var req = http.get(url, function (res) {

                var data = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve(JSON.parse(data));
                });
                req.on('error', function (err) {
                    reject(err);
                })
                req.end();
            })
        });
    }
};