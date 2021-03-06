// Generated by CoffeeScript 1.3.3
var FeedParser, app, assets, express, parser, port, stylus;

express = require('express');

stylus = require('stylus');

assets = require('connect-assets');

FeedParser = require('feedparser');

parser = new FeedParser();

app = express();

app.use(assets());

app.use(express["static"](process.cwd() + '/public'));

app.set('view engine', 'jade');

app.get('/', function(req, resp) {
  return parser.parseUrl('http://feeds.feedburner.com/typepad/sethsmainblog', function(error, meta, articles) {
    return resp.render('index', {
      items: articles
    });
  });
});

port = process.env.PORT || process.env.VMC_APP_PORT || 3000;

app.listen(port, function() {
  return console.log("Listening on " + port + "\nPress CTRL-C to stop server.");
});
