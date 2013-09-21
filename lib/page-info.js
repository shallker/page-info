var GET = require('./get'),
    Page = require('./page'),
    Url = require('url');

exports.info = function (url, callback, onError) {
  url = url.indexOf('http') === 0 ? url : 'http://' + url;
  url = url.trim();
  url = url.replace(/\/*$/, '');
  url = Url.parse(url);

  function isRelative(address) {
    return address.indexOf('http') === 0 ? false : true;
  }

  function fullRootAddress(address) {
    if (!isRelative(address)) return address;
    address = address.replace(/^\/*/, '');
    return url.protocol + '//' + url.host + '/' + address;
  }

  GET(url.href, function (html) {
    var page = Page.call(this, html);

    var result = {
      title: page.title(),
      description: page.description(),
      thumbnail: page.thumbnail(),
      icon: page.icon(),
      shortcutIcon: page.shortcutIcon(),
      favicon: fullRootAddress('/favicon.ico')
    }

    if (result.icon) result.icon = fullRootAddress(result.icon);
    if (result.thumbnail) result.thumbnail = fullRootAddress(result.thumbnail);
    if (result.shortcutIcon) result.shortcutIcon = fullRootAddress(result.shortcutIcon);

    callback(result);
  }, onError);
}
