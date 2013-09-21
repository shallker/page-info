var cheerio = require('cheerio');

exports = module.exports = function (html) {
  var $ = cheerio.load(html);

  var page = function () {
    return this;
  }.call({});

  page.icon = function () {
    var $els = $('link[rel="icon"]');
    return $els.length ? $els.attr('href') : undefined;
  }

  page.shortcutIcon = function () {
    var $els = $('link[rel="shortcut icon"]');
    return $els.length ? $els.attr('href') : undefined;
  }

  page.title = function () {
    return $('title').text();
  }

  page.description = function () {
    return $('meta[name="description"]').attr('content');
  }

  page.thumbnail = function () {
    var srcs = []

    $('body img').each(function (i, item) {
      srcs.push($(item).attr('src'));
    });

    for (var i = 0; i < srcs.length; i++) {
      if (srcs[i].match(/\.(jpg|jpeg|png|gif)$/)) return srcs[i];
    }

    return undefined;
  }

  return page;
}

exports.regex = function (html) {
  var page = function () {
    return this;
  }.call(Object.create(new String(html)));

  page.shortcutIcon = function (callback) {
    var regex = /<link rel=['"]shortcut icon['"] href=['"](.*)['"] \/>/;
    var match = html.match(regex);
    return match && match[1];
  }

  page.icon = function (callback) {
    var regex = /<link rel=['"]icon['"] href=['"](.*)['"] \/>/;
    var match = html.match(regex);
    return match && match[1];
  }

  page.title = function (callback) {
    var regex = /<title>(.*)<\/title>/;
    var match = html.match(regex);
    return match && match[1];
  }

  page.description = function (callback) {
    var regex = /<meta name=['"]description['"] content=['"](.*)['"]\/>/;
    var match = html.match(regex);
    return match && match[1];
  }

  page.thumbnail = function (callback) {

  }

  return page;
}