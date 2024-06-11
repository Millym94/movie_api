const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((request, response) => {
  // Log request URL and timestamp to log.txt
  const logData = `${request.url} - ${new Date().toISOString()}\n`;
  fs.appendFile('log.txt', logData, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  // Parse the request URL
  const parsedUrl = url.parse(request.url, true);

  // Determine which file to serve based on the URL
  let filePath = parsedUrl.pathname.includes('documentation') ? 'documentation.html' : 'index.html';

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If there's an error reading the file, return a 404 error
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('File not found');
    } else {
      // If the file is read successfully, return the content
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    }
  });
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
