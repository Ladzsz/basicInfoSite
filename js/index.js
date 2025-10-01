const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost'; 
const port = 8080; 

const server = http.createServer((req, res) => {

    // Set the content type for HTML
    res.setHeader('Content-Type', 'text/html');

    //constructing the file paths
    let filePath = '';

    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html');
    } else if (req.url === '/contact-me') {
        filePath = path.join(__dirname, 'contact-me.html');
    } else {
        filePath = path.join(__dirname, '404.html');
    }

    //reading the file and sending the html response
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Server Error');
        } else {
            res.statusCode = 200;
            res.end(data);
        }
    });
});

//logging the hostname and port
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});