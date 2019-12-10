let http = require('http');

// File system module
let fs = require('fs');

http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);


// See
// https://stackoverflow.com/questions/19926787/how-to-execute-external-javascript-file-in-html-using-node-js
// https://stackoverflow.com/questions/17722407/how-to-include-javascript-on-client-side-of-node-js/21866785#21866785
