var GET = require('./get'),
    page = require('./page'),
    URL = require('url');

module.exports = function pageInfo(url, callback, onError) {
  url = url.indexOf('http') === 0 ? url : 'http://' + url;
  url = url.trim();
  url = url.replace(/\/*$/, '');
  url = URL.parse(url);

  GET(url.href, function (html) {
    callback(page.call(url, html));
  }, onError);
}
