var ROOT_URL = 'https://www.msn.com/en-us/';

var Crawler = require('simplecrawler');
var crawler = new Crawler(ROOT_URL);
var cheerio = require('cheerio');
var iconv = require("iconv-lite");

crawler.interval = 60 * 1000
crawler.maxConcurrency = 1;

crawler.on('crawlstart', function() {
  console.log('Crawl starting ', ROOT_URL);
});

crawler.addFetchCondition(function(queueItem, referrerQueueItem) {
  return queueItem.path.indexOf('/news/') > -1
})

crawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {
  if (ROOT_URL == queueItem.url) return;
  // console.log('url:', queueItem.url);
  $ = cheerio.load(responseBuffer);
  var title = $('h1').html();
  console.log('news title：', title);
});

crawler.on('complete', function() {
  console.log('Finished!', ROOT_URL);
});

crawler.start();
