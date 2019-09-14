let image = document.getElementById('image').src;

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
  })
