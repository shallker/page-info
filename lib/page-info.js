var Http = require('node-http'),
    encoding = require("encoding"),
    page = require('./page'),
    reges = require('reges'),
    URL = require('url');

module.exports = function pageInfo(url, callback, onError) {
  url = url.indexOf('http') === 0 ? url : 'http://' + url;
  url = url.trim();
  url = url.replace(/\/*$/, '');
  url = URL.parse(url);

  requestPage(url.href, function (htmlString) {
    callback(page.call(url, htmlString));
  }, onError);

  function requestPage(url, callback, onError) {
    var http = new Http;

    http.GET(url);

    http.on(200, function (response) {
      var responseText;
      var charset = getCharsetFromResponse(response);

      if (charset.match(reges.utf8)) {
        responseText = response.buffer.toString();
      } else {
        responseText = encoding.convert(response.buffer, 'UTF-8', charset).toString();
      }

      callback.call(this, responseText);
    });

    http.on(301, function (response) {
      requestPage(response.headers.location, callback, onError);
    });

    http.on(302, function (response) {
      requestPage(response.headers.location, callback, onError);
    });

    http.on('error', onError);
  }

  function getContentTypeFromHeaders(headers) {
    for (var k in headers) {
      if (k.match(/content-type/i)) return headers[k];
    }

    return undefined;
  }

  function getCharsetFromResponse(response) {
    var contentType = getContentTypeFromHeaders(response.headers);

    if (contentType) {
      var charset = reges.matchCharset(contentType);

      if (charset) return charset;
    }

    return reges.matchCharset(response.buffer.toString());
  }
}
