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
