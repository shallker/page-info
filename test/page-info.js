var PageInfo = require('../index');

var google = 'google.com';
var baidu = 'www.baidu.com';
var designmodo = 'http://designmodo.com/long-shadows-design/';
var url = baidu;

PageInfo.info(url, function (result) {

  console.log('result', result)

  // console.log('title', page.title())
  // console.log('icon', page.icon())
  // console.log('shortcutIcon', page.shortcutIcon())
  // console.log('description', page.description())
  // console.log('thumbnail', page.thumbnail())

}, function (err) {
  console.log('err', err);
});
