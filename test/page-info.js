var er = function (m) {throw new Error(m)},
    ok = function (x) {if (!x) throw new Error(x + ' is not ok'); return 1;},
    eq = function (x, y) {if (x !== y) er(x + ' not equal ' + y); return 1;},
    mc = function(ox, oy) {for (var i in ox) {if (!eq(ox[i], oy[i])) er(ox[i] + ' not match ' + oy[i])}}
    s = function (x) {eq(Object.prototype.toString.call(x), '[object String]')},
    f = function (x) {eq(Object.prototype.toString.call(x), '[object Function]')},
    a = function (x) {eq(Object.prototype.toString.call(x), '[object Array]')},
    b = function (x) {eq(Object.prototype.toString.call(x), '[object Boolean]')},
    o = function (x) {eq(Object.prototype.toString.call(x), '[object Object]')},
    log = function () {console.log.apply(console, arguments)};

var pageInfo = require('../index');

var google = 'google.com';
var baidu = 'www.baidu.com';
var designmodo = 'http://designmodo.com/long-shadows-design/';

var url = 'http://stackoverflow.com/questions/18881982/how-can-i-get-all-the-doc-ids-in-mongodb/18883039?noredirect=1#comment27890387_18883039';

pageInfo(url, function (page) {

  // log('page', page)

  log('icon', page.icon())
  log('favicon', page.favicon())
  log('shortcutIcon', page.shortcutIcon())

  log('title', page.title())
  log('description', page.description())
  // log('bodyText', page.bodyText())
  // log('firstDivText', page.firstDivText())
  // log('firstParagraphText', page.firstParagraphText())

  log('thumbnail', page.thumbnail())
  log('firstImg', page.firstImg())

}, function (err) {
  log('err', err);
});
