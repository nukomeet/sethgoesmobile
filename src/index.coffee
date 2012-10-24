express = require 'express'
stylus = require 'stylus'
assets = require 'connect-assets'
FeedParser = require('feedparser')

parser = new FeedParser()

app = express()
# Add Connect Assets
app.use assets()
# Set the public folder as static assets
app.use express.static(process.cwd() + '/public')
# Set View Engine
app.set 'view engine', 'jade'

# Get root_path return index view
app.get '/', (req, resp) ->
  parser.parseUrl('http://feeds.feedburner.com/typepad/sethsmainblog', (error, meta, articles) ->
    resp.render 'index', {items: articles})

# Define Port
port = process.env.PORT or process.env.VMC_APP_PORT or 3000
# Start Server
app.listen port, -> console.log "Listening on #{port}\nPress CTRL-C to stop server."