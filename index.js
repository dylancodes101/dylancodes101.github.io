const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define server port
const port = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Serve static files
        serveStaticFile(req, res);
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);
            console.log(data);

            // Your conditional statement here
            if (data.some_condition) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid data. Please try again.' }));
            } else {
                // Spawn a Python process
                const pythonProcess = spawn('python', ['main.py', JSON.stringify(data)]);

                // Listen for output from Python process
                pythonProcess.stdout.on('data', (data) => {
                    console.log(`Received from Python: ${data}`);
                    const result = JSON.parse(data);
                    if (result.error){
                        // Send error response if not in list
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result));
                    } else {
                        // Respond to the client
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result));
                    }
                });

                // Handle errors
                pythonProcess.stderr.on('data', (data) => {
                    console.error(`Error from Python: ${data}`);
                    // Respond to the client
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                });

                // Handle process exit
                pythonProcess.on('close', (code) => {
                    console.log(`Python process exited with code ${code}`);
                });
            }
        });
    }
});

// Function to serve static files
function serveStaticFile(req, res) {
    const filePath = path.join(__dirname, 'public', req.url);
    const contentType = getContentType(req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Function to determine content type based on file extension
function getContentType(url) {
    const ext = path.extname(url);
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/plain';
    }
}

// Start server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
