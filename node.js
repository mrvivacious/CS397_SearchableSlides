let http = require('http');

/////////

const extractFrames = require('ffmpeg-extract-frames');
console.log('Extracting frames I guess?');

let framesExtracted = false;

function extract() {
  extractFrames({
  // extractFrames({
    input: './video.mp4',
    // output: './frames/s%i.png',
    output: './s%i.png',
    offsets: [
      10000,
      20000,
      30000
    ]
  });
  framesExtracted = true;
  loadSite();
}

extract();

///////////

// File system module
let fs = require('fs');

function loadSite() {
  // if (!framesExtracted) {
  //
  // }

  http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }).listen(8080);
}



// See
// https://stackoverflow.com/questions/19926787/how-to-execute-external-javascript-file-in-html-using-node-js
// https://stackoverflow.com/questions/17722407/how-to-include-javascript-on-client-side-of-node-js/21866785#21866785
