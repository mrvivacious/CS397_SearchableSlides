// How could we run everything on the client-side only, without
//  having to upload the images to anything?
// Create a tiny local server on the user's device and
//  "upload" the image there?
// Or, upload all the content to a server we own?

// RIP xhttp error how to test local images?
// SEE: https://security.stackexchange.com/questions/190266/why-chrome-blocks-ajax-locally
const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();

let imageTag = document.getElementById('image');

let blackOnWhiteImage = 'https://raw.githubusercontent.com/mrvivacious/CS397_SearchableSlides/master/s16.png';
let unclearTextImage = 'https://raw.githubusercontent.com/mrvivacious/CS397_SearchableSlides/master/s14.png';

let outputText = document.getElementById('outputText');

let button_simpleDemo = document.getElementById('simpleDemo');
let button_trickyDemo = document.getElementById('trickyDemo');

button_simpleDemo.addEventListener('click', simpleDemo);
button_trickyDemo.addEventListener('click', trickyDemo);

// Demo with a "standard" slide, ie. black text on white background
function simpleDemo() {
  getTextFromImage(blackOnWhiteImage);
}

// Demo with a slide that doesn't output text clearly,
//  in this case a slide with an image of space as the background
//  with yellow text
function trickyDemo() {
  getTextFromImage(unclearTextImage);
}

// Given a src URL, attempt to read the text from
//  the image hosted at this location
// Thank you,
// https://github.com/naptha/tesseract.js/blob/master/docs/examples.md
function getTextFromImage(imageURL) {
  imageTag.src = imageURL;

  worker
    .recognize(imageURL)
    .progress((p) => {
      let dialog = p.status + ': ' + p.progress;
      outputText.innerText = dialog;
      // console.log(p)
    })
    .then(({ text }) => {
      outputText.innerText = text;
      worker.terminate();
    });
}


// This function will output the timestamps for when the slides
//  change






/////
/////

//////////

/////
/////
/////
//////////
/////
/////
/////

/////
/////
/////
/////

/////
//////////
//////////////////////////////////// VIDEOS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let vid = document.getElementById('video');

// Thank you,
// https://stackoverflow.com/questions/20841281/videojs-getting-timestamp-of-video-dynamically
// vid.addEventListener('timeupdate', log);


// Get frame at this time ???

// Thank you,
// https://snipplr.com/view/64256/
window.onload = function() {
  let video = vid;
  let canvas = document.getElementById('canvas');

  video.addEventListener('pause', function() {
    draw(video, canvas);
  }, false);
}

function draw(video, cnv) {
  // Get the canvas context for drawing
  let context = cnv.getContext('2d');
  let img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  cnv.setAttribute('crossOrigin', 'anonymous');

  console.log(Object.keys(video));

  // Draw the video contents into the canvas x, y, width, height
  context.drawImage(video, 0, 0, cnv.width, cnv.height);

  // Get image data from canvas object
  let imgData = context.getImageData(0, 0, cnv.width, cnv.height);
  console.log('IMGDATA ==== ' + imgData);

  let dataURL = cnv.toDataURL();

  // Set the source of the image tag
  img.setAttribute('src', dataURL);

  document.getElementById('outputText').append(img);
}

function processVideo() {
  if (vid.src !== document.getElementsByTagName('input')[0].files[0].name) {
    vid.src = document.getElementsByTagName('input')[0].files[0].name;
  }

  // Can we get the frame from every 10 seconds?

  // Detect at what time the capture button was clicked
  // console.log('BUTTON CLICKED AT : ' + vid.currentTime);

  // if (!vid.paused) {
    vid.currentTime = 30;
    vid.pause();

    // Get frame
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    // Draw the video contents into the canvas x, y, width, height
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data from canvas object
    let dataURL = canvas.toDataURL();

    // Set the source of the image tag
    let img = new Image();
    img.setAttribute('src', dataURL);

    document.getElementById('outputText').append(img);

    // canvas.toBlob('image/jpeg');

    // console.log(ctx);

  // }
  // else {
  //   vid.play();
  // }

  img.width *= .25;
  img.height *= .25;
  document.getElementById('outputText').append(img);
}
