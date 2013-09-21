var http = require('http'),
    https = require('https'),
    bupper = require('bupper');

module.exports = function GET(url, callback, onError) {
  url = url.indexOf('http') === 0 ? url : 'http://' + url;

  var protocol = url.indexOf('https') === 0 ? https : http;
  var timeout = 5000;

  var req = protocol.get(url, function (res) {
    if (res.statusCode === 301) return GET(res.headers.location, callback, onError);

    if (res.statusCode !== 200) return onError(new Error('not Ok'));

    res.on('data', function (chunk) {
      bupper.add(chunk);
    });

    res.on('end', function () {
      callback(bupper.combine().toString());
    });

    res.on('error', onError);
  }, onError);

  req.on('error', onError);

  setTimeout(function () {
    req.end();
    req.abort();
  }, timeout);
}
