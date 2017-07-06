const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const socket = require('socket.io');
const http = require('http');


const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const compiler = webpack(config);
const io = socket(server);

// use webpack-dev, and webpack-hot middleware for hot reloading
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


// setup paths and express routing
const indexPath = path.join(__dirname, 'src', 'index.html');
const distPath = express.static(path.join(__dirname, 'dist'));

app.use('/dist', distPath);
app.get('/', function(req, res) { res.sendFile(indexPath) });


/****************************************************************
*                          Socket.io
****************************************************************/
io.on('connection', (socket) => {
  console.log('new socket on server');
});


// start server
server.listen(port, function(err) {
  if (err) {
    console.log('error', err);
  } else {
    console.log(`Server running at http://localhost:${port}`);
  }
});
