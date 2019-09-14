// How could we run everything on the client-side only, without
//  having to upload the images to anything?
// Create a tiny local server on the user's device and
//  "upload" the image there?
// Or, upload all the content to a server we own?

// RIP xhttp error how to test local images?
// SEE: https://security.stackexchange.com/questions/190266/why-chrome-blocks-ajax-locally

// let image = document.getElementById('image');
// let image = 's16.png';
let image = 'https://raw.githubusercontent.com/mrvivacious/CS397_SearchableSlides/master/s16.png';

const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();

worker
  .recognize(image)
  .progress((p) => {
    let dialog = p.status + ': ' + p.progress;
    document.getElementById('outputText').innerText = dialog;
    // console.log(p)
  })
  .then(({ text }) => {
    document.getElementById('outputText').innerText = text;
    worker.terminate();
  });
