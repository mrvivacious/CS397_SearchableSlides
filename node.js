// √ First extract frames
// Send each frame to Google to parse text
// Create a dictionary whilst in this function to map each word to
//  its corresponding slide
// When searching for a term, show list from the dictionary
// Click on a term to jump to that slide

const http = require('http');
const extractFrames = require('ffmpeg-extract-frames');

let searchDict = {};

// Thank you,
// https://cloud.google.com/vision/docs/ocr?apix_params=%7B%22resource%22%3A%7B%22requests%22%3A%5B%7B%22features%22%3A%5B%7B%22type%22%3A%22TEXT_DETECTION%22%7D%5D%2C%22image%22%3A%7B%22source%22%3A%7B%22imageUri%22%3A%22gs%3A%2F%2Fcloud-samples-data%2Fvision%2Focr%2Fsign.jpg%22%7D%7D%7D%5D%7D%7D
async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // NOTE: 1000 requests free per month
  // Performs text detection on the local file

  for (let i = 1; i < 9; i++) {
    let file = './frames/s' + i + '.png';

    const [result] = await client.textDetection(file);
    const detections = result.textAnnotations;

    console.log('Text:');
    console.log(detections[0].description);

    let text = detections[0].description.split(' ');

    for (let w = 0; text[w]; w++) {
      let word = text[w];

      // TODO: If duplicate, make a list
      // if (searchDict[word]) {}

      searchDict[word] = i;
    }

    // detections.forEach(text => console.log(text));
  }


  console.log('SEARCH DICT');
  console.log(Object.keys(searchDict));
  console.log(searchDict);

  // ?? How to send this searchDict into the html page?
}


quickstart();
console.log('Extracting frames I guess?');

function extract() {
  extractFrames({
  // extractFrames({
    input: './video.mp4',
    output: './frames/s%i.png',
    offsets: [
      12000,
      29000,
      42000,
      52000,
      60000,
      75000,
      93000,
      119000
    ]
  });

  loadSite();
}

// extract();
loadSite();

////

// File system module
const fs = require('fs');

function loadSite() {
  http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
    // fs.readFile('s14.png', function(err, data) {
    //   res.writeHead(200, {'Content-Type': 'image/png'});
    //   res.write(data);
    //   res.end();
    // });

  }).listen(6969);
}

// See
// https://stackoverflow.com/questions/19926787/how-to-execute-external-javascript-file-in-html-using-node-js
// https://stackoverflow.com/questions/17722407/how-to-include-javascript-on-client-side-of-node-js/21866785#21866785
