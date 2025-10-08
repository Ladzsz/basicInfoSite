const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const emailEmitter = new EventEmitter();

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url}`);

    // Default content type
    let contentType = 'text/html';
    let filePath = '';

    // 🔹 Handle static assets
    if (req.url.match(/^\/styles\//)) {
        // CSS files
        filePath = path.join(__dirname, '..', req.url);
        contentType = 'text/css';
    } else if (req.url.match(/^\/media\//)) {
        // Images (including .webp)
        filePath = path.join(__dirname, '..', req.url);
        const ext = path.extname(filePath);
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
            case '.webp':
                contentType = 'image/webp';
                break;
            default:
                contentType = 'application/octet-stream';
        }
    } else if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, '../html/index.html');
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, '../html/about.html');
    } else if (req.url === '/contact-me') {
        filePath = path.join(__dirname, '../html/contact-me.html');
    } else {
        filePath = path.join(__dirname, '../html/404.html');
    }

    // 🔹 Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file: ${filePath}`);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Server Error');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(data);
        }
    });

});



server.listen(port, hostname, () => {
    console.log(`✅ Server running at http://${hostname}:${port}/`);
});
